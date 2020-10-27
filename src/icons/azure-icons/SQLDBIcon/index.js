import React from 'react';
import { ReactComponent as SQLDBIcon } from './sql_db.svg';

export default props => {
    const { className, style } = props;
    return <SQLDBIcon className={className} style={style} aria-label='SQL DB Icon' />
}