import React,{useState,useEffect} from "react";
import { useCart } from "react-use-cart";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
const ViewCart = (props) => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();
  const buy = () => {
    alert("Proceeding to Payment Gateway");

  };
  const[Agent,setAgent]=useState([]);
  useEffect(() => {
    axios.get(`https://localhost:5001/api/RestaurantOwner/ViewDeliveryAgentDetails?restaurantId=${props.restarauntId}`)
        .then((response) => {
            setAgent(response.data);
        })
}, [])
  let orderData=
    {
      restaurantId:props.restarauntId,
      agentId:Agent.agentId,
      userId:props.userId,
      paymentMode:"Card",
      totalPrice:cartTotal,
      orderStatus:"Placed"
    };
    // const [open, setOpen] = React.useState(false);
    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
    // const handleClose = () => {
    //   setOpen(false);
    // };
    const onToken = (token) =>{
      console.log(token);
      axios
			.post('https://localhost:5001/api/Customer/PlaceOrder', orderData)
         
			.then(response => {
				console.log(response)
        alert(response.data)
        alert("Delivery Agent Name : "+ Agent.agentName +" Contact : "+Agent.agentPhone)
			})
			.catch(error => {
				console.log(error)
			})
    }
 
  if (isEmpty) return <h1 className="text-center"> Your cart isEmpty </h1>;
  return (
    <section className="container">
      <div className="row jistufy-content-center">
        <div className="col-12">
          <h5>
            {" "}
            Cart ({totalUniqueItems}) total Item :({totalItems})
          </h5>
          <table className="table table-light m-0">
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>

                    <td>{item.itemName}</td>

                    <td>{item.price}</td>

                    <td>Quantity({item.quantity})</td>

                    <td>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="btn btn-info ms-2"
                      >
                        {" "}
                        -{" "}
                      </button>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="btn btn-info ms-2"
                      >
                        {" "}
                        +{" "}
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-danger ms-2"
                      >
                        {" "}
                        RemoveItem{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="col-auto ms-auto">
            <h2> total price: {cartTotal} Rs</h2>
          </div>
        </div>
        <div className="col-auto mb-2">
          <button onClick={() => emptyCart()} className="btn btn-danger ms-2">
            Clear Cart
          </button>
          <StripeCheckout
        token={onToken}        
        stripeKey="pk_test_51I1ujJGqLbtObpTq4ITwuYwxU2l6H6geTLA3uIB3jmOrPjfOymRn8HjDLF5YV75O4u7JoXX9448NnsmfbzCVY4h5005ETXLNEd"
        currency='Inr'
        amount={cartTotal*100}
      >
          <button onClick={buy} className="btn btn-primary ms-2">

            Buy Now{" "}
          </button>
          </StripeCheckout>
        </div>
      </div>
    </section>
  );
};

export default ViewCart;