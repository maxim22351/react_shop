export default function ProductList (props){
    return (
        <>
            <div className="card col-12 col-lg-3">
                <a
                    href={`product/${props.name.toLowerCase()}`}
                    style={{'textDecoration':'none','color': '#000'}}
                >
                    <img src={props.flag} className="card-img-top" alt={props.name}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p><br />
                        <h4>Стоимость: ${props.price}</h4>
                        <div className="buy">
                            <a href ='/' className="btn btn-primary" data-key = {props.keys}>Купить</a>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}