import axios from "axios";
export default async function getsProducts(
  categoriesFilter,
  priceFilter,
  sortingFilter,
  pageFilter,
  limit,
  brandsFilter,
) {
  const res = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      params: {
        "category[in]": [...categoriesFilter],
        "brand[in]": [...brandsFilter],
        "price[gte]": priceFilter[0],
        "price[lte]": priceFilter[1],
        sort: sortingFilter,
        limit: 12,
        page: pageFilter,
      },
    },
  );

  return res.data;
}

export async function getAllProducts() {
  const res = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products",
  );

  return res.data;
}
export async function getCategories() {
  const res = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );
  return res.data.data;
}
