import React from 'react';
import { ReactComponent as EditIcon } from './edit.svg';

export default props => {
    const { className, style } = props;
    return <EditIcon className={className} style={style} aria-label='Edit Icon' />
}