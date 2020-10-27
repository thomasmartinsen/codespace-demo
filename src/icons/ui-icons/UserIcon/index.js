import React from 'react';
import { ReactComponent as UserIcon } from './user.svg';

export default props => {
    const { className, style } = props;
    return <UserIcon className={className} style={style} aria-label='User Icon' />
}