import React from 'react';
import { Modal } from 'react-bootstrap';
import classes from './Modal.module.css';


const modal = ( props ) => (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Body className={classes.ModalBody}>{props.children}</Modal.Body>
        </Modal>
    );
;


export default React.memo(modal);