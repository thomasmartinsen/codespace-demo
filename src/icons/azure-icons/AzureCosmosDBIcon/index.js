import React from 'react';
import { ReactComponent as AzureCosmosDBIcon } from './azure_cosmos_db.svg';

export default props => {
    const { className, style } = props;
    return <AzureCosmosDBIcon className={className} style={style} aria-label='Azure Cosmos DB Icon' />
}