import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar"
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/CartPage";
import Signup from "./pages/Signup/Signup";
import { Toaster } from "sonner"
import { useContext } from "react";
import { ThemeProviderContext } from '@/components/ui/theme';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Checkout from "./pages/Checkout/CheckoutPage";
import OrderComplete from "./pages/Orders/OrderComplete";
import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";

const router = createBrowserRouter([

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>
      },
      {
        path: "/signup",
        element: <PublicRoute> <Signup /></PublicRoute>
      },
      {
        path: "/checkout",
        element: <ProtectedRoute><Checkout /></ProtectedRoute>
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/productdetails/:id",
        element: <ProductDetails />
      },
      {
        path: "/orders/:id",
        element: <ProtectedRoute><OrderComplete /></ProtectedRoute>
      },
      {
        path: "/allorders",
        element: <ProtectedRoute><OrderComplete /></ProtectedRoute>
      },
      {
        path: "/profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      }, {
        path: "/myorders",
        element: <ProtectedRoute><Orders /></ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  },
]);
function App() {
  const { theme } = useContext(ThemeProviderContext);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center"
        richColors
        theme={theme}
      />
    </>
  )
}

export default App
