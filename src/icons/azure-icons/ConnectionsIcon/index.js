import React from 'react';
import { ReactComponent as ConnectionsIcon } from './connections.svg';

export default props => {
    const { className, style } = props;
    return <ConnectionsIcon className={className} style={style} aria-label='Connections Icon' />
}