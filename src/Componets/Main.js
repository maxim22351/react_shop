import React, {useContext} from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import firebase from "firebase/compat";


import {urlAllProduct} from "../url.json"
import {Context} from "../index";

import ProductList from "./ProductList";
import Basket from "./Basket";
import Loading from "./Loading";
import ModalAuth from "./ModalAuth";

import {add,
    reset,
    countSelect,
    resetCount
} from '../store/ProductSlice'
import {useAuthState} from "react-firebase-hooks/auth";






export default function Main (){

    const {auth,firestore} = useContext(Context);
    const [user] = useAuthState(auth);


    const refUl = React.createRef();

    const [products,setProducts] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [productReset, setProductReset] = useState([]);
    const [loading,setLoading] = useState(true)

    const count = useSelector(countSelect);


    const dispatch = useDispatch();

    // Seact
    const filterCountries = products.filter(item => item.name.toLowerCase().includes(inputSearch.toLowerCase()));

    const productsObj = products.reduce((accum, item) => {
        accum[item['population']] = item;
        return accum;
    }, {});


    // Get Product
    useEffect(()=>{

        axios.get(urlAllProduct)
            .then(async resp => {
               await setProducts(resp.data)
               await setProductReset(resp.data)
               await dispatch(reset(resp.data))
            })


        if (Object.keys(count).length > 0){
            localStorage.setItem('count',JSON.stringify(count))
        }


    },[count, dispatch, user])

    useEffect(()=>{
        if (localStorage.getItem('count') !== null){
            let countLocal = JSON.parse(localStorage.getItem('count'));

            if (countLocal[Object.keys(countLocal)[0]]  > 0
                && Object.keys(countLocal).length === 1){
                localStorage.removeItem('count')
            }
        }

        dispatch(resetCount(JSON.parse(localStorage.getItem('count'))));
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

        if (event.classList.contains('btn')){
            e.preventDefault();
            if (user !== null){
                if (dataset.key !== undefined) {
                    dispatch(add(dataset.key))
                }
            } else alert('Для покупки нужно авторизивуваться')

        }

    }


    // Auth firebase
    async function clickAuth (){
        const provider =  new firebase.auth.GoogleAuthProvider()
        const {user} =  await auth.signInWithPopup(provider)

        console.log(user)
    }


    // sign firebase
   async function signOut (){
       await sendData();
        auth.signOut();
        localStorage.removeItem('count')
        dispatch(resetCount('delete'))


    }


    // Send firebase
    async function sendData (){
        let date = new Date();
        if(localStorage.getItem('count') !== null){
            await firestore.collection('react_shop').add({
                uid: user.uid,
                name: user.displayName,
                count: count,
                email: user.email,
                time: {
                  day: date.getDate(),
                  month: date.getMonth() + 1,
                  year: date.getFullYear(),
                  hours: date.getHours(),
                  minutes: date.getMinutes(),
                  seconds: date.getSeconds()
                }
            })
        }
    }

    //Loading
    function Loadings (){
        setTimeout(()=>{
            setLoading(false)
        },1000)

    }

    Loadings();


    if (loading){
        return <Loading/>
    }

    return (
        <>
            <div className="container">

                <Basket/>
                <div className="row">
                    <div className="col-2 offset-10 mt-2 d-flex flex-column">
                        {
                            (user !== null)?(
                                    <>
                                        <h4
                                            className='auth_block'
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal2"
                                        >{user.displayName}
                                        </h4>

                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName}
                                            className='auth_block'
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal2"
                                        />
                                        <button
                                            className='btn btn-danger mt-2 auth_block'
                                            style={{'width': '50%'}}
                                            onClick={signOut}
                                        >Выход</button>
                                        <ModalAuth/>
                                    </>
                                )
                                :
                                (
                                    <button
                                        className='btn btn-success'
                                        style={{'float':'right'}}
                                        onClick={clickAuth}
                                    >Авторизация</button>
                                )
                        }
                    </div>
                </div>
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

                <div className='mb-2' onClick={filterProduct}>
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