import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import ReadyBurger from '../../components/Burger/ReadyBurger/ReadyBurger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// REDUX
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1
}


class BurgerBuilder extends Component{
    state= {
        
        totalPrice: 3,
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

        this.setState({ purchasable: sum > 0})

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

    addIngredientHandler = (type) =>{
        // Number of ingredients of this type before adding a new one
        const oldCount = this.props.ings[type];

        // Adding one more ingredient
        const updatedCount = oldCount + 1;

        // Creating a new object
        const updatedIngredients = {
            ...this.props.ings
        };

        // Updating the new object
        updatedIngredients[type] = updatedCount;

        // Calculating the burger price
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        // Changing the state with the new object
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        // Number of ingredients before removing one 
        let oldCount = this.props.ings[type];

        // Check if we have ingredients of this type in the burger
        if(oldCount <= 0){
            return;
        };

        // Decreasing by one if ingredients are more than 1
        let updatedCount = oldCount -1;

        // Decreasing the total price 
       let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        
        // Creating a new object and updating the ingredient count
        let updatedIngredients = {...this.props.ings};
        updatedIngredients[type] = updatedCount;

        // Updating the state
        this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }

    orderHandler = () => {
        this.setState({ ordering: true })
    };

    continueToCheckoutHandler = () =>{
        const queryParams = []
        for(let i in this.props.ings){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price='+ this.state.totalPrice)
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });


        
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
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.orderHandler}
                    disabled={disabledInfo}/>
                </Auxilliary>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.state.totalPrice}
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
        ings: state.ingredients
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
