import axios from "axios";

export async function LoginPost(data) {
  const response = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    data,
  );

  return response;
}

export async function getVerify() {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}
