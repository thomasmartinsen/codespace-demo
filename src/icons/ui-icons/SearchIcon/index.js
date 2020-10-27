import React from 'react';
import { ReactComponent as SearchIcon } from './search.svg';

export default props => {
    const { className, style } = props;
    return <SearchIcon className={className} style={style} aria-label='Search Icon' />
}