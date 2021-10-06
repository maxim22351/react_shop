import  {Link} from "react-router-dom";

export default function Nav (){

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand">Shop React</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active">Главная</Link>
                            </li>

                            {/*<li className="nav-item">*/}
                            {/*    <a className="nav-link active" aria-current="page" href="/product">Выбрание</a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}