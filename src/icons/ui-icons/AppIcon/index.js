import React from 'react';
import { ReactComponent as AppIcon } from './app_icon.svg';

export default props => {
    const { className } = props;
    return <AppIcon className={className} aria-label='App Icon' />
}