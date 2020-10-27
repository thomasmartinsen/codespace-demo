import React from 'react';
import { ReactComponent as DistanceVerticalIcon } from './distance_vertical_icon.svg';

export default props => {
    const { className } = props;
    return <DistanceVerticalIcon className={className} aria-label='Distance Vertical Icon'/>
}