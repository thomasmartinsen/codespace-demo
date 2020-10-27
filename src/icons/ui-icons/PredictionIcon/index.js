import React from 'react';
import { ReactComponent as PredictionIcon } from './prediction_icon.svg';

export default props => {
    const { className } = props;
    return <PredictionIcon className={className} aria-label='Prediction Icon'/>
}