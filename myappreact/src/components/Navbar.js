import React from "react";
import { Link } from "react-router-dom"

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            token:null
        }
    }

    logout = () => {
        localStorage.setItem('token','')
        localStorage.clear()
        this.setState({token:null})
    }


    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">LaReact</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav ms-auto">
                                {
                                    localStorage.getItem('token')
                                    ?
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to="/pictures/new">Poster une photo</Link>
                                            </li>
                                            <li className="nav-item">
                                                <button className="btn" onClick={() => this.logout()}>Deconnexion</button>
                                            </li>
                                        </>
                                    :
                                        <>
                                            <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/login">Connexion</Link>
                                            </li>
                                            <li className="nav-item">
                                            <Link className="nav-link" to="/register">Inscription</Link>
                                            </li>
                                        </>
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Navbar