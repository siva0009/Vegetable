import React, { Fragment, useEffect } from "react";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import vegetablesList from "../../store/actions/actionCreators/productsListAction";
import Sidebar from "../../components/Sidebar/Sidebar";
import Product from "../../container/Product/Product";
import { signInOpen } from "../../store/actions/actionCreators/signInAction";
import { useHistory } from 'react-router-dom';

const Home = (props) => {
  const dispatch = useDispatch();

  const vegetablesData = useSelector((state) => state.products);
  const removeFromWishlist = useSelector((state) => state.removeFromWishlist);
  const wishlist = useSelector((state) => state.wishlist);
  const searchTerm = useSelector((state) => state.searchFilter);

  const { loading, error, vegetables, chatGPTSuggestion } = vegetablesData;
  const history = useHistory();


  useEffect(() => {
    const unblock = history.block((location) => {
      if (location.pathname === '/') {
        return false; // Prevent navigation to the previous page
      }
      return true;
    });

    return () => {
      unblock(); // Re-enable navigation when the component is unmounted
    };
  }, [history]);

  useEffect(() => {
    dispatch(vegetablesList());
  }, [dispatch]);

  useEffect(() => {
    if (removeFromWishlist.loading === false) {
      dispatch(vegetablesList());
    }
  }, [dispatch, removeFromWishlist]);

  useEffect(() => {
    if (wishlist.success === true) {
      dispatch(vegetablesList());
    }
  }, [dispatch, wishlist]);

  useEffect(() => {
    if (props.history.location.state === undefined) {
      return false;
    }
    if (props.history.location.state.pathname === "/orders") {
      dispatch(signInOpen());
    }
    if (props.history.location.state.pathname === "/wishlist") {
      dispatch(signInOpen());
    }
  }, [props.history.location.state, dispatch]);

  const filterProducts =
    vegetables &&
    vegetables.filter((vegetable) => {
      if (
        vegetable.name.toLowerCase().includes(searchTerm) ||
        vegetable.description.toLowerCase().includes(searchTerm)
      ) {
        return vegetable;
      }
      return false;
    });

  return (
    <Fragment>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox varient="error">{error}</ErrorBox>
      ) : (
        
      <div>
        <div>
          <h1>ChatGPT Analysis of Health condition and Suggested vegetables</h1>
          <p id="reponse">{chatGPTSuggestion}</p>
        </div> 
      
        <div className="row center">
          {filterProducts &&
            filterProducts.map((vegetable) => (
              <Product key={vegetable._id} product={vegetable} />
            ))}
        </div>
      </div>
      )}
      <Sidebar />
    </Fragment>
  );
};
export default withRouter(Home);
