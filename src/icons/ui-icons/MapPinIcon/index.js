import React from 'react';
import { ReactComponent as MapPinIcon } from './map_pin_icon.svg';

export default props => {
    const { className } = props;
    return <MapPinIcon className={className} aria-label='Map Pin Icon'/>
}