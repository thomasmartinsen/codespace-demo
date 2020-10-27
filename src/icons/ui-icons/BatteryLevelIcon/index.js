import React from 'react';
import { ReactComponent as BatteryLevelLow } from './battery_level_1_icon.svg';
import { ReactComponent as BatteryLevelMedium } from './battery_level_2_icon.svg';
import { ReactComponent as BatteryLevelFull } from './battery_level_full_icon.svg';

const BatteryLevelLowIcon = props => {
    const { className, style } = props;
    return <BatteryLevelLow className={className} style={style} aria-label='Battery Level Low Icon'/>
}

const BatteryLevelMediumIcon = props => {
    const { className, style } = props;
    return <BatteryLevelMedium className={className} style={style} aria-label='Battery Level Medium Icon'/>
}

const BatteryLevelFullIcon = props => {
    const { className, style } = props;
    return <BatteryLevelFull className={className} style={style} aria-label='Battery Level Full Icon'/>
}

export {
    BatteryLevelLowIcon,
    BatteryLevelMediumIcon,
    BatteryLevelFullIcon
}