import React from 'react';
import { ReactComponent as TemperatureIcon } from './temperature_icon.svg';

export default props => {
    const { className } = props;
    return <TemperatureIcon className={className} aria-label='Temperature Icon'/>
}