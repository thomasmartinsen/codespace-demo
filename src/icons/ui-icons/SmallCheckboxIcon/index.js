import React from 'react';
import { ReactComponent as SmallCheckboxChecked } from './checkbox_small_checked.svg';
import { ReactComponent as SmallCheckboxPartlyChecked } from './checkbox_small_partly_checked.svg';
import { ReactComponent as SmallCheckboxUnchecked } from './checkbox_small_unchecked.svg';

export const SmallCheckboxCheckedIcon = props => {
    const { className, style } = props;
    return <SmallCheckboxChecked className={className} style={style} aria-label='Small Checkbox Checked Icon' />
}

export const SmallCheckboxPartlyCheckedIcon = props => {
    const { className, style } = props;
    return <SmallCheckboxPartlyChecked className={className} style={style} aria-label='Small Checkbox Partly Checked Icon' />
}

export const SmallCheckboxUncheckedIcon = props => {
    const { className, style } = props;
    return <SmallCheckboxUnchecked className={className} style={style} aria-label='Small Checkbox Unchecked Icon' />
}

