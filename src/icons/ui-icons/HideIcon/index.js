import React from 'react';
import { ReactComponent as HideIcon } from './hide.svg';

export default props => {
    const { className, style } = props;
    return <HideIcon className={className} style={style} aria-label='Hide Icon' />
}