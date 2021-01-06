import React from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons'

class Login extends React.Component{
    constructor() {
        super();
        this.state = {
            email : '',
            password : '',
            redirect: false,
            errors : []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            this.setState({redirect:true})
        }
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


    handleSubmit = event => {
        event.preventDefault()
        //console.log('connexion')

        let bodyFormData = new FormData()
        bodyFormData.set('email', this.state.email)
        bodyFormData.set('password', this.state.password)

        axios.post('http://127.0.0.1:8000/api/login', bodyFormData)
            .then(res =>{
                console.log(res.data)
                localStorage.setItem('token', res.data.api_token)
                this.setState({redirect:true})
            }).catch(error =>{
                if(error.response.status === 401){
                    this.setState({errors : error.response.data.errors }, () => {
                        console.log(this.state)
                    })
                }
            console.log(error.response)
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
                    <h2 className="text-center my-5">Connexion</h2>
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Addresse email</label>
                            <input onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            { this.state.errors && this.state.errors.email ? <div className="alert alert-danger">{this.state.errors["email"]}</div> : ''}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
                            <input onChange={this.handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1"/>
                            { this.state.errors && this.state.errors.password ? <div className="alert alert-danger">{this.state.errors['password']}</div>: ''}
                        </div>
                        {this.state.errors && this.state.errors === 'bad credentials' ? <div className="alert alert-warning">Vos identifiants sont incorrect</div>: ''}
                        <button type="submit" className="btn btn-primary">Me connecter</button>
                    </form>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <a href="http://127.0.0.1:8000/auth/redirect/google">
                        <GoogleLoginButton style={{maxWidth:400,minWidth:300}} />
                    </a>
                </div>
            </>
        )
    }
}

export default Login