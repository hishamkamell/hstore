import axios from "axios";
import { toast } from "sonner";

export async function getReviews(id) {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
  );
  return data?.data;
}

export async function getUserReview(id) {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
  );
  return data?.data;
}

export async function addReview(token, id, review) {
  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
    review,
    {
      headers: {
        token: token,
      },
    },
  );

  return data;
}
export async function getAllReviews() {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/reviews`,
  );
  return data?.data;
}
