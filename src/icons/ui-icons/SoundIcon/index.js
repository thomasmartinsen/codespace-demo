import React from 'react';
import { ReactComponent as SoundIcon } from './sound_DB_icon.svg';

export default props => {
    const { className } = props;
    return <SoundIcon className={className} aria-label='Sound Icon'/>
}