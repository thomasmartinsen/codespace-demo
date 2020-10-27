import React from 'react';
import { ReactComponent as DistanceToTopIcon } from './distance_to_top_icon.svg';

export default props => {
    const { className } = props;
    return <DistanceToTopIcon className={className} aria-label='Distance To Top Icon'/>
}