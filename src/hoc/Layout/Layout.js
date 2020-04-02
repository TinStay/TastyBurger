import React, { Component } from 'react';
import Auxilliary from '../Auxilliary/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// Redux
import {connect } from 'react-redux';

class Layout extends Component{
    state={
        showSideDrawer: false
    }

    closeSideDrawer = () =>{
        this.setState({showSideDrawer:false})
    }

    openSideDrawerHandler = () =>{
        this.setState({showSideDrawer: true})
    }

    render(){
        console.log(this.state.showSideDrawer)
        return(
            <Auxilliary>
            <Toolbar 
            isAuth={this.props.isAuthenticated}
            openMenu={this.openSideDrawerHandler}/>
            <SideDrawer
             isAuth={this.props.isAuthenticated} 
            open={this.state.showSideDrawer}
            close={this.closeSideDrawer}
            />
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Auxilliary>
        )
    }
    
};

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);