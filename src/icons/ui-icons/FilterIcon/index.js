import React from 'react';
import { ReactComponent as FilterIcon } from './filter_icon.svg';

export default props => {
    const { className } = props;
    return <FilterIcon className={className} aria-label='Filter Icon'/>
}