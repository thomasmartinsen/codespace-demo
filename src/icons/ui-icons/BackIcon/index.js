import React from 'react';
import { ReactComponent as BackIcon } from './back.svg';

export default props => {
    const { className, style } = props;
    return <BackIcon className={className} style={style} aria-label='Back Icon' />
}