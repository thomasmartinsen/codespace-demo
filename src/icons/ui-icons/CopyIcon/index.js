import React from 'react';
import { ReactComponent as CopyIcon } from './copy.svg';

export default props => {
    const { className, style } = props;
    return <CopyIcon className={className} style={style} aria-label='Copy Icon' />
}