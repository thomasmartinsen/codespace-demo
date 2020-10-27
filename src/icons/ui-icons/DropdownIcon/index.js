import React from 'react';
import {ReactComponent as DropdownIcon } from './dropdown_icon.svg';

export default props => {
    const { className } = props;
    return <DropdownIcon className={className} aria-label='Dropdown Icon'/>
}