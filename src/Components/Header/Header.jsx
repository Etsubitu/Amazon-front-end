import React, { useContext } from "react";

import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHearder from "./LowerHearder";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section className={classes.header_container}>
        <div className={classes.logo_container}>
          {/* {logo } */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt=""
            />
          </Link>

          {/* {Delivery} */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          {/* {search} */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="search product" />
          <BsSearch size={38} />
        </div>

        {/* {right side link} */}
        <div>
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />
              <section name="" id="">
                <option value="">EN</option>
              </section>
            </Link>

            {/* { three components} */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p> Hello, {user.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}> Sign Out </span>
                  </>
                ) : (
                  <>
                    <p>Sign In</p>
                    <span> Account & Lists </span>
                  </>
                )}
              </div>
            </Link>

            {/* {order} */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            {/* {Cart} */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{total}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHearder />
    </section>
  );
}
export default Header;
