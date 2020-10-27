import React from 'react';
import { ReactComponent as HumidityIcon } from './humidity_icon.svg';

export default props => {
    const { className } = props;
    return <HumidityIcon className={className} aria-label='Humidity Icon' />
}