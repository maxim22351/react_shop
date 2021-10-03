import './App.css'

import  {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import Main from "./Componets/Main";
import Nav from "./Componets/Nav";
import ProductPage from "./Componets/ProductPage";

export default function App() {
  return (
    <>
      <Router>
        <Nav/>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/product' component={ProductPage}/>
          <Route exact path='/product/:productUrl' component={ProductPage}/>
        </Switch>
      </Router>

    </>
  );
}

