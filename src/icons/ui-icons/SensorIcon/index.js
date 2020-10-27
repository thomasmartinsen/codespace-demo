import React from 'react';
import { ReactComponent as SensorIcon } from './sensor_icon.svg';

export default props => {
    const { className } = props;
    return <SensorIcon className={className} aria-label='Sensor Icon'/>
}