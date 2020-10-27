import React from 'react';
import { ReactComponent as ApiConfigurationIcon } from './app_configuration.svg';

export default props => {
    const { className, style } = props;
    return <ApiConfigurationIcon className={className} style={style} aria-label='Api Configuration Icon' />
}