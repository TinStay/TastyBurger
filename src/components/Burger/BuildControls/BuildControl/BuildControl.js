import React from 'react';
import classes from './BuildControl.module.css';

console.log(classes);

const buildControl = ( props ) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} 
        onClick={props.removed} 
        disabled={props.disabled}>Remove</button>

        <button className={classes.More} onClick={props.added}>Add</button>
    </div>
);

export default buildControl;