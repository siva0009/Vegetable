import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeaderCheckout from "./components/HeaderCheckout/HeaderCheckout";
import Home from "./pages/Home/Home";
import BadRequest from "./pages/BadRequest";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import SignIn from "./components/SignIn/SignIn";
import Checkout from "./pages/Chekout/Checkout";
import UserForm from './pages/UserForm/UserForm'
import ChatGpt from "./pages/ChatGpt/ChatGpt"

import "./App.css";
import Orders from "./pages/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Wishlist from "./pages/Wishlist/Wishlist";
// import img from "./img/img.png"; 
import Background from './img/dan-gold-4_jhDO54BYg-unsplash.jpg';


const App = () => {
  const location = useLocation();

  const getHeader = () => {
    console.log(location.pathname,'nammee')
    if (location.pathname === "/checkout") {
      return <HeaderCheckout />;
    }
    else if (location.pathname === "/") {
      return null;
    }
    else {
      return <Header />;
    }
  };

  const isModal = location.state && location.state.modal;

  return (
    <div className="grid-container" style={{ backgroundImage: `url(${Background})`,
    backgroundRepeat: 'repeat', 
    backgroundAttachment:'scroll',
    height:1300}}>
      {getHeader()}
      <main>
        <Switch>
          <Route path="/" exact component={UserForm} />
          <Route path="/home"  component={Home} />
          <Route path="/ChatGpt" component={ChatGpt} />
          <Route path="/product/:id" component={Home} />
          <Route path="/checkout" component={Checkout} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/wishlist" component={Wishlist} />
          <Route component={BadRequest} />
        </Switch>
        {isModal && (
          <Route exact path="/product/:id" component={ProductDetails} />
        )}
      </main>
      <SignIn />
      <Footer />
    </div>
  );
};

export default App;
