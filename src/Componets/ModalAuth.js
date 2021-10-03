import React from "react";
import {add, minus, productDelete} from "../store/ProductSlice";


export default function ModalAuth (){
    return(
        <>

            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
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
                                    <th>Стоимость за 1:</th>
                                    <th>Количество:</th>
                                    <th>Стоимость:</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/*{*/}
                                {/*    Object.keys(count).map(item=>(*/}
                                {/*        <tr key = {productsObj[item]['name'] + productsObj[item]['area']}>*/}
                                {/*            <td>*/}
                                {/*                <img src={productsObj[item]['flag']} alt={productsObj[item]['name']}/>*/}
                                {/*                {productsObj[item]['name']}*/}
                                {/*            </td>*/}
                                {/*            <td>*/}
                                {/*                ${productsObj[item]['population']}*/}
                                {/*            </td>*/}
                                {/*            */}
                                {/*        </tr>*/}
                                {/*    ))*/}
                                {/*}*/}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}