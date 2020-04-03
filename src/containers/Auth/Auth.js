import React, {PureComponent} from "react";
import Input from '../../components/UI/Input/Input';
import {Button } from 'react-bootstrap';
import Spinner from '../../components/UI/Spinner/Spinner';
// Router
import { Redirect } from 'react-router-dom';

// Redux store
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';

class Auth extends PureComponent{
    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address',
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                toched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 8
                },
                valid: false,
                toched: false
            }
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid

    }

    inputChangeHandler = (e, controlName) => {
        // Update control inputs
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }


        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = e => {
        e.preventDefault();
        const emailValue = this.state.controls.email.value
        const passwordValue = this.state.controls.password.value

        this.props.onAuth(emailValue, passwordValue, this.state.isSignup);
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState =>{
            return {isSignup: !prevState.isSignup};
        })
    }


    render(){
        const formElementsArray = []

        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
                })
        }

        let form = formElementsArray.map(formElement =>(
            <Input 
            key={formElement.id}
            shouldValidate = {formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} 
            change={(e) => this.inputChangeHandler(e, formElement.id)} />
           
        ) )

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = <p className="btn-danger">{this.props.error.message}</p>
        }

        let authRedirect = null ;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }


        return(
            <div className="container border">
                {authRedirect}
                <form className=" p-4" onSubmit={this.submitHandler} action="">
                <h1>{this.state.isSignup ? "Sign up" : "Sign in"}</h1>
                {errorMessage}
                {form}
                <Button type="submit" variant="success">SUBMIT</Button>
                </form>
                <button className="btn btn-outline-primary ml-4 m-3" onClick={this.switchAuthModeHandler}> SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}</button>

                
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth. authRedirectPath,

    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email,password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);