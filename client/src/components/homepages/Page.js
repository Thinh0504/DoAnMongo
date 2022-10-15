import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import ProductDetails from "./productDetails/ProductDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Cart from "./cart/Cart";
import NotFound from "./utils/not-found/NotFound";
import Categories from "./category/Categories";
import CreateProducts from "./products/CreateProducts";

import { GlobalState } from "../../GlobalState";
import ProductList from "./products/ProductList";
import UserDetails from "./auth/UserDetails";
import Loading from "./utils/loading/Loading";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route exact path="/" component={Products} />
      <Route exact path="/detail/:id" component={ProductDetails} />

      <Route exact path="/login" component={isLogged ? Loading : Login} />
      <Route exact path="/register" component={isLogged ? Loading : Register} />
      <Route exact path="/user" component={isLogged ? UserDetails : Loading} />

      <Route
        exact
        path="/category"
        component={isAdmin ? Categories : Loading}
      />
      <Route
        exact
        path="/create_product"
        component={isAdmin ? CreateProducts : Loading}
      />
      <Route
        exact
        path="/product"
        component={isAdmin ? ProductList : Loading}
      />
      <Route
        exact
        path="/edit_product/:id"
        component={isAdmin ? CreateProducts : Loading}
      />

      <Route
        exact
        path="/history"
        component={isLogged ? OrderHistory : Loading}
      />
      <Route
        exact
        path="/history/:id"
        component={isLogged ? OrderDetails : Loading}
      />

      <Route exact path="/cart" component={Cart} />

      <Route exact path="*" component={NotFound} />
    </Switch>
  );
}

export default Pages;
