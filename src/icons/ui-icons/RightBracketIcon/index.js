import React from 'react';
import { ReactComponent as RightBracketIcon } from './right-bracket.svg';

export default props => {
    const { className, style } = props;
    return <RightBracketIcon className={className} style={style} aria-label='Right Bracket Icon' />
}