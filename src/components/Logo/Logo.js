import React from 'react';
import classes from './Logo.module.css'
import burgerLogo from '../../assets/images/BurgerLogo.png';

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="uburger"></img>
    </div>
);


export default logo;