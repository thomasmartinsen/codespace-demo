import React from 'react';
import { ReactComponent as MapMarkerAlarm } from './map_marker_alarm_icon.svg';
import { ReactComponent as MapMarkerAlarmActive } from './map_marker_alarm_active_icon.svg';

const MapMarkerAlarmIcon = props => {
    const { className, styles } = props;
    return <MapMarkerAlarm className={className} styles={styles} aria-label='Map Marker Alarm Icon'/>
}

const MapMarkerAlarmActiveIcon = props => {
    const { className, styles } = props;
    return <MapMarkerAlarmActive className={className} styles={styles} aria-label='Map Marker Alarm Active Icon'/>
}

export {
    MapMarkerAlarmIcon,
    MapMarkerAlarmActiveIcon,
}