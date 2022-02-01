import React, { useEffect } from "react";
import './App.css';
import Header from './Header';
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment  from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe("pk_test_51KNGc3CBqQ39smq1NBkU842nevOzpfG4Br5Nb8fslaeDGZXzKcwfjBa8vtxJWC9gypRQkzAlGHNJblJhKsFTKGML00PAd2YecW")

function App() {
  const [{}, dispatch] = useStateValue();

  //A listener that keeps track of who is signed
  useEffect(() => {
    //Will only run once when the app component loads (if empty brackets). If we put user or basket inside, it will run everytime  one of those are changed.

    //This is like a listener for log-ins and log-outs.  
    //authUser is the user from firebase.  
    auth.onAuthStateChanged(authUser => {
      //console.log("THE USER IS >>>", authUser);

      if (authUser) {
        // The user just logged in / was logged in

        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
    <div className="app">
        <Routes>
          <Route path="/orders" element={[
            <Header/>,
            <Orders/>
            ]}/>
          <Route path="/login" element={
            <Login/>}/>
          <Route path="/checkout" element={[
              <Header/>,
              <Checkout/>
            ]} />
          <Route path="/payment" element={[
              <Header/>,
              <Elements stripe={promise}>
                <Payment/>
              </Elements>
            ]}/>  
          <Route path="*" element={[
            <Header/>,
            <Home/>]}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
