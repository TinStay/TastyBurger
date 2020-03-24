import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
// import ReadyBurger from '../../components/Burger/ReadyBurger/ReadyBurger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// REDUX
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';




class BurgerBuilder extends Component{
    state= {
        
        
        purchasable: false,
        ordering: false,
        loading: false,
        errorState: null
    }

    // componentDidMount(){
    //     axios.get('https://react-burger-builder-aa790.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         this.setState({ ingredients: response.data})
    //     })
    //     .catch(error => this.setState({errorState: true}));
    // }

    // Checks to see if the customer has put any ingredients
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey]
        }) // [0, 0, 1, 0] el's
        .reduce((sum, el) =>{
            return sum + el;
        } ,0);

        return sum > 0

    }

    loadReadyBurgerHandler = () =>{
        axios.get('https://react-burger-builder-aa790.firebaseio.com/cheeseburger.json')
        .then(response => {
            console.log(response)
            this.setState({ 
                ingredients: response.data.ingredients,
                totalPrice : response.data.price,
                purchasable: true
            })
        }).catch(error => console.log(error));
    }

    
    orderHandler = () => {
        this.setState({ ordering: true })
    };

    continueToCheckoutHandler = () =>{

        this.props.history.push('/checkout');
  
    }

    orderCancel = () => {
        this.setState({ordering: false})
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        // Returns True of False if there are ingredients
        // disabledInfo = {salad: true, bacon: false, ...}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let burger = this.state.errorState ? <p>Ingredients can't be loaded.</p> :<Spinner />;
        let orderSummary = null;
        {/* <ReadyBurger 
        load={this.loadReadyBurgerHandler}/> */}

        if(this.props.ings != null){
            burger= (
                <Auxilliary>
                    <Burger ingredients={this.props.ings}/>
                    
                    <BuildControls
                    addIngredient={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    order={this.orderHandler}
                    disabled={disabledInfo}/>
                </Auxilliary>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                close={this.orderCancel}
                continue={this.continueToCheckoutHandler}
                />
        }
        // Displays a spinner while waiting to post data to the DB
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return(
            <Auxilliary>
                <Modal show={this.state.ordering} 
                hide={this.orderCancel}>
                {orderSummary}
                </Modal>

                {burger}
            </Auxilliary>
        );
    }
}


const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
