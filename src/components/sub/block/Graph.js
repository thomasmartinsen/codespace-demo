import React, { useEffect, useState, useRef } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import {
    Slider,
    Typography,
    LinearProgress,
    useMediaQuery
} from '@material-ui/core';
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import cx from 'classnames';
import moment from 'moment';
import UIIcons from '../../../icons/ui-icons'
import { renderMeasurementUnit, renderMeasurementTitle } from '../../../utils/measurementTypes'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Line, ResponsiveContainer, ReferenceLine } from 'recharts'
import Scrollbar from 'react-scrollbars-custom';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const ZoomSlider = withStyles(theme => ({
    track: {
        backgroundColor:theme.palette.controls.inputBorder
    },
    rail: {
        backgroundColor:theme.palette.controls.inputBorder
    },
    thumb: {
        backgroundColor:theme.palette.common.white,
        border:`2px solid ${theme.palette.primary.main}`,
    }
}))(Slider);

const styles = theme => ({
	root: {
        display: 'flex',
        flexDirection: 'column',
        width: `calc(100% + 5px)`,
        position:'relative',
        overflow:'hidden',
        height:`calc(100% - ${theme.spacing(6)}px)`,
        paddingTop:theme.spacing(6),
        [theme.breakpoints.down('md')]: {
            paddingTop:theme.spacing(2),
            height:'auto',
            minHeight:270,
            paddingBottom:15
        }
    },
    rootContent: {
        padding: theme.spacing(4)
    },
    graphContainer: {
        height:`calc(100% - 40px)`,
        width:'100%',
        display: 'flex',
        flex:1,
        marginBottom:theme.spacing(2),
        // overflowX:'scroll',
        [theme.breakpoints.down('md')]: {
            paddingLeft:30,
            width:'calc(100% - 30px)',
            minHeight:310,
            // height: 'auto'
        },
    },
    graphContainerInner: {
        overflow:'hidden'
    },
    legendContainer: {
        width:'calc(100% - 5px)',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width:'calc(100%)'
        },
        position:'relative'
    },
    leftLegend: {    
        position:'relative',
        height:40,
        // [theme.breakpoints.up('lg')]: {
        //     width:'calc(50% - 22px)',
        //     display:'inline-block',
        //     paddingLeft:40,
        // }
    },
    rightLegend: {
        position:'relative',
        [theme.breakpoints.up('lg')]: {
            width:'calc(50% - 33px)',
            display:'inline-block',
        }
    },
    rightLegendItem:{
        padding:`${theme.spacing(2)}px ${theme.spacing(2.75)}px`,
        margin:`0 ${theme.spacing(4)}px ${theme.spacing(1)}px 0`,
        display:'inline-block',
        bottom:0,
        verticalAlign:'bottom',
        position:'relative',
    },
    leftLegendItem:{
        padding:`${theme.spacing(2)}px ${theme.spacing(2.5)}px`,
        display:'inline-block',
        bottom:0,
        cursor:'pointer',
        margin:`0 ${theme.spacing(4)}px ${theme.spacing(1)}px 0`,
        verticalAlign:'bottom',
        position:'relative',
        borderRadius:theme.spacing(1),
        border:`1px solid ${theme.palette.common.lines}`,
        backgroundColor:theme.palette.faded.green
    },
    notSelectedLeftLegendItem: {
        cursor:'pointer',
        backgroundColor:theme.palette.common.white
    },
    legendFullIcon: {
        borderRadius:'50%',
        width:10,
        height:10,
        position:'absolute',
        transform:'translateY(-50%)',
        top:'50%',
    },
    legendHollowIcon: {
        borderRadius:'50%',
        width:6,
        height:6,
        position:'absolute',
        transform:'translateY(-50%)',
        top:'50%',
    },
    legendSquareIcon: {
        width:10,
        height:10,
        position:'absolute',
        transform:'translateY(-50%)',
        top:'50%',
    },
    legendText: {
        color:theme.palette.common.textBlack,
        marginLeft:theme.spacing(5),
        lineHeight:1.3,
        fontSize:13,
        bottom:0,
        verticalAlign:0,
    },
    sliderContainer: {
        left: 18,
        position: 'absolute',
        height:28,
        width:126,
        bottom:0,
    },
    zoomSlider: {
        width: 62,
        left: 32,
        position:'absolute',
        transform:'translateY(-50%)',
        top:'50%',
    },
    sliderIcon: {
        width: 16,
        cursor:'pointer',
        position: 'absolute',
        transform:'translateY(-50%)',
        top:'50%',
        padding:'2px 8px'
    },
    leftIcon: {
        left:0,
    },
    rightIcon: {
        left:94
    },
    scrollContent: {
        boxSizing: 'border-box',
        padding: 0.05,
        minHeight: '100%',
        minWidth: '100%',
        height: '100%'
    },
    scrollTrack: {
        width:'calc(100% - 160px)', 
        background:'rgba(0,0,0,0.1)', 
        left:'auto', 
        right:0, 
        height:8,
        borderRadius:theme.spacing(2),
        bottom:0,
        position:'absolute'
    },
    scrollThumb: {
        background:'rgba(0,0,0,0.1)',
        touchAction: 'none',
        cursor: 'pointer',
        borderRadius: 4,
        height: '100%',
    },
    scrollWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 10,
        right: 0,
        overflow: 'hidden',
    },
    scrollScroller: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
    },
    tooltip: {
        backgroundColor:theme.palette.common.white,
        width:102,
        padding:`${theme.spacing(2.5)}px ${theme.spacing(3)}px`,
        boxShadow: `0px 4px 4px #00000029`
    },
    tooltipTitle: {
        fontSize:theme.typography.pxToRem(13),
        lineHeight:1.3,
        fontWeight:400,
        marginBottom:theme.spacing(1),
        color:theme.palette.controls.menuIcon
    },
    tooltipItem: {
        paddingBottom: theme.spacing(0.5),
        position:'relative',
        height:18
    },
    tooltipItemValue: {
        fontSize:theme.typography.pxToRem(14),
        lineHeight:1.3,
        marginLeft:theme.spacing(5.5),
        fontWeight:500,
        position:'absolute',
        transform:'translateY(-50%)',
        top:'50%',
        color:theme.palette.common.defaultText
    },
    forecastIcon: {
        height:25,
        width:25,
        right:0,
        cursor:'pointer',
        position:'absolute',
        transform:'translateY(-50%)',
        top:'50%',
        '& path': {
            fill: theme.palette.primary.main
        }
    },
    iconGreen: {
        '& path': {
            fill: theme.palette.primary.main
        }
    },
    iconGrey: {
        '& path': {
            fill: theme.palette.controls.menuIcon
        }
    },
    loading: {
        width:'80%',
        marginLeft:'10%',
        position:'absolute',
        transform:'translateY(-50%)',
        top:'50%',
    },
    noData: {
        position:'absolute',
        transform:'translate(-50%, -50%)',
        top:'50%',
        left:'50%',
        width:'100%',
        height:'80%',
    },
    noDataText: {
        position:'absolute',
        transform:'translate(-50%, -50%)',
        top:'50%',
        left:'50%',
        fontSize:theme.typography.pxToRem(22),
        lineHeight:1.3,
        fontWeight:500,
        textTransform:'uppercase',
        color:theme.palette.controls.main
    }
});

const GraphComponent = (props) => {
    const { classes } = props;
    const scrollbar = useRef(null);
    const theme = useTheme();
    const smallScreenSize = useMediaQuery(theme.breakpoints.down('md'));
    const [allData, setAllData] = useState(null); //allData, including forecastData (parsed from props.sensorData and props.sensorForecastData)
    const [currentData, setCurrentData] = useState(null); //current data being shown on graph (depends on currentView and forecastMode)

    const [dataTypes, setDataTypes] = useState([]); //all current available data types in data (TEMPERATURE_C etc)
    const [forecastTypes, setForecastTypes] = useState([]); //all current available forecast types in data

    const [forecastMode, setForecastMode] = useState(false); //hides forecasts if false
    const [forecastAvailable, setForecastAvailable] = useState(false); //whether forecasts are able to be viewed for the current dataType

    const [currentView, setCurrentView] = useState([]); //current dataTypes being viewed (changed by legend selection)
    const [currentForecastView, setCurrentForecastView] = useState([]); //current forecastTypes being viewed (changed by currentView when currentData being set)

    const [zoom, setZoom] = useState(200); //current zoom of the graph section

    useEffect(() => {
        //init useEffect (when data props changes is rerun)
        const parseSensorData = () => {
            let parsedData = [];
            // parse sensor data (remove BATTERY_PCT measurements, and put into objects in form
            // [{ 
            //  time: time, 
            //  MEASUREMENT_TYPE_1: value, 
            //  MEASUREMENT_TYPE_2: value,
            // }]
            // 'F__' as a prefix to forecast measurements
            const copyOfSensorData = [...props.sensorData]
            copyOfSensorData.forEach((item, index) => {
              if(item.measurementType !== 'BATTERY_PCT') {
                const placeInCurrentData = parsedData.findIndex(x => x.time === item.time)
                if(placeInCurrentData !== -1) {
                  parsedData[placeInCurrentData] = {
                      ...parsedData[placeInCurrentData],
                      [item.measurementType.toUpperCase()]:item.value,
                  }
                } else {
                  parsedData.push({
                    time:item.time, 
                    [item.measurementType.toUpperCase()]:item.value
                  })
                }
              }
            })
            //add sensor forecast data if it exists
            if(props.sensorForecastData.length > 0) {
                let parsedForecastData = [];
                const copyOfSensorForecastData = [...props.sensorForecastData]
                copyOfSensorForecastData.forEach((item, index) => {
                    let currentMeasurement = {
                        time: item.hours
                    }

                    item.forecasts.forEach((item, index) => {
                        currentMeasurement = {
                            ...currentMeasurement,
                            ['F__' + item.measurementType]:item.value
                        }
                    })
                    if(item.hours === 1) {
                        item.forecasts.forEach((item, index) => {
                            if(parsedData.length > 0) {
                                if(parsedData[parsedData.length - 1].hasOwnProperty(item.measurementType)){
                                    currentMeasurement = {
                                        ...currentMeasurement,
                                        [item.measurementType]:item.value
                                    }
                                }
                            }
                        })
                    }
                    parsedForecastData.push(currentMeasurement)
                    
                })
                parsedData = [
                    ...parsedData,
                    ...parsedForecastData
                ]
                setForecastMode(true)
            } else {
                setForecastMode(false)
            }
            setAllData(parsedData)
        };

        const initCurrentView = (allDataTypes) => {
            //set currentView based on list of dataTypes
            //select first in array (primary measurement) and any others with the same unit
            let initCurrentView = [allDataTypes[0]]
            allDataTypes.forEach((item, index) => {
                if(index !== 0) {
                    if(renderMeasurementUnit(allDataTypes[0]) === renderMeasurementUnit(item)) {
                        initCurrentView.push(allDataTypes.find(x => x === item))
                    }
                } 
            })
            setCurrentView(initCurrentView)
        }

        const orderTypesByUnit = (types) => {
            // let orderedTypes = [[types[0]]]
            // types.forEach((type, typeIndex) => {
            //     let added = false;
            //     orderedTypes.forEach((groupedTypes, groupedTypesIndex) => {
            //         if(renderMeasurementUnit(groupedTypes[0]) === renderMeasurementUnit(type)) {
            //             orderedTypes[groupedTypesIndex].push(type)
            //             added = true
            //         }
            //     })
            //     if(!added) {
            //         orderedTypes.push([type])
            //     }
            // })
            // let orderedList = [];
            // orderedTypes.forEach((groupedTypes) => {
            //     let sortedGroupedTypes = _.sortBy(groupedTypes, item => item.toLowerCase());
            //     const primaryIndex = sortedGroupedTypes.findIndex(x => x === types[0])
            //     if(primaryIndex !== -1) {
            //         sortedGroupedTypes.unshift(sortedGroupedTypes.splice(primaryIndex, 0))
            //     }
            //     sortedGroupedTypes.forEach(item => {
            //         orderedList.push(item)
            //     })
            // })
            // return orderedList
            let orderedTypes = []
            types.forEach((item1, index1) => {
                if(!orderedTypes.includes(item1)) {
                    if(orderedTypes.length === 0) {
                        orderedTypes.push(item1)
                    } else {
                        let added = false
                        orderedTypes.forEach((item2, index2) => {
                            if(!added) {
                                if(renderMeasurementUnit(item1) === renderMeasurementUnit(item2)) {
                                    orderedTypes.splice(index2 + 1, 0, item1)
                                    added = true
                                }
                            }
                        })
                        if(!added) {
                            orderedTypes.push(item1)
                        }
                    }
                }
            })
            return orderedTypes
        }

        const parseDataTypes = () => {
            //list all dataTypes in data (removing BATTERY_PCT)
            let tempDataTypes = [];
            const copyOfSensorData = [...props.sensorData]
            copyOfSensorData.forEach((item, index) => {
                if(item.measurementType !== 'BATTERY_PCT' && tempDataTypes.findIndex(x => x === item.measurementType) === -1) {
                    if(item.isPrimary) {
                        tempDataTypes.unshift(item.measurementType)
                    } else {
                        tempDataTypes.push(item.measurementType)
                    }
                }
            })
            //order types by unit (those with same unit next to one another)
            let orderedDataTypes = orderTypesByUnit(tempDataTypes)
            setDataTypes(orderedDataTypes)
            initCurrentView(tempDataTypes)

            //list all forecastTypes in data 
            let tempForecastTypes = [];
            if(props.sensorForecastData.length > 0) {
                const copyOfSensorForecastData = props.sensorForecastData[0].forecasts
                copyOfSensorForecastData.forEach(item => {
                    tempForecastTypes.push(item.measurementType)
                }) 
                //order based on data types
                let orderedForecastTypes = []
                orderedDataTypes.forEach((dataType, dataTypeIndex) => {
                    let found = false;
                    tempForecastTypes.forEach((forecastType, dataTypeIndex) => {
                        if(!found && dataType === forecastType) {
                            orderedForecastTypes.push(forecastType)
                            found = true
                        }
                    })
                })
                setForecastTypes(orderedForecastTypes)
            }

        }

        if(props.sensorData) {
            parseSensorData()
            parseDataTypes()
        } else {
            setAllData(null)
        }
        
        
    }, [props.sensorData, props.sensorForecastData]);

    useEffect(() => {
        //sorts out currentData being displayed - filtered by the interactive legend which sets 'currentView'
        //measurements in currentView are shown
        //forecasts with same name as those in currentView are also shown
        if(allData) {
            let newData = []
            let forecastIsAvailable = false;
            let forecastsAdded = [];
            const copyOfAllData = [...allData]
            copyOfAllData.forEach(item => {
                let newItem;
                currentView.forEach(currentViewItem => {
                    if(item.hasOwnProperty(currentViewItem)) {
                        newItem = {
                            ...newItem,
                            [currentViewItem]:item[currentViewItem]
                        }
                    }
                    if(forecastTypes.includes(currentViewItem)) {
                        forecastIsAvailable = true;
                        if(forecastMode) {
                            if(item.hasOwnProperty('F__' + currentViewItem)) {
                                !forecastsAdded.includes(currentViewItem) && forecastsAdded.push(currentViewItem)
                                newItem = {
                                    ...newItem,
                                    ['F__' + currentViewItem]:item['F__' + currentViewItem],
                                    //for reference area (bg color)
                                    F__RISK:item['F__RISK']
                                }
                            } 
                        }
                    }
                })
                if(newItem) {
                    newData.push({
                        ...newItem,
                        time:item.time
                    })
                }
                
            })
            setCurrentForecastView(forecastsAdded)
            setForecastAvailable(forecastIsAvailable)
            if(!forecastMode && forecastTypes.length > 0) {
                newData.pop()
            }
            setCurrentData(newData)
        } else {
            setCurrentData(null)
        }
    }, [currentView, allData, dataTypes, forecastTypes, forecastMode]);

    useEffect(() => {
        //ensuring correct data is shown at correct zoom/scroll level based on screen size/forecast mode
        if(currentData) {
            if(forecastMode) {
                if(smallScreenSize) {
                    if(scrollbar.current) {
                        scrollbar.current.scrollTo(400, 0)
                        setZoom(300)
                    }
                } else {
                    setZoom(200)
                }
            } else {
                setZoom(100)
            }
        }

    }, [forecastMode, smallScreenSize, currentData])

    const dataColors = [
        '#33BA69', //Green
        '#C67F7F', //Red
        '#1EBAE7', //Azure Blue
        '#E3A034', //Gold
        '#005B8E', //Dark Blue
        '#BC55C9', //Purple
        '#A5A148', //Military Green
        '#290F0F', //Deep Red
    ];

    const forecastDataColors = [
        '#A5A148', //Military Green
        '#290F0F', //Deep Red
    ];

    const backgroundAlarmColours = [
        '#EAF7EF', //Light Green - No risk
        '#FBF2BD', //Light Yellow - Low risk
        '#EEC5C5', //Light Red - High risk
    ];

    const handleZoomSlider = (event, newValue) => {
        setZoom(newValue)
    };

    const handleZoomButton = (type) => {
        switch(type) {
            case 'up':
                setZoom(zoom + 50 > 500 ? 500 : zoom + 50)
                break;
            case 'down':
                setZoom(zoom - 50 < 100 ? 100 : zoom - 50)
                break;
            default:
                //nothing
        };
        
    };
    

    const handleLegendClick = (selectedItem) => {
        //if legends (dataTypes) have the same unit, they can be selected together
        if(currentView.length > 0) {
            const currentIndex = currentView.findIndex(x => x === selectedItem)
            if(currentIndex !== -1) {
                if(currentView.length > 1) {
                    const newCurrentView = [...currentView]
                    newCurrentView.splice(currentIndex, 1)
                    setCurrentView(newCurrentView)
                }
            } else {
                if(renderMeasurementUnit(currentView[0]) === renderMeasurementUnit(selectedItem)) {
                    const newCurrentView = [...currentView]
                    newCurrentView.push(selectedItem)
                    setCurrentView(newCurrentView)
                } else {
                    setCurrentView([selectedItem])
                }
            }
        } else {
            setCurrentView([selectedItem])
        }
        
    }

    const handleForecastMode = () => {
        setForecastMode(!forecastMode)
    }

    const findColorForType = (measurementType) => {
        const indexInDataTypes = dataTypes.findIndex(type => type === measurementType)
        if(indexInDataTypes !== -1) {
            return dataColors[indexInDataTypes]
        } else {
            let uniqueForecastTypes = [...forecastTypes]
            uniqueForecastTypes.forEach((item, index) => {
                if(dataTypes.findIndex(type => type === item) !== -1) {
                    uniqueForecastTypes.splice(index, 1)
                }
            })
            const indexInForecastTypes = uniqueForecastTypes.findIndex(type => type === measurementType)
            if(indexInForecastTypes !== -1) {
                return forecastDataColors[indexInForecastTypes]
            } else {
                return '#000000'
            }

        }
    }

    const renderLegend = () => {
        return(
            <div className={classes.legendContainer}>
                <div className={classes.leftLegend}>
                    {dataTypes.map((item, index) => {
                        const selected = Boolean(currentView.includes(item))
                        return(
                            <div className={cx(classes.leftLegendItem, !selected ? classes.notSelectedLeftLegendItem : null)} onClick={() => handleLegendClick(item)} key={item}>
                                <span className={classes.legendFullIcon} style={{backgroundColor:findColorForType(item)}}/>
                                <Typography className={classes.legendText}>{renderMeasurementTitle(item) + (renderMeasurementUnit(item) !== '' ? ` (${renderMeasurementUnit(item)})` : '')}</Typography>
                            </div>
                        )
                    })}
                </div>
                {/* <div className={classes.rightLegend}>
                    {currentForecastView.length > 0 &&
                        <>
                            {
                                forecastTypes.map((item, index) => {
                                    if(currentForecastView.includes(item)) {
                                        return(
                                            <div className={classes.rightLegendItem} key={item}>
                                                <span className={classes.legendHollowIcon} style={{border: `2px solid ${findColorForType(item)}`}}/>
                                                <Typography className={classes.legendText}>{renderMeasurementTitle(item) + (renderMeasurementUnit(item) !== '' ? ` (${renderMeasurementUnit(item)})` : '')}</Typography>
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                            <div className={classes.rightLegendItem}>
                                <span className={classes.legendSquareIcon} style={{backgroundColor: backgroundAlarmColours[1]}}/>
                                <Typography className={classes.legendText}>Advarsel</Typography>
                            </div>
                            <div className={classes.rightLegendItem}>
                                <span className={classes.legendSquareIcon} style={{backgroundColor: backgroundAlarmColours[2]}}/>
                                <Typography className={classes.legendText}>Alarm</Typography>
                            </div>
                        </>
                    } 
                </div> */}
                {forecastAvailable &&
                    <div onClick={() => handleForecastMode()}>
                        <UIIcons.PredictionIcon className={cx(classes.forecastIcon, forecastMode ? classes.iconGreen : classes.iconGrey)} />
                    </div>
                }
            </div>
        )
    }
    
    const renderDataLines = () => {
        if(dataTypes.length > 0) {
            return currentView.map(item => {
                return (<Line isAnimationActive={false} type="linear" key={item} dataKey={item} stroke={findColorForType(item)} dot={{ fill: findColorForType(item), strokeWidth: 0, r: 5 }} activeDot={false} />)
            })   
        }
    }

    const renderForecastLines = () => {
        if(dataTypes.length > 0) {
            return forecastTypes
            .filter(forecastType => forecastType !== 'RISK')
            .map(type => {
                return (<Line isAnimationActive={false} type="linear" key={'F__' + type} dataKey={'F__' + type} stroke={findColorForType(type)} dot={{ stroke: findColorForType(type), strokeWidth: 2, r: 4 }} activeDot={false} />)
            })
        }
    }

    const renderReferenceAreas = () => {
        if(currentData) {
            const copyOfCurrentData = [...currentData]
            return copyOfCurrentData.map((item, index) => {
                if(item.hasOwnProperty('F__RISK')) {
                    return (<ReferenceArea key={item.time} x1={item.time} x2={item.time + 1} fill={backgroundAlarmColours[item['F__RISK'] - 1]} opacity={1} strokeOpacity={0} />)
                } else {
                    return null
                }
            })
        }
    }

    const renderRuleReferenceLines = () => {
        const { rules } = props
        return rules.filter(x => currentView.find(y => y === x.measurementType)).map((item, index) => {
            return(
                <ReferenceLine key={item.id} isFront={false} alwaysShow y={item.threshold} stroke={theme.palette.error.main} />
            )
        })
    }

    const renderCustomAxisTick = ({ x, y, payload }) => {
        let text;
        if(payload.value.length > 2) {
            text = '+' + payload.value
        } else {
            text = moment.unix(payload.value).format("DD/MM/YY - HH:mm")
        }
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="middle" fill="#606060" fontSize={12} fontFamily='Segoe UI, Open sans, sans-serif'>{text}</text>
            </g>
        );
    };

    const renderCustomTooltip = ({ active, payload, label }) => {
        if (active) {
            let text;
            if(label.length > 2) {
                text = '+' + label
            } else {
                text = moment.unix(label).format("DD/MM/YY - HH:mm")
            }
            return (
                <>
                    <div className={classes.tooltip}>
                        <Typography className={classes.tooltipTitle}>{text}</Typography>
                        {/* rendered like this so that the tooltip is in the same order as legends */}
                        {dataTypes.map((item, index) => {
                            const relevantPayload = payload.find(x => x.dataKey === item)
                            if(relevantPayload) {
                                const { color, value, dataKey } = relevantPayload
                                //don't render if forecast exists of same type (filters out linking value)
                                if((payload.findIndex(x => x.dataKey === 'F__' + dataKey) === -1)) {
                                    return(
                                        <div className={classes.tooltipItem} key={dataKey}>
                                            <span className={classes.legendFullIcon} style={{backgroundColor:color}}/>
                                            <Typography className={classes.tooltipItemValue}>{value}</Typography>
                                        </div>
                                    )
                                }
                            }
                            return null
                        })}
                        {forecastTypes.map((item, index) => {
                            const relevantPayload = payload.find(x => x.dataKey === ('F__' + item))
                            if(relevantPayload) {
                                const { color, value, dataKey } = relevantPayload
                                return(
                                    <div className={classes.tooltipItem} key={dataKey}>
                                        <span className={classes.legendHollowIcon} style={{border:`2px solid ${color}`}}/>
                                        <Typography className={classes.tooltipItemValue}>{value}</Typography>
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>
                </>
            );
        }
      
        return null;
    };

    return (
        <>
            <div className={classes.root}> 
            {currentData ?
                currentData.length > 0 ?     
                    <>             
                        {renderLegend()}
                        <Scrollbar 
                            className={classes.graphContainer} 
                            noScrollY 
                            permanentTrackX
                            noDefaultStyles
                            disableTrackXMousewheelScrolling={false}
                            ref={scrollbar}
                            style={{height:(forecastMode && smallScreenSize) ? `calc(100% - 80px)` : `calc(100% - 45px)`}}
                            trackXProps={{className: classes.scrollTrack}}
                            thumbXProps={{className: classes.scrollThumb}}
                            contentProps={{className: classes.scrollContent}}
                            wrapperProps={{className: classes.scrollWrapper}}
                            scrollerProps={{className: classes.scrollScroller}}
                        >
                            <div className={classes.graphContainerInner} style={{height:'100%', width:`${zoom}%`}}>    
                                <ResponsiveContainer>
                                    <LineChart isAnimationActive={false} data={currentData} margin={{ top: 5, right: 5, left: 0, bottom: 10 }}>
                                        <YAxis 
                                            type="number" 
                                            domain={[
                                                dataMin => (Math.round(dataMin - 1)), 
                                                dataMax => (Math.round(dataMax + 1))
                                            ]} 
                                            width={40} 
                                            stroke="#E0E0E0" 
                                            tick={{ fill: '#606060', fontSize: 12, fontFamily: 'Segoe UI, Open sans, sans-serif' }}
                                        />
                                        <CartesianGrid />
                                        <Tooltip 
                                            isAnimationActive={true} 
                                            animationDuration={300} 
                                            animationEasing={'linear'} 
                                            content={renderCustomTooltip}
                                        />
                                        <XAxis 
                                            tick={renderCustomAxisTick} 
                                            dataKey="time" 
                                            stroke="#E0E0E0"
                                        />
                                        {renderReferenceAreas()}
                                        {renderDataLines()}
                                        {renderForecastLines()}
                                        {renderRuleReferenceLines()}
                                    </LineChart>  
                                </ResponsiveContainer>
                            </div>
                        </Scrollbar>
                        <div className={classes.sliderContainer}>
                            <RemoveIcon color='primary' className={cx(classes.sliderIcon, classes.leftIcon)} onClick={() => handleZoomButton('down')} />
                            <ZoomSlider 
                                value={zoom} 
                                onChange={handleZoomSlider} 
                                aria-labelledby="zoom-slider" 
                                min={100}
                                max={500}
                                className={classes.zoomSlider}
                            />
                            <AddIcon color='primary' className={cx(classes.sliderIcon, classes.rightIcon)} onClick={() => handleZoomButton('up')} />
                        </div>
                    </>
                    :
                    <>
                        <UIIcons.NoDataIcon className={classes.noData} style={{width:smallScreenSize ? '200%' : '100%'}}/>
                        <Typography className={classes.noDataText}>Ingen data</Typography>
                    </>
                :
                <LinearProgress color="primary" className={classes.loading} />
                }  
            </div>
        </>
    );
}

export default withStyles(styles)(GraphComponent);
