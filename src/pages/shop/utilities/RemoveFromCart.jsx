import axios from 'axios';
const baseUrl = import.meta.env.VITE_WP_BASEURL;

const RemoveItemFromCart = (cartItemId, setResponse, setNotification, callback) => {
  const idString = cartItemId.toString();

  const removeItem = (endpoint) => {
    axios
      .delete(endpoint)
      .then((response) => {
        setResponse(true);
        setNotification("Successfully removed item from cart!");
        const itemCount = response.data.item_count;
        localStorage.setItem('itemCount', itemCount);
        callback(); // Call the callback function after item removal
      })
      .catch((error) => {
        console.log(error);
        setResponse(true);
        setNotification("Sorry, there was a problem. Please try again later.");
      });
  };

  const cartEndpoint = `${baseUrl}/wp-json/cocart/v2/cart/item/${cartItemId}/?cart_key=${localStorage.cartKey}`;
  removeItem(cartEndpoint);
};

export default RemoveItemFromCart;