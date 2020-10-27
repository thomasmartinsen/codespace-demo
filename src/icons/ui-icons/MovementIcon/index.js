import React from 'react';
import { ReactComponent as MovementIcon } from './movement_icon.svg';

export default props => {
    const { className } = props;
    return <MovementIcon className={className} aria-label='Movement Icon'/>
}