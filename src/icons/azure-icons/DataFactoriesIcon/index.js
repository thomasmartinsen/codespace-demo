import React from 'react';
import { ReactComponent as DataFactoriesIcon } from './data_factories.svg';

export default props => {
    const { className, style } = props;
    return <DataFactoriesIcon className={className} style={style} aria-label='Data Factories Icon' />
}