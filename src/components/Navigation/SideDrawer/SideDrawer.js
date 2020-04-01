import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';

const sideDrawer = ( props ) => {
    let attachedClasses =[classes.SideDrawer, classes.Close]
    

    if(props.open){
        attachedClasses=[classes.SideDrawer, classes.Open];
        
    }
    
    return(
        <Auxilliary>
            <div className={classes.MobileOnly}>
                <Backdrop show={props.open} click={props.close}/> 
            </div>
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxilliary>
    );
};

export default sideDrawer;