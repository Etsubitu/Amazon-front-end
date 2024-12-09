import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { axiosInstance } from "../../API/axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../../Utility/firebase";
import { TYPE } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket } , dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState(false)
  const [error,setError]=useState("");
  const [processing, setProcessing] = useState(false);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };
  const handlePayment = async (e) => 
  {
    e.preventDefault();
    try {
      setProcessing(true);
      setLoading(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response?.data?.clientSecret;
      console.log(clientSecret)

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log("confirmaiton");
      await db
        .collection("user")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        dispatch({
          type:TYPE.EMPTY_BASKET
        })
      // setProcessing(false);
      setLoading(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.log(error);
      // setProcessing(false);
      setLoading(false);
    }
  }
    return (
      <LayOut>
        {/* header */}
        <div className={classes.payment_header}>
          Checkout ({totalItem}) items
        </div>

        {/* Payment method  */}
        <section className={classes.payment}>
          {/* address */}
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email}</div>
              <div>123 Sun St Oakland CA, 91235</div>
              <div> Sun St Oakland</div>
            </div>
          </div>
          <hr />
          {/* Product */}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
              {basket?.map((item, i) => (
                <ProductCard key={i} product={item} flex={true} />
              ))}
            </div>
          </div>
          <hr />
          {/* card form  */}
          <div className={classes.flex}>
            <h3> Payment Method </h3>
            <div className={classes.payment_card_container}>
              <div className={classes.payment_detail}>
                <form onSubmit={handlePayment}>
                  {/* error */}
                  {cardError && (
                    <small style={{ color: "red", gap: "10px" }}>
                      {cardError}
                    </small>
                  )}
                  {/* card element  */}
                  <CardElement onChange={handleChange} />

                  {/* Price */}
                  <div className={classes.payment_price}>
                    <span>
                      {""}
                      <p>Total Order | </p> <CurrencyFormatter amount={total} />
                      {""}
                    </span>
                    <button type="submit">
                      {processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12} />
                          <p>Please wait ...</p>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </LayOut>
    );
  }
  
  

export default Payment;
