import axios from "axios";
const baseUrl = "https://ecommerce.routemisr.com/api/v2/cart";

export async function addToCart(productId, token) {
  const res = await axios.post(
    "https://ecommerce.routemisr.com/api/v2/cart",

    {
      productId: productId,
    },
    {
      headers: {
        token: token,
      },
    },
  );
  return res;
}

export async function getCart(token) {
  const { data } = await axios.get(`${baseUrl}`, {
    headers: {
      token: token,
    },
  });
  return data?.data;
}

export async function removeCartProduct(productId, token) {
  const res = await axios.delete(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      headers: {
        token: token,
      },
    },
  );
  return res;
}

export async function updateProductQuantity(productId, quantity, token) {
  const res = await axios.put(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      count: quantity,
    },
    {
      headers: {
        token: token,
      },
    },
  );
  return res;
}

export async function clearCart(token) {
  const res = await axios.delete(`${baseUrl}`, {
    headers: {
      token: token,
    },
  });
  return res;
}

export async function applyCoupon(coupon, token) {
  const res = await axios.put(
    "https://ecommerce.routemisr.com/api/v2/cart/applyCoupon",
    {
      couponName: coupon,
    },
    {
      headers: {
        token: token,
      },
    },
  );
  return res.data;
}
