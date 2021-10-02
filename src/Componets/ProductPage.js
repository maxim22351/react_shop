import {useParams} from "react-router-dom";

import {urlAllProduct} from "../url.json"
import {useEffect, useState} from "react";

export default function ProductPage (){
    const {productUrl} = useParams();

    const [products,setProducts] = useState([]);

    useEffect(()=>{
        fetch(urlAllProduct)
            .then(resp => resp.json())
            .then(resp => setProducts(resp))

    },[])


    return (
        <>
            <div className="container mt-3">
                    {
                        products.map(item =>(
                            <>
                                {
                                    (item.name.toLowerCase() === productUrl.toLowerCase())? (
                                       <>
                                           <div className="row d-flex align-items-center" key={item.name + item.region + item.area}>
                                               <div className='col-6' key={item.name}>
                                                   <img src={item.flag} alt={item.name} style={{'width': '95%'}}/>
                                               </div>
                                               <div className="col-6" key={item.name + 5}>
                                                   <h2>Название: <b>{item.name}</b></h2>
                                                   <p>Столица: <b>{item.capital}</b></p>
                                                   <p>Регион: <b>{item.region}</b></p>
                                                   <p>Субрегион: <b>{item.subregion}</b></p>
                                                   <p>Площа: <b>{item.area}</b></p>
                                               </div>
                                           </div>
                                           <a href='/' className='btn btn-primary' style={{'margin': '10px 0 0 0'}}>Назад</a>
                                       </>
                                    )
                                    : (
                                        <>
                                            <h2 key={item.name + item.region + item.area}></h2>
                                        </>
                                      )
                                }
                            </>
                        ))
                    }
            </div>
        </>
    )
}