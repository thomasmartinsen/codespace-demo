import React from 'react';
import { ReactComponent as MapIcon } from './map_icon.svg';

export default props => {
    const { className } = props;
    return <MapIcon className={className} aria-label='Map Icon'/>
}