import React, { memo } from 'react'
/* global google */
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import cx from 'classnames';
import { GoogleMap, useLoadScript, Marker, InfoBox } from '@react-google-maps/api'
import { CircularProgress, Grid, Typography, Paper, List, ListItem, ListItemText } from '@material-ui/core';
import { renderMeasurementIcon, renderBatteryIcon } from '../../../utils/measurementTypes'

const styles = theme => ({
	root: {
        //different border/styles if fullscreen on homepage or a block component in new design
		height: props => props.fullScreen ? '100%' : 'calc(100% - 2px)',
		width: props => props.fullScreen ? '100%' : 'calc(100% - 2px)',
		position: 'relative',
        zIndex: theme.zIndex.bing,
        border:  props => props.fullScreen ? 'none' : `1px solid ${theme.palette.common.lines}`,
        borderRadius: props => props.fullScreen ? 0 : theme.spacing(1),
        overflow:'hidden'
	},
	fab: {
		position: 'fixed',
		bottom: 40,
		right: 40,
		background: theme.palette.secondary.main
	},
	loader: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
    },
    popup: {
        padding:`${theme.spacing(2.5)}px ${theme.spacing(3.5)}px ${theme.spacing(1.25)}px ${theme.spacing(3.5)}px`,
        width:208,
        backgroundColor:theme.palette.common.white,
        borderRadius:theme.spacing(0.5),
        boxShadow: '0px 4px 4px #00000029',
        //override gmaps default to add quote triangle
        overflow: 'visible!important',
        '&::after': {
            backgroundColor:theme.palette.common.white,
            content: '""',
            display: 'block',
            height: 16,
            width: 16,
            //sqr(16^2 * 16^2) = 22.6 (length of rotated square)
            left:`calc(50% - 11.3px)`,
            position: 'absolute',
            bottom: -7.5,
            transform: 'rotate(47deg) skew(5deg) ',
        }
    },
    popupSubtext: {
        fontSize:14,
        margin:0,
        padding:0,
        lineHeight:1.4,
        fontWeight:300,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.controls.menuIcon
    },
    popupText:{
        fontSize:15,
        fontWeight:500,
        padding:0,
        margin:`0 0 ${theme.spacing(1)}px 0`,
        lineHeight:1.35,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.defaultText
    },
    popupBattery:{
        position:'absolute',
        top:0,
        right:0,
    },
    popupIcon: {
        height:theme.spacing(7),
        width:theme.spacing(7)
    },
    batteryIcon: {
        height:theme.spacing(7),
        width:theme.spacing(7),
        marginTop:-theme.spacing(1)
    },
    popupMeasurementsContainer: {
        paddingTop:theme.spacing(2),
    },
    popupMeasurementContainer: {
        position:'relative',
        padding:`${theme.spacing(2)}px ${theme.spacing(5)}px 0 0`,
        '&:last-child': {
            padding:`${theme.spacing(2)}px 0 0 0`,
        }
    },
    popupTextContainer: {
        position:'relative'
    },
    inline: {
        display:'inline-block'
    },
    verticalAlign: {
        transform:'translateY(-50%)',
    },
    noData: {
        padding:`0 0 ${theme.spacing(11)}px 0`,
    },
    contextMenu: {
        position:'absolute',
        top: 0,
        left: 0,

    },
    contextMenuText: {
        color:theme.palette.common.defaultText
    }
});

const GoogleMapsLoader = (props) => {
    const { isLoaded } = useLoadScript({
        // Enter your own Google Maps API key
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    });// Load the Google maps scripts
    return isLoaded ? <GoogleMapsConnected {...props} /> : null;
}

class GoogleMaps extends React.Component {
    state = {
        allSensors:this.props.allSensors,
        popupOptions:{
            visible:false,
            position:{
                lng: 6, 
                lat: 32
            }
        },
        popupContent: {
            deviceType:"",
            description:"",
            measurements:[],
            lastUpdated:""
        },
        contextMenu: {
            x:null,
            y:null
        }
    }
    mapRef = React.createRef()

    renderPin = (sensorId, selectedSensor) => {
        const { sensors, predictionHour } = this.props
        const sensor = sensors.filter(sensor => sensor.id === sensorId)[0]
        let _COLOR = sensor.measurements === null && predictionHour > 0 
            ? '#AFAFAF'
            : sensor.attributes ? sensor.attributes.iconColor : '#000000';
        
        const _HIGHLIGHT_COLOR = sensor.highlightColor
        const _IS_SELECTED = selectedSensor
            ? sensor.id === selectedSensor.id
            : false;
        const _IS_HOVERED = this.props.hoveredSensor
            ? sensor.id === this.props.hoveredSensor.id
            : false;
        const _HAS_HIGHLIGHT = Boolean(_HIGHLIGHT_COLOR)
        if(!_HAS_HIGHLIGHT) {
			return _IS_SELECTED || _IS_HOVERED
				? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><defs><style>.a{fill:#fff;}.b,.d{fill:${_COLOR};}.c,.d{stroke:none;}</style></defs><g transform="translate(-134 -538)"><g class="a" transform="translate(134 538)"><path class="c" d="M 8 15.25 C 4.002339839935303 15.25 0.75 11.99765968322754 0.75 8 C 0.75 4.002339839935303 4.002339839935303 0.75 8 0.75 C 11.99765968322754 0.75 15.25 4.002339839935303 15.25 8 C 15.25 11.99765968322754 11.99765968322754 15.25 8 15.25 Z"/><path class="d" d="M 8 1.5 C 4.415889739990234 1.5 1.5 4.415889739990234 1.5 8 C 1.5 11.58411026000977 4.415889739990234 14.5 8 14.5 C 11.58411026000977 14.5 14.5 11.58411026000977 14.5 8 C 14.5 4.415889739990234 11.58411026000977 1.5 8 1.5 M 8 0 C 12.41827964782715 0 16 3.581720352172852 16 8 C 16 12.41827964782715 12.41827964782715 16 8 16 C 3.581720352172852 16 0 12.41827964782715 0 8 C 0 3.581720352172852 3.581720352172852 0 8 0 Z"/></g><circle class="b" cx="5" cy="5" r="5" transform="translate(137 541)"/></g></svg>`
				: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><defs><style>.a{fill:#fff;}.b,.d{fill:${_COLOR};}.b{stroke:#fff;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:1.5px;}.c,.d{stroke:none;}</style></defs><g transform="translate(-925 -215.811)"><g transform="translate(-268 -146.189)"><g class="a" transform="translate(1193 362)"><path class="c" d="M 8 15.25 C 4.002339839935303 15.25 0.75 11.99765968322754 0.75 8 C 0.75 4.002339839935303 4.002339839935303 0.75 8 0.75 C 11.99765968322754 0.75 15.25 4.002339839935303 15.25 8 C 15.25 11.99765968322754 11.99765968322754 15.25 8 15.25 Z"/><path class="d" d="M 8 1.5 C 4.415889739990234 1.5 1.5 4.415889739990234 1.5 8 C 1.5 11.58411026000977 4.415889739990234 14.5 8 14.5 C 11.58411026000977 14.5 14.5 11.58411026000977 14.5 8 C 14.5 4.415889739990234 11.58411026000977 1.5 8 1.5 M 8 0 C 12.41827964782715 0 16 3.581720352172852 16 8 C 16 12.41827964782715 12.41827964782715 16 8 16 C 3.581720352172852 16 0 12.41827964782715 0 8 C 0 3.581720352172852 3.581720352172852 0 8 0 Z"/></g><circle class="b" cx="4" cy="4" r="4" transform="translate(1197 366)"/></g></g></svg>`;
		} else {
            return _IS_SELECTED || _IS_HOVERED
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>map_marker_alarm_active_icon</title><circle cx="16" cy="16" r="8" fill="#fff"/><path d="M24.49,7.51A12,12,0,1,0,28,16,12,12,0,0,0,24.49,7.51ZM16,24a8,8,0,1,1,8-8A8,8,0,0,1,16,24Z" fill="${_HIGHLIGHT_COLOR}"/><circle cx="16" cy="16" r="5" fill="${_COLOR}"/></svg>`
			: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>map_marker_alarm_icon</title><path d="M16,8a8,8,0,1,0,8,8A8,8,0,0,0,16,8Zm0,11.25A3.25,3.25,0,1,1,19.25,16,3.26,3.26,0,0,1,16,19.25Z" fill="#fff"/><path d="M24.49,7.51A12,12,0,1,0,28,16,12,12,0,0,0,24.49,7.51ZM16,24a8,8,0,1,1,8-8A8,8,0,0,1,16,24Z" fill="${_HIGHLIGHT_COLOR}"/><circle cx="16" cy="16" r="3.25" fill="${_COLOR}"/></svg>`;
		}
    };

    selectSensor = deviceId => {
        const { push, client } = this.props;
		push(`${client.defaultPath}/device/${deviceId}`);
    };

    movePopupToCurrent = (sensorId) => {
        const sensor = this.props.sensors.filter(sensor => sensor.id === sensorId)[0]
        this.setState((prevState) => ({
            popupOptions:{
                visible:true,
                position:{
                    lng: sensor.longitude, 
                    lat: sensor.latitude
                }
            },
            popupContent: {
                deviceType:sensor.deviceType,
                description:sensor.description,
                measurements:sensor.measurements,
                lastUpdated:sensor.lastUpdated
            }
        }))
    };
    
    hidePopup = () => {
        this.setState((prevState) => ({
            popupOptions:{
                ...prevState.popupOptions,
                visible:false,
            },
        }))
    }

    parseBatteryStatus = measurements => {
        const { classes } = this.props
        if(measurements !== null) {
            const batteryStatus = measurements.filter(measurement => measurement.measurementType.toUpperCase() === "BATTERY_PCT")[0];
            if (batteryStatus) {
                const { value } = batteryStatus;
                return(<span style={{ marginLeft: -10 }}>{renderBatteryIcon(value, classes.batteryIcon)}</span>);
            } else {
                return <></>
            }
        } else {
            return <></>
        }
    }

    renderPopupMeasurements = (measurements) => {
        const { classes, predictionHour } = this.props
        if(predictionHour > 0) {
            return(
                <Grid container className={classes.popupMeasurementsContainer}>
                    <Grid item className={classes.popupMeasurementContainer}>
                        <div className={classes.inline}>{renderMeasurementIcon(measurements[0], classes.popupIcon)}</div>
                        <p className={cx(classes.popupText, classes.inline, classes.verticalAlign)}>
                            {this.renderMeasurementValue(measurements[0])}
                        </p>
                    </Grid>
                    <Grid item className={classes.popupMeasurementContainer}>
                        <div className={classes.inline}>{renderMeasurementIcon(measurements[1], classes.popupIcon)}</div>
                        <p className={cx(classes.popupText, classes.inline, classes.verticalAlign)}>
                            {this.renderMeasurementValue(measurements[1])}
                        </p>
                    </Grid>
                </Grid>
            )
        } else {
            const primaryMeasurement = measurements[0]
            if(primaryMeasurement) {
                return(
                    <Grid container>
                        <Grid item className={classes.popupMeasurementContainer}>
                            <div className={classes.inline}>{renderMeasurementIcon(primaryMeasurement, classes.popupIcon)}</div>
                            <Typography className={cx(classes.popupText, classes.inline, classes.verticalAlign)}>
                                {this.renderMeasurementValue(primaryMeasurement)}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }
        }
    }

    renderMeasurementValue = (measurement) => {
        if(measurement) {
            if(measurement.measurementType === 'RISK') {
                switch(measurement.value) {
                    case 1: return "Ingen risiko"
                    case 2: return "Risiko"
                    case 3: return "Høj risiko"
                    default: return '-'
                }
            } else {
                return Math.round((measurement.value + Number.EPSILON) * 100) / 100
            }
        } else {
            return '-'
        }
    }

    renderTimestamp = (lastUpdated) => {
        const { predictionHour } = this.props
        if(predictionHour > 0) {
            return('Forudsigelse: Om ' + predictionHour + ' timer')
        } else {
            return ('Måling: ' + (lastUpdated ? moment().diff(lastUpdated, 'days') >= 1 ? moment.utc(lastUpdated).local().fromNow() : moment.utc(lastUpdated).local().fromNow() : '-'))
        }
    }

    renderSensorPopup = () => {
        const { popupContent, popupOptions } = this.state
        const { classes, predictionHour } = this.props
        const { lastUpdated, description, measurements, deviceType } = popupContent
        
        return (
          <InfoBox
            position={popupOptions.position}
            visible={popupOptions.visible}
            options={{
                closeBoxURL: '',
                boxClass:classes.popup,
                pixelOffset:new google.maps.Size(-114, -28),
                alignBottom:true,
                fixedWidthSet:true,
                maxWidth:208
            }}
          >
              <>
                <div className={classes.popupTextContainer}>
                    <Typography className={classes.popupSubtext}>{deviceType}</Typography>
                    <Typography className={classes.popupText}>{description}</Typography>
                    <Typography className={classes.popupSubtext}>{measurements ? this.renderTimestamp(lastUpdated) : predictionHour > 0 ? "Ingen forudsigelser" : "Ingen data"}</Typography>
                    <div className={classes.popupBattery}>{predictionHour > 0 ? "" : this.parseBatteryStatus(measurements)}</div>
                </div>
                {measurements ? this.renderPopupMeasurements(measurements) : <div className={classes.noData}/>}
                </>
          </InfoBox>
        )
    }

    renderContextMenu = () => {
        const { classes, customerId } = this.props
        const { contextMenu } = this.state
        return (
            <Paper
                className={classes.contextMenu} 
                style={{
                    transform:`translate(${contextMenu.x}px, ${contextMenu.y}px)`,
                    display:contextMenu.y !== null ? 'block' : 'none',

                }}
            >
                <List>
                    <ListItem button onClick={()=> window.open(`https://vejpark-test-admin-portal.azurewebsites.net/${customerId}/devices/device-creation?lat=${contextMenu.latLng.lat()}&lng=${contextMenu.latLng.lng()}`, "_blank")}>
                        <ListItemText primaryTypographyProps={{className: classes.contextMenuText}} primary="Create New Device Here" />
                    </ListItem>
                </List>
            </Paper>
            
        )
    }

    handleCloseContextMenu = () => {
        this.setState({
            contextMenu: {
                x:null,
                y:null
            }
        })
    }

    renderSensorMarker = (sensor) => {
        const { selectedSensor } = this.props
        const largeSensor = !Boolean(sensor.highlightColor)
        return (
          <Marker
            key={sensor.id}
            position={{
                lat:sensor.latitude,
                lng: sensor.longitude
            }}
            icon={
                {
                    url:
                        'data:image/svg+xml;charset=utf-8,' +
                        encodeURIComponent(
                            this.renderPin(sensor.id, selectedSensor)
                        ),
                    anchor: largeSensor ? new google.maps.Point(8, 8) : new google.maps.Point(16, 16),
                    size: largeSensor ? new google.maps.Size(16, 16) : new google.maps.Size(32, 32),
                    scaledSize: largeSensor ? new google.maps.Size(16, 16) : new google.maps.Size(32, 32),
                }
              }
            onClick={() => this.selectSensor(sensor.deviceId)}
            onMouseOver={() => {
                this.movePopupToCurrent(sensor.id)
            }}
            onMouseOut={() => {
                this.hidePopup()
            }}
          />
        )
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.allSensors !== prevState.allSensors) {
            if(nextProps.allSensors.length > 0) {
                return {
                    allSensors:nextProps.allSensors,
                    popupOptions: {
                        visible:false,
                        position: {
                            lat:nextProps.allSensors[0].latitude,
                            lng:nextProps.allSensors[0].longitude,
                        }
                    }
                }
            }
        }
        return null
    }

    componentDidMount() {
        const { allSensors } = this.props;
        if(allSensors.length > 0) {
            this.setState({
                sensors:allSensors,
                popupOptions: {
                    visible:false,
                    position: {
                        lat:allSensors[0].latitude,
                        lng:allSensors[0].longitude,
                    }
                }
            })
        }
    }
    
    markerRender = () => {
        const { sensors } = this.props
        return sensors.map(sensor => {
            return this.renderSensorMarker(sensor)
        })
    }

    render() {
        const { allSensors, isMapLoading, classes, predictionHour } = this.props

        return (
            <div className={classes.root} onContextMenu={(e)=> e.preventDefault()}>
                {allSensors.length > 0 &&
                    <GoogleMap 
                        mapContainerStyle={{height:'100%'}}
                        options={{
                            disableDefaultUI:true,
                            zoomControl:true
                        }}
                        ref={this.mapRef}
                        onLoad={map => {
                            const bounds = new google.maps.LatLngBounds();
                            allSensors.filter(sensor => sensor.isActive).forEach(sensor => {
                              bounds.extend(
                                new google.maps.LatLng(
                                  parseFloat(sensor.latitude),
                                  parseFloat(sensor.longitude)
                                )
                              );
                            });
                            map.fitBounds(bounds);
                            map.setOptions(
                                { 
                                    minZoom: 2, 
                                    restriction: {
                                        latLngBounds: {
                                            north: 85,
                                            south: -85,
                                            west: -180,
                                            east: 180
                                        }
                                    }, 
                                }
                            );
                            
                            google.maps.event.addListener(
                                map,
                                "rightclick",
                                ({ ab, latLng, pixel, tb }) => {
                                    this.setState({
                                        contextMenu: {
                                            x:pixel.x,
                                            y:pixel.y,
                                            latLng:latLng
                                        }
                                    })
                                }
                            );
                            google.maps.event.addListener(
                                map,
                                "click",
                                (e) => {
                                    if(this.state.contextMenu.y !== null) {
                                        this.handleCloseContextMenu()
                                    }
                                }
                            );
                            google.maps.event.addListener(
                                map,
                                "drag",
                                () => {
                                    if(this.state.contextMenu.y !== null) {
                                        this.handleCloseContextMenu()
                                    }
                                }
                            );
                            google.maps.event.addListener(
                                map,
                                "zoom_changed",
                                () => {
                                    if(this.state.contextMenu.y !== null) {
                                        this.handleCloseContextMenu()
                                    }
                                }
                            );
                       
                          }}
                        >
                        <>
                            {this.markerRender()}
                            {this.renderSensorPopup()}
                        </>
                    </GoogleMap>
                }
                {(isMapLoading || allSensors.length === 0) && (
                    <div className={classes.loader}>
                        <CircularProgress color='primary' />
                    </div>
                )}
                {this.renderContextMenu()}
                {/* {predictionHour > 0 && <PredictionMode predictionHour={predictionHour} />} */}
            </div>
        )
    }
}

const GoogleMapsConnected = withStyles(styles)(
	connect(
        null,
		null
	)(memo(GoogleMaps))
);

export default GoogleMapsLoader;