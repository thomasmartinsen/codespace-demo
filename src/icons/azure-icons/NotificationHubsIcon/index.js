import React from 'react';
import { ReactComponent as NotificationHubsIcon } from './notification_hubs.svg';

export default props => {
    const { className, style } = props;
    return <NotificationHubsIcon className={className} style={style} aria-label='Notification Hubs Icon' />
}