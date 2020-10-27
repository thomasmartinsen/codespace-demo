import React from 'react';
import { ReactComponent as CounterIcon } from './counter_icon.svg';

export default props => {
    const { className } = props;
    return <CounterIcon className={className} aria-label='Counter Icon'/>
}