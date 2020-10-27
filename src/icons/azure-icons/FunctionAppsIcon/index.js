import React from 'react';
import { ReactComponent as FunctionAppsIcon } from './function_apps.svg';

export default props => {
    const { className, style } = props;
    return <FunctionAppsIcon className={className} style={style} aria-label='Function Apps Icon' />
}