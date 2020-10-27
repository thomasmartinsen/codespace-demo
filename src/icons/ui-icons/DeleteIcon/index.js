import React from 'react';
import { ReactComponent as DeleteIcon } from './delete.svg';

export default props => {
    const { className, style } = props;
    return <DeleteIcon className={className} style={style} aria-label='Delete Icon' />
}