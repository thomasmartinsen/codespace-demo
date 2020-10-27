import React from 'react';
import { ReactComponent as NoDataIcon } from './no_data_icon.svg';

export default props => {
    const { className, style } = props;
    return <NoDataIcon className={className} style={style} aria-label='No Data Icon'/>
}