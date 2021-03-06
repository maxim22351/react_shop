import React, {useContext, useEffect, useState} from "react";

import {useSelector} from "react-redux";
import {productSelect} from "../store/ProductSlice";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

import Loading from "./Loading";



export default function ModalAuth (){

    const product = useSelector(productSelect);

    const [userHistory,setUserHistory] = useState([]);
    const [loading,setLoading] = useState(true);

    const productsObj = product.reduce((accum, item) => {
        accum[item['area']] = item;
        return accum;
    }, {});

    const {auth,firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [shop] = useCollectionData(firestore.collection('react_shop').orderBy('time'))


    useEffect(()=>{

        if (shop !== undefined){
            setUserHistory(shop)
            setLoading(false)
        }
    },[shop])


    if(loading) {
        return Loading();
    }

    return(
        <>

            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel2">История</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className = 'table table-striped'>
                                <thead>
                                <tr>
                                    <th>Время:</th>
                                    <th>Название:</th>
                                    <th>Стоимость за единицу:</th>
                                    <th>Количество:</th>
                                    <th>Стоимость:</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    userHistory.map((item,index)=>(
                                        (item.uid === user.uid)?
                                            (
                                                <tr key={item.uid + index}>
                                                    <td style={{'textAlign': 'center'}}>
                                                        <div>
                                                            <p>
                                                                {(item.time.day <= 9)? '0' + item.time.day : item.time.day}.
                                                                {(item.time.month <= 9)? '0' + item.time.month : item.time.month}.
                                                                {item.time.year}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                {(item.time.hours <= 9)? '0' + item.time.hours : item.time.hours}:
                                                                {(item.time.minutes <= 9)? '0' + item.time.minutes : item.time.minutes}
                                                            </p>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        {
                                                            Object.keys(item.count).map((itemCount,indexCount)=>(
                                                                <div
                                                                    style={{'display': 'flex', 'alignItems': 'center'}}
                                                                    key={index * indexCount + productsObj[itemCount]['name']}
                                                                >

                                                                    <img
                                                                        src={productsObj[itemCount]['flag']}
                                                                        alt={productsObj[itemCount]['name']}
                                                                        style={{'display': 'block', 'marginBottom': '10px'}}
                                                                    />
                                                                    <p>{productsObj[itemCount]['name']}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className='modalAuth_table'>
                                                            {
                                                                Object.keys(item.count).map((itemCount,indexCount)=>(
                                                                    <p
                                                                        key={indexCount * index + productsObj[itemCount]['name']}
                                                                    >${productsObj[itemCount]['population']}
                                                                    </p>
                                                                ))
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='modalAuth_table'>
                                                            {
                                                                Object.keys(item.count).map((itemCount,indexCount)=>(
                                                                    <p
                                                                        key={indexCount * index + productsObj[itemCount]['name']}
                                                                    >{item.count[itemCount]}
                                                                    </p>
                                                                ))

                                                            }
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='modalAuth_table'>
                                                            {
                                                                Object.keys(item.count).map((itemCount,indexCount)=>(
                                                                    <p
                                                                        key={indexCount * index + productsObj[itemCount]['name']}
                                                                    >${productsObj[itemCount]['population'] * item.count[itemCount]}
                                                                    </p>
                                                                ))
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                            : false
                                    ))

                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}