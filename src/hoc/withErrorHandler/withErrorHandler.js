import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../Auxilliary/Auxilliary';
 

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
        constructor(){
            super(axios)
            this.requestInterceptor = axios.interceptors.request.use(req =>{
                this.setState({ error: null })
                return req;
            });
            this.resposeInterceptor = axios.interceptors.response.use(res=>res, error=>{
                this.setState({ error: error });

            });
        }

        state={
            error: null
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        // componentWillMount(){
        //     axios.interceptors.request.use(req =>{
        //         this.setState({ error: null })
        //         return req;
        //     });
        //     axios.interceptors.response.use(res=>res, error=>{
        //         this.setState({ error: error });

        //     });
        // }

        errorConfirmedHandler= () =>(
            this.setState({ error: null })
        );

        render(){
            return(
                <Auxilliary>
                    <Modal 
                    hide={this.errorConfirmedHandler}
                    show={this.state.error}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                    
                </Auxilliary>
        );
    }
    }
}

export default withErrorHandler;