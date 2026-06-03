import axios from "axios";

export default async function getBrands() {
  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  return res.data.data;
}
