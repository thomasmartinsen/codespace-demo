import React from 'react';
import { ReactComponent as ApiServicePlansIcon } from './app_service_plans.svg';

export default props => {
    const { className, style } = props;
    return <ApiServicePlansIcon className={className} style={style} aria-label='Api Service Plans Icon' />
}