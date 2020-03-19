import React from 'react';
import {Card, Button} from 'react-bootstrap';
import classes from './ReadyBurger.module.css';
import Cheeseburger from '../../../assets/images/cheeseburger.png';

const readyBurger = (props) =>{
    return(
        <div className={classes.ReadyBurger}>
            <Card 
            className={classes.BurgerCard}>
                <Card.Img variant="top" src={Cheeseburger} />
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