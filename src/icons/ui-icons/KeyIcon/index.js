import React from 'react';
import { ReactComponent as KeyIcon } from './key.svg';

export default props => {
    const { className, style } = props;
    return <KeyIcon className={className} style={style} aria-label='Key Icon' />
}