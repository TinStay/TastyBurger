import React from "react";
import classes from './Order.module.css';


const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({      
            name: ingredientName,       
            amount: props.ingredients[ingredientName]
        })
    };

    const ingredientOutput = ingredients.map(ig => {
    return <span 
    style={{textTransfrom: 'capitalize',
            displa: "inline-block",
            margin: '5px',
            }}
    key={ig.name}><strong>{ig.amount}x</strong> {ig.name}
    </span>
    })


    return(
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>{props.price} USD</strong></p>
    </div>
    )
        
};


export default order;