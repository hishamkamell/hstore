import axios from "axios";

export default async function getCategories() {
  const res = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );
  return res.data.data;
}
