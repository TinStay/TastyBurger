import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';


const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <HamburgerMenu click={props.openMenu}/>
        <Logo height='80%'></Logo>
        <nav className={classes.DesktopOnly}>
            <NavigationItems  isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;