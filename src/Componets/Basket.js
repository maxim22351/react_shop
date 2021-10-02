import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {countSelect,productSelect} from '../store/ProductSlice'

import {add, minus,productDelete} from '../store/ProductSlice'


export default function Basket (){

    const [price, setPrice] = useState();
    const [countCart,setCountCart] = useState(2);

    const refModal = React.createRef();

    const count = useSelector(countSelect);
    const product = useSelector(productSelect);

    const dispatch = useDispatch();

    const productsObj = product.reduce((accum, item) => {
        accum[item['area']] = item;
        return accum;
    }, {});


    useEffect(()=>{
        let a = [0];

        // eslint-disable-next-line array-callback-return
        Object.keys(count).map(item=>{
            a.push(productsObj[item]['population'] * count[item])
        })

        let b = a.reduce((prev,item)=>{
            return prev + item;
        });

        setPrice(b);

        setCountCart(a.length - 1)
    },[count, productsObj])



    function modalClose(e){
        if (e.target.classList.contains("close_modal_window")) {
            refModal.current.style.display = 'none';
            document.body.style.overflow = '';
        }
        else if (e.target.classList.contains("modal")) {
            refModal.current.style.display = 'none';
            document.body.style.overflow = '';
        }

    }

    function ShowModal(){
        refModal.current.style.display = 'block';
        document.body.style.overflow = 'hidden';

    }

    return(
        <>
            <div id="my_modal" className="modal" ref={refModal} onClick={modalClose}>
                <div className="modal_content">
                    <span className="close_modal_window">×</span>
                    <table className = 'table table-striped'>
                        <thead>
                        <tr>
                            <th>Название:</th>
                            <th>Стоимость за 1:</th>
                            <th>Количество:</th>
                            <th>Стоимость:</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            Object.keys(count).map(item=>(
                                <tr key = {productsObj[item]['name'] + productsObj[item]['area']}>
                                    <td>
                                        <img src={productsObj[item]['flag']} alt={productsObj[item]['name']}/>
                                        {productsObj[item]['name']}
                                    </td>
                                    <td>
                                        ${productsObj[item]['population']}
                                    </td>
                                    <td>
                                        {count[item]}
                                        <button onClick = {()=> dispatch(add(productsObj[item]['area']))}>+</button>
                                        <button onClick = {()=> dispatch(minus(productsObj[item]['area']))}>-</button>
                                        <button onClick = {()=> dispatch(productDelete(productsObj[item]['area']))}>X</button>
                                    </td>
                                    <td>
                                        ${productsObj[item]['population'] * count[item]}
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <div className ="alert alert-primary" role="alert">
                                <b>Общастоимость:  ${price}</b>
                            </div>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            {
                (countCart > 0)? (
                    <>
                        <div className="cart" onClick={ShowModal}>
                            <img  alt='img' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ1Ni4wMjkgNDU2LjAyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNMzQ1LjYsMzM4Ljg2MmMtMjkuMTg0LDAtNTMuMjQ4LDIzLjU1Mi01My4yNDgsNTMuMjQ4YzAsMjkuMTg0LDIzLjU1Miw1My4yNDgsNTMuMjQ4LDUzLjI0OCAgICBjMjkuMTg0LDAsNTMuMjQ4LTIzLjU1Miw1My4yNDgtNTMuMjQ4QzM5OC4zMzYsMzYyLjkyNiwzNzQuNzg0LDMzOC44NjIsMzQ1LjYsMzM4Ljg2MnoiIGZpbGw9IiMwMDAwMDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQzOS4yOTYsODQuOTFjLTEuMDI0LDAtMi41Ni0wLjUxMi00LjA5Ni0wLjUxMkgxMTIuNjRsLTUuMTItMzQuMzA0QzEwNC40NDgsMjcuNTY2LDg0Ljk5MiwxMC42Nyw2MS45NTIsMTAuNjdIMjAuNDggICAgQzkuMjE2LDEwLjY3LDAsMTkuODg2LDAsMzEuMTVjMCwxMS4yNjQsOS4yMTYsMjAuNDgsMjAuNDgsMjAuNDhoNDEuNDcyYzIuNTYsMCw0LjYwOCwyLjA0OCw1LjEyLDQuNjA4bDMxLjc0NCwyMTYuMDY0ICAgIGM0LjA5NiwyNy4xMzYsMjcuNjQ4LDQ3LjYxNiw1NS4yOTYsNDcuNjE2aDIxMi45OTJjMjYuNjI0LDAsNDkuNjY0LTE4Ljk0NCw1NS4yOTYtNDUuMDU2bDMzLjI4LTE2Ni40ICAgIEM0NTcuNzI4LDk3LjcxLDQ1MC41Niw4Ni45NTgsNDM5LjI5Niw4NC45MXoiIGZpbGw9IiMwMDAwMDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTIxNS4wNCwzODkuNTVjLTEuMDI0LTI4LjE2LTI0LjU3Ni01MC42ODgtNTIuNzM2LTUwLjY4OGMtMjkuNjk2LDEuNTM2LTUyLjIyNCwyNi4xMTItNTEuMiw1NS4yOTYgICAgYzEuMDI0LDI4LjE2LDI0LjA2NCw1MC42ODgsNTIuMjI0LDUwLjY4OGgxLjAyNEMxOTMuNTM2LDQ0My4zMSwyMTYuNTc2LDQxOC43MzQsMjE1LjA0LDM4OS41NXoiIGZpbGw9IiMwMDAwMDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+" />
                            <div className='cart_count'>{countCart}</div>
                        </div>
                    </>

                ) : false
            }


        </>
    )
}