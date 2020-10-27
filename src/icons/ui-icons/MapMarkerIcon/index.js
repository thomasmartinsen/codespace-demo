import React from 'react';
import { ReactComponent as MapMarker } from './map_marker_icon.svg';
import { ReactComponent as MapMarkerActive } from './map_marker_icon_active.svg';

const MapMarkerIcon = props => {
    const { className, styles } = props;
    return <MapMarker className={className} styles={styles} aria-label='Map Marker Icon'/>
}

const MapMarkerActiveIcon = props => {
    const { className, styles } = props;
    return <MapMarkerActive className={className} styles={styles} aria-label='Map Marker Active Icon'/>
}

export {
    MapMarkerIcon,
    MapMarkerActiveIcon,
}