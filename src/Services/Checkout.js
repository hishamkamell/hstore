import axios from "axios";
export async function placeCashOrder(cartId, userDetails, token) {
  const res = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      shippingAddress: userDetails,
    },
    {
      headers: {
        token: token,
      },
    },
  );
  console.log(res);
  return res;
}

export async function placeCardOrder(cartId, userDetails, token) {
  const res = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
    {
      userDetails,
    },
    {
      params: {
        url: `${window.location.origin}`,
      },
      headers: {
        token: token,
      },
    },
  );
  window.location.href = res.data.session.url;
  return res;
}

export async function getOrders(userId) {
  const res = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
  );
  return res.data;
}
