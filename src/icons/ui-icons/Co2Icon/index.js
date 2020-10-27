import React from 'react';
import { ReactComponent as Co2Icon } from './co2_icon.svg';

export default props => {
    const { className } = props;
    return <Co2Icon className={className} aria-label='Co2 Icon'/>
}