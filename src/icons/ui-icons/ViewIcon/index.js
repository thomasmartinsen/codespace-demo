import React from 'react';
import { ReactComponent as ViewIcon } from './view.svg';

export default props => {
    const { className, style } = props;
    return <ViewIcon className={className} style={style} aria-label='View Icon' />
}