import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mainImage from "../../imagen/dog.png";
import "./homePages.css"

class HomePages extends Component {

    render() {
        return (
            <div className='c'>
                <h1 className='p'>SON LINDOS Y TRAVIESOS</h1>
                <button><Link to={"/CreateDog"}>CREAR DOG</Link> </button>
                <img src={mainImage} className="cnt" alt="perros"/>
                <button><Link to="/Main">PAGINA PRINCIPAL</Link></button>
            </div>
        );
    };
};

export default HomePages;