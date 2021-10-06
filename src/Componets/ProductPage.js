import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import  {Link} from "react-router-dom";
import axios from "axios";

import {urlAllProduct} from "../url.json"

import Loading from "./Loading";
import ErrorPage from "./ErrorPage";



export default function ProductPage (){
    const {productUrl} = useParams();

    const [products,setProducts] = useState([]);

    const productsObj = products.reduce((accum, item) => {
        accum[item['name']] = item;
        return accum;
    }, {});




    useEffect(()=>{
        axios.get(urlAllProduct)
            .then(async resp => {
                await setProducts(resp.data)
            })

    },[])



    if (Object.keys(productsObj).length < 1){
        return <Loading/>
    }

    return (
        <>
            <div className="container mt-3">
                {
                    (productsObj[productUrl] !== undefined)?
                        (
                            <>
                                <div className="row d-flex align-items-center">
                                    <div className='col-6' key={productsObj[productUrl].name}>
                                        <img src={productsObj[productUrl].flag} alt={productsObj[productUrl].name} style={{'width': '95%'}}/>
                                    </div>
                                    <div className="col-6" key={productsObj[productUrl].name + 5}>
                                        <h2 className='test'>Название: <b>{productsObj[productUrl].name}</b></h2>
                                        <p>Столица: <b>{productsObj[productUrl].capital}</b></p>
                                        <p>Регион: <b>{productsObj[productUrl].region}</b></p>
                                        <p>Субрегион: <b>{productsObj[productUrl].subregion}</b></p>
                                        <p>Площа: <b>{productsObj[productUrl].area}</b></p>
                                    </div>
                                </div>
                                <Link to='/'className='btn btn-primary' style={{'margin': '10px 0 0 0'}}>Назад</Link>
                            </>
                        )
                        :
                        (
                            <ErrorPage/>
                        )
                }
            </div>
        </>
    )
}
