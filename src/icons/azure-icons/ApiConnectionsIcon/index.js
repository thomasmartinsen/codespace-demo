import React from 'react';
import { ReactComponent as ApiConnectionsIcon } from './api_connections.svg';

export default props => {
    const { className, style } = props;
    return <ApiConnectionsIcon className={className} style={style} aria-label='Api Connections Icon' />
}