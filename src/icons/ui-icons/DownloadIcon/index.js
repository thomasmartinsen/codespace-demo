import React from 'react';
import { ReactComponent as DownloadIcon } from './download.svg';

export default props => {
    const { className, style } = props;
    return <DownloadIcon className={className} style={style} aria-label='Download Icon' />
}