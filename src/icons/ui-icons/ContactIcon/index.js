import React from 'react';
import { ReactComponent as ContactIcon } from './contact_icon.svg';

export default props => {
    const { className } = props;
    return <ContactIcon className={className} aria-label='Contact Icon'/>
}