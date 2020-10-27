import React from 'react';
import { ReactComponent as SettingsIcon } from './settings.svg';

export default props => {
    const { className, style } = props;
    return <SettingsIcon className={className} style={style} aria-label='Settings Icon' />
}