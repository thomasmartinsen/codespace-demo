import React from 'react';
import { ReactComponent as BurgerMenuIcon } from './burger_menu.svg';

export default props => {
    const { className, style } = props;
    return <BurgerMenuIcon className={className} style={style} aria-label='Burger Menu Icon' />
}