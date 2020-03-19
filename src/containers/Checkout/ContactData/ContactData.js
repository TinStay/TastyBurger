import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component{
    state={
        name: '',
        email: '',
        addres: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        // Switch the info of modal to a spinner
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: "Tin Stay",
                address: {
                    steet:'50a Street',
                    zipCode: '1515',
                    country: 'BG'},
                email: 'testing@gmail.com',
                deliveryTime: '5 days'
                }
        }

        axios.post('/orders.json', order)
        .then(response =>{
            this.setState({loading: false})
            this.props.history.push('/')})
        .catch(error => this.setState(
                {loading: false,
                }
            ));
    }

    render(){
        let form = (<form action="">
                <input className="d-md-flex mb-4" type="text" name='name' placeholder="Your Name"/>
                <input className="d-md-flex mb-4"  type="text" name='email' placeholder="Your Email"/>
                <input className="d-md-flex mb-4"  type="text" name='street' placeholder="Your street"/>
                <input className="d-md-flex mb-4"  type="text" name='postal code' placeholder="Your postal code"/>
                <Button onClick={this.orderHandler} variant='success'>Order</Button>
            </form>);
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className=' container border col-md-6 p-4 offset-md-3 mt-4 justify-content-center'>
                <h4>Enter your contact data</h4>
                
                {form}
            </div>
        )
    }
}

export default ContactData;