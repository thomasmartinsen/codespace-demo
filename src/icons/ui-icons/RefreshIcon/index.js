import React from 'react';
import { ReactComponent as RefreshIcon } from './refresh.svg';

export default props => {
    const { className, style } = props;
    return <RefreshIcon className={className} style={style} aria-label='Refresh Icon' />
}