import React from 'react';
import { ReactComponent as AzureIoTHubIcon } from './azure_iot_hub.svg';

export default props => {
    const { className, style } = props;
    return <AzureIoTHubIcon className={className} style={style} aria-label='Azure IoT Hub Icon' />
}