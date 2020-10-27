import React from 'react';
import { ReactComponent as LightIcon } from './light_lumen_icon.svg';

export default props => {
    const { className } = props;
    return <LightIcon className={className} aria-label='Light Icon'/>
}