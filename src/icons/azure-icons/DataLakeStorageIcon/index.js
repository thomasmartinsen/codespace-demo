import React from 'react';
import { ReactComponent as DataLakeStorageIcon } from './data_lake_storage.svg';

export default props => {
    const { className, style } = props;
    return <DataLakeStorageIcon className={className} style={style} aria-label='Data Lake Storage Icon' />
}