import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {urlAllProduct} from "../url.json"

import ProductList from "./ProductList";
import Basket from "./Basket";

import {add,
    reset,
    countSelect,
    authСonditionSelect,
    authDataSelect,
    statusModalSelect,
    statusModalCheck,
    historySelect
} from '../store/ProductSlice'




export default function Main (){
    const axios = require('axios');

    const refUl = React.createRef();

    const [products,setProducts] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [productReset, setProductReset] = useState([]);

    const count = useSelector(countSelect);
    const authСondition = useSelector(authСonditionSelect);
    const authData = useSelector(authDataSelect);
    const statusModal = useSelector(statusModalSelect);
    const historyUser = useSelector(historySelect);

    const dispatch = useDispatch();



    // Seact
    const filterCountries = products.filter(item => item.name.toLowerCase().includes(inputSearch.toLowerCase()));

    const productsObj = products.reduce((accum, item) => {
        accum[item['population']] = item;
        return accum;
    }, {});




    useEffect(()=>{
        axios.get(urlAllProduct)
            .then(async resp => {
               await setProducts(resp.data)
               await setProductReset(resp.data)
               await dispatch(reset(resp.data))
            })

    },[])




    // Filter
    function filterProduct (e){
        let event = e.target.dataset.price;
        let a = []

        for (const item in productsObj) a.push(productsObj[item]);


        if (event === 'cheap') setProducts(a);
        else if (event === 'dear') setProducts(a.reverse());
        else if (event === 'popular') setProducts(productReset);
        else alert('Ошибка фильтра товаров');

        for (let i = 0; i < refUl.current.childNodes.length; i++)  refUl.current.childNodes[i].classList.remove('active');

        e.target.classList.add('active')
    }

    // Basket
    function checkProduct (e){
        let dataset = e.target.dataset;
        let event = e.target;

        if (event.classList.contains('star') || event.classList.contains('btn')){
            e.preventDefault();

            if (authСondition){
                if (dataset.key !== undefined) {
                    let a = [];
                    dispatch(add(dataset.key))

                    for (const item in count) {
                        a.push(item);
                    }

                };
            } else alert('Для покупки нужно авторизивуваться')

            if(event.classList.contains('star')){
                if (dataset.star === "false") { event.src = 'img/star_active.svg'; dataset.star = 'true';}
                else { event.src = 'img/star.svg'; dataset.star = 'false';}
            }
        }

    }


    return (
        <>

            <div className="container">

                <Basket/>
                <form>
                    <div className="mb-3">
                        <label  className="form-label" >Поиск:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onInput={(e => setInputSearch(e.target.value))}
                        />
                    </div>
                </form>

                <div className='mb-2'onClick={filterProduct}>
                    <ul className="list-group"  ref={refUl}>
                        <li
                            className="list-group-item active"
                            data-price = "popular">Популярные
                        </li>
                        <li
                            className="list-group-item"
                            data-price = "cheap">От дешевых к дорогим
                        </li>
                        <li
                            className="list-group-item"
                            data-price = "dear">От дорогих к дешевым
                        </li>
                    </ul>
                </div>
                <div className="row" onClick={checkProduct}>
                    {
                        filterCountries.map(item=>(
                            <ProductList
                                key = {item.alpha2Code + item.name}
                                name = {item.name}
                                flag = {item.flags.png}
                                price = {item.population}
                                keys = {item.area}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}