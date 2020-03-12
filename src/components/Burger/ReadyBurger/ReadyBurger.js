import React from 'react';
import {Card, Button} from 'react-bootstrap';
import classes from './ReadyBurger.module.css';

const readyBurger = (props) =>{
    return(
        <div className={classes.ReadyBurger}>
            <Card 
            className={classes.BurgerCard}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>Cheeseburger</Card.Title>
                    <Card.Text>
                    A delicious burger with a lot of cheese.
                    </Card.Text>
                    <Button 
                    onClick={props.load}
                    variant="primary">Load</Button>
                </Card.Body>
            </Card>  
        </div>   
    );
}


export default readyBurger;