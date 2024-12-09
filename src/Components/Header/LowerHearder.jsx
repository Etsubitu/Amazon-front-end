import React from "react";
import classes from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
function LowerHearder() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <GiHamburgerMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registration</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHearder;
