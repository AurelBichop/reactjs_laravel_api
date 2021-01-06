import React from 'react'
import Navbar from "./Navbar";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class PostArticle extends React.Component{
    constructor() {
        super();
        this.state = {
            title: '',
            description:'',
            image:{},
            redirect:false,
            errors : []
        }
    }

    handleTitleChange = event => {
        this.setState({title : event.target.value }, ()=>{
            console.log(this.state)
        })
    }

    handleDescriptionChange = event => {
        this.setState({description : event.target.value }, ()=>{
            console.log(this.state)
        })
    }

    handleImageChange = event => {
        this.setState({image : event.target.files[0] }, ()=>{
            console.log(this.state)
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        let bodyFormData = new FormData()
        bodyFormData.set('title', this.state.title)
        bodyFormData.set('description', this.state.description)
        bodyFormData.set('image', this.state.image)

        let headers = {
            headers:{
                'API-TOKEN':localStorage.getItem('token')
            }
        }


        axios.post('http://127.0.0.1:8000/api/pictures/store', bodyFormData, headers)
            .then(res =>{
                //console.log(res)
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
                    <h2 className="text-center my-5">Ajouter une nouvelle photo</h2>
                    <form method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Titre</label>
                            <input onChange={this.handleTitleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            { this.state.errors && this.state.errors.title ? <div className="alert alert-danger">{this.state.errors["title"]}</div> : ''}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                            <textarea onChange={this.handleDescriptionChange} className="form-control"/>
                            { this.state.errors && this.state.errors.description ? <div className="alert alert-danger">{this.state.errors['description']}</div>: ''}
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                            <input onChange={this.handleImageChange} type="file" className="form-control" id="inputGroupFile01"/>
                            { this.state.errors && this.state.errors.image ? <div className="alert alert-danger">{this.state.errors['image']}</div>: ''}
                        </div>
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </form>
                </div>
            </>
        )
    }
}

export default PostArticle