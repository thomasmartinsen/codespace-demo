import React from 'react';
import { ReactComponent as CloseIcon } from './close_icon.svg';

export default props => {
    const { className } = props;
    return <CloseIcon className={className} aria-label='Close Icon'/>
}