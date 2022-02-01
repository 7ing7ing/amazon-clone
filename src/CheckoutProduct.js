import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, image, title, price, rating, hideButton}) {
   const [{ basket }, dispatch] = useStateValue();
  
   const removeFromBasket = () => {
    dispatch({
      type:'REMOVE_FROM_BASKET',
      id:  id,
    })
   } 
  return <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} alt="" />
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
            <small>$</small>
            <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
            {/*1.Array(rating) creates an array of rating empty elements, so if rating is 3, then your Array(rating) returns [empty, empty, empty].
            2.[empty, empty, empty].fill() returns [undefined, undefined, undefined], because in JavaScript, you can't map() an empty value. That's a bit quirky part of JavaScript, but it is what it is.
            3.Now, [undefined, undefined, undefined].map((_, i) => ( <p>*star*</p> )) converts your array to [<p>*star*</p>, <p>*star*</p>, <p>*star*</p>], which is not a valid JavaScript, but we're using React and JSX. It will be compiled to an array of HTML paragraph elements with a *star* as its text, each.*/}
            {Array(rating)
            .fill()
            .map((_, i) => (
                <p>⭐</p>
            ))}
        </div>
        {!hideButton &&(<button onClick={removeFromBasket}>Remove from basket</button>)}
        

      </div>
  </div>;
}

export default CheckoutProduct;
