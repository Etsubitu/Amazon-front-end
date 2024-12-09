import React, { useContext } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { Link } from "react-router-dom";
import { TYPE } from "../../Utility/action.type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: TYPE.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    // console.log(id);

    dispatch({
      type: TYPE.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps ! NO item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDescription={true}
                    flex={true}
                    renderAdd={false}
                  />

                  <div className={classes.btn_container}>
                    <button onClick={() => increment(item)}>
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        <div>
          {basket?.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({total} items)</p>
                <CurrencyFormatter amount={totalPrice} />
              </div>
              <span>
                <input type="checkbox" name="" id="" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/Payment">Continue to checkout</Link>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Cart;
