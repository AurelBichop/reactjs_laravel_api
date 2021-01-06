import React from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends React.Component{
    constructor() {
        super();
        this.state = {
            name : '',
            email : '',
            password : '',
            confirm_password: '',
            redirect: false,
            errors : []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            this.setState({redirect:true})
        }
    }

    handleNameChange = event => {
        this.setState({name : event.target.value }, ()=>{
            console.log(this.state)
        })
    }

    handleEmailChange = event => {
        this.setState({email : event.target.value }, ()=>{
            console.log(this.state)
        })
    }

    handlePasswordChange = event => {
        this.setState({password : event.target.value }, ()=>{
            console.log(this.state)
        })
    }

    handleConfirmPasswordChange = event => {
        this.setState({confirm_password : event.target.value }, ()=>{
            console.log(this.state)
        })
    }


    handleSubmit = event => {
        event.preventDefault()
        console.log('inscription')

        let bodyFormData = new FormData()
        bodyFormData.set('name', this.state.name)
        bodyFormData.set('email', this.state.email)
        bodyFormData.set('password', this.state.password)
        bodyFormData.set('confirm_password', this.state.confirm_password)

        axios.post('http://127.0.0.1:8000/api/register', bodyFormData)
            .then(res =>{
                console.log(res.data)
                localStorage.setItem('token', res.data.api_token)
                this.setState({redirect:true})
            }).catch(error =>{
                console.log(error.response)
            if(error.response.status === 401){
                this.setState({errors : error.response.data.errors }, () => {
                    console.log(this.state)
                })
            }
        })
    }

    render(){
        if(this.state.redirect){
            return (<Redirect to="/" />)
        }
        return(
            <>
                <Navbar/>
                <div className="container w-50">
                    <h2 className="text-center my-5">Inscription</h2>
                    <form method="POST" onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Nom</label>
                            <input onChange={this.handleNameChange} type="text" className={`form-control ${this.state.errors && this.state.errors.email ? "is-invalid" : ''}`} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            { this.state.errors && this.state.errors.name ? <div className="alert alert-danger">{this.state.errors["name"]}</div> : ''}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Addresse email</label>
                            <input onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            { this.state.errors && this.state.errors.email ? <div className="alert alert-danger">{this.state.errors["email"]}</div> : ''}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
                            <input onChange={this.handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1"/>
                            { this.state.errors && this.state.errors.password ? <div className="alert alert-danger">{this.state.errors["password"]}</div> : ''}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirmation du mot de passe</label>
                            <input onChange={this.handleConfirmPasswordChange} type="password" className="form-control" id="exampleInputPassword1"/>
                            { this.state.errors && this.state.errors.confirm_password ? <div className="alert alert-danger">{this.state.errors["confirm_password"]}</div> : ''}
                        </div>
                        <button type="submit" className="btn btn-primary">M'inscrire</button>
                    </form>
                </div>
            </>
        )
    }
}

export default Register