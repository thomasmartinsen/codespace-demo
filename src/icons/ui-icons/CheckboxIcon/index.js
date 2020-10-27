import React from 'react';
import { ReactComponent as CheckboxChecked } from './checkbox_checked.svg';
import { ReactComponent as CheckboxUnchecked } from './checkbox_unchecked.svg';

export const CheckboxCheckedIcon = props => {
    const { className, style } = props;
    return <CheckboxChecked className={className} style={style} aria-label='Checkbox Checked Icon' />
}

export const CheckboxUncheckedIcon = props => {
    const { className, style } = props;
    return <CheckboxUnchecked className={className} style={style} aria-label='Checkbox Unchecked Icon' />
}

