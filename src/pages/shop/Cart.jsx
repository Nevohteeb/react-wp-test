import { useState, useEffect } from "react";
import RemoveItemFromCart from "./utilities/RemoveFromCart";
import Notification from "./utilities/Notification";
import { Link } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_BASEURL

const GetCart = () => {
    const cartKey = localStorage.getItem('cartKey');
    console.log(cartKey);
    const cartEndpoint = `${baseUrl}/wp-json/cocart/v2/cart/?cart_key=${cartKey}`
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responseReceived, setResponse] = useState(false);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        axios
            .get(cartEndpoint)
            .then((response) => {
                console.log(response.data);
                setCart(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                setLoading(false);
            });
    }, [cartEndpoint]);

    if (loading) return "Loading...";
    if (!cart) return "No data...";
    if (error) return "Error!";

    const productList = [...cart.items];
    console.log(cart);

    // Function to handle item removal from cart
  const handleRemoveFromCart = (cartItemId) => {
    RemoveItemFromCart(cartItemId, setResponse, setNotification, () => {
      // Callback function called after item removal
      axios
        .get(cartEndpoint)
        .then((response) => {
          setCart(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

    const renderedProducts = productList.map((product, index) => {
        const GetImageOrPlaceholder = () => {
            if (product.featured_image !== "") {
                return (
                    <img src={product.featured_image} alt={product.name} />
                )
            } else {
                return (
                    <img src='https://placehold.co/600x400' alt="placeholder" />
                )
            }
        }
        return (
            <div className="product-container item-container" key={index}>
                <GetImageOrPlaceholder />
                <div id="cart-item-details">
                    <p className="name"><b>{product.name}</b></p>
                    <p><b>Quantity:</b> {product.quantity.value}</p>
                    <p><b>Subtotal:</b> ${product.totals.subtotal}</p>
                    <button onClick={() => handleRemoveFromCart(product.item_key)}>Remove from cart</button>
                    {responseReceived && <Notification type={notification} />}
                </div>
            </div>

        )
    })

    const Total = () => {
        return (
            <div id="total-container">
                <p><b>Total:</b> {cart.currency.currency_code} {cart.currency.currency_symbol}{cart.totals.subtotal}</p>
            </div>
        )
    }

    return (
        <>
            <div id="rendered-products" className='container'>
                {renderedProducts}
                <Total />
                <Link to={`/checkout`} >
                  <button className="regular-button">Checkout</button>
                </Link>
            </div>
        </>
    );
};

export default GetCart;
