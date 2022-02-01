import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import './Payment.css';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getbasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';


function Payment() {
  const [{ basket, user}, dispatch] = useStateValue();
  const navigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceded] = useState(false);
  const [processing, setProcessing] = useState("");  
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Generate the stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
        const response = await axios({
            method: 'post',
            // Stripe expects the total in a current currencies subunit (10€ = 10,00€)
            url: `/payments/create?total=${getbasketTotal(basket) *100}`
        });
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
  }, [basket])
  //console.log("THE SECRET IS: ", clientSecret)

  const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: elements.getElement(CardElement)
          }
      }).then(({ paymentIntent }) => {
          // paymentIntent = payment confirmation

          db
            .collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount:paymentIntent.amount,
                created: paymentIntent.created
            })  

          setSucceded(true)
          setError(null)
          setProcessing(false)
          
          dispatch({
              type: "EMPTY_BASKET"
          })
          // We use replace because we don´t want the people to come back to the payment page after if they press back. Would be a loop and is not a good user interface. This swaps the page.
          navigate("/orders", { replace: true});
      })


  }

  const handleChange = event => {
    //Listen for changes in the CardElement
    //and display any errors as the costumer types their card details
    setDisabled(event.empty); //If the event is empty
    setError(event.error ? event.error.message : "") //If there is an error, show error. Otherwise, show nothing
  }

  return <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                    {/* Payment section - delivery address */}
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Delivery address</h3>
                        </div>
                        <div className="payment__address">
                            <p>{user?.email}</p>
                            <p>123 React Lane</p>
                            <p>Los Angeles, CA</p>
                        </div>
                    </div>

                    {/* Payment section - Review items */}
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review items and delivery</h3>
                        </div>  
                        <div className="payment__items">
                            {basket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                        </div>             
                    </div>

                    {/* Payment section - Payment method */}
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment method</h3>
                        </div>
                        <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className="payment__priceContainer">
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <>
                                                <h3>Order total: {value}</h3>
                                            </>
                                        )}
                                        decimalScale={2}
                                        value={getbasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                                    </button>
                                </div>

                                {/* Errors */}
                                {error && <div>{error}</div>}

                            </form>
                        </div>
                        
                    </div>
                </div>
        </div>;
}

export default Payment;
