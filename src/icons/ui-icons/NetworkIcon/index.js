import React from 'react';
import { ReactComponent as NetworkIcon } from './network.svg';

export default props => {
    const { className, style } = props;
    return <NetworkIcon className={className} style={style} aria-label='Network Icon' />
}