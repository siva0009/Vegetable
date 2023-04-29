import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./HeaderCheckout.css";

const HeaderCheckout = () => {
  const userInfo = useSelector((state) => state.userSignIn.userInfo);

  let user;
  if (userInfo && userInfo.userName) {
    user = userInfo.userName.split(" ");
  }

  return (
    <header className="row header-checkout">
      <div>
        <Link className="brand" to="/">Nutri Native</Link>
      </div>
      <div className="header-item header-item--checkout-promise">
        <div className="checkout-promise-item">
          {userInfo && userInfo.userName
            ? `Hi ${user[0]} please complete your checkout`
            : "Hi please complete your checkout"}
        </div>
      </div>
    </header>
  );
};

export default HeaderCheckout;
