import axios from "axios";

export const ProductById = async (id) => {
  const res = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
  );
  console.log(res);
  return res.data.data.data;
};
