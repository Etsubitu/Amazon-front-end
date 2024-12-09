import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Result from "./pages/Result/Result";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51QToyoKLq5mni4XMevn2u7DDpBuvUYEd19fqPFQAghpJsOQBfdsqfBEdMr8tT9wrdd4sTftYBxUAMlWVpuMhKlQV002Aiqx4du"
);
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={
          <Elements stripe = {stripePromise}>
            <Payment/>
          </Elements>
        } 
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
