import React from 'react';
import { ReactComponent as PlusIcon } from './plus.svg';

export default props => {
    const { className, style } = props;
    return <PlusIcon className={className} style={style} aria-label='Plus Icon' />
}