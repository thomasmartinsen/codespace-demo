import React from 'react';
import { ReactComponent as BorderValueIcon } from './border_value_icon.svg';

export default props => {
    const { className } = props;
    return <BorderValueIcon className={className} aria-label='Border Value Icon'/>
}