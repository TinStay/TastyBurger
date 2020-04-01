import * as actionTypes from '../actions/actionTypes';


const initialState ={
    orders: [],
    loading: false,
    ordered: false
}

const reducer = (state=initialState, action) =>{

    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                ordered: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }

        case actionTypes.PURCHASE_BURGER_SUCCESS:

            // Put order data and the id into one object
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }

            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                ordered: true
               
            }
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return{
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAILURE:
            return{
                ...state,
                loading: false
            }

        

        default:
            return state;
    }
};

export default reducer;