import React from 'react';
import { ReactComponent as MonitorIcon } from './monitor.svg';

export default props => {
    const { className, style } = props;
    return <MonitorIcon className={className} style={style} aria-label='Monitor Icon' />
}