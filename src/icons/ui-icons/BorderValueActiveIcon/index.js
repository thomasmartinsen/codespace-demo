import React from 'react';
import { ReactComponent as BorderValueActiveIcon } from './border_value_active_icon.svg';

export default props => {
    const { className } = props;
    return <BorderValueActiveIcon className={className} aria-label='Border Value Active Icon'/>
}