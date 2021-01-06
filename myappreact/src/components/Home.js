import React from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import { Link } from "react-router-dom"

class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            pictures : [],
            search:''
        }
    }

    componentDidMount() {
        axios.post('http://127.0.0.1:8000/api/pictures')
            .then(res => {
                this.setState({pictures:res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSearchChange = event => {
        this.setState({search : event.target.value}, function(){
            console.log(this.state)
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.getArticles()
    }

    getArticles(){
        let bodyFormData = new FormData()
        bodyFormData.set('search', this.state.search)
        axios.post('http://127.0.0.1:8000/api/pictures', bodyFormData)
            .then(res => {
                this.setState({pictures:res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className="container my-5">
                    <div className="d-flex justify-content-center mb-5">
                        <form action="" className="form-inline my-2 my-lg-0" method="POST" onSubmit={this.handleSubmit}>
                            <input name="search" type="search" className="form-control mr-sm-2" placeholder="Search a picture here" onChange={this.handleSearchChange}/>
                        </form>
                    </div>
                    <div className="row justify-content-between">
                        {
                            this.state.pictures.map((picture) =>
                                <div className="card mx-2 my-3" style={{ width:'350px'}}>
                                    <img src={`http://127.0.0.1:8000/storage/pictures/${picture.image}`} className="card-img-top" alt=""/>
                                    <div className="card-body">
                                        <h5 className="card-title">{ picture.title }</h5>
                                        <p className="card-text">{ picture.description }</p>
                                        <Link to={`/pictures/${picture.id}`} className="btn btn-primary">En savoir plus</Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}
export default Home