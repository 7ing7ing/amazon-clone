import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import './Orders.css';
import { useStateValue } from './StateProvider';
import Order from './Order';
function Orders() {
    const [{  basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {

      if(user) {
        db
        .collection("users") //Accessing "users" collection
        .doc(user?.uid) //Getting the specific user uid
        .collection("orders") //Accessing that users order
        .orderBy("created", "desc")// Inside the order collection, order them by the day created in a descending order
        .onSnapshot(snapshot => ( //Mapping through that list
            setOrders(snapshot.docs.map(doc => ({ //Get the idand data of the document (in a array)
                id: doc.id,
                data: doc.data()
            })))
        ))
      } else {
          setOrders([])
      }
    }, [user])
  return <div className='orders'>
      <h1>Your orders</h1>
      <div className="orders__order">
          {orders?.map(order => (
              <Order order={order}/>
          ))}
      </div>
  </div>;
}


export default Orders;