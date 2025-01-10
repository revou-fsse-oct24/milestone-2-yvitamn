import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashbord from "./pages/Dashbord";
import MyAccount from "./components/dashboard/MyAccount";
import MyOrders from "./components/dashboard/MyOrders";
import Protected from "./components/Protected";
import AuthProtected from "./components/AuthProtected";
import ProductsProvider from "./contexts/ProductsProvider";
import CartProvider from "./contexts/CartProvider";
import AuthenticateProvider from "./contexts/AuthenticateProvider";

function App() {
    return (
      <>
        <AuthenticateProvider>
          <CartProvider>
            <ProductsProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<DetailPage />} />
                  <Route path="/*" element={<NotFound />} />
  
                  <Route element={<AuthProtected />}>
                    <Route path="/auth/signup" element={<Signup />} />
                    <Route path="/auth/login" element={<Login />} />
                  </Route>
  
                  <Route element={<Protected />}>
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/dashboard" element={<Dashbord />}>
                      <Route path="my-account" element={<MyAccount />} />
                      <Route path="my-orders" element={<MyOrders />} />
                    </Route>
                  </Route>
  
                  <Route path="/signup" element={<Navigate to="/auth/signup" />} />
                  <Route path="/login" element={<Navigate to="/auth/login" />} />
                </Routes>
              </Layout>
            </ProductsProvider>
          </CartProvider>
        </AuthenticateProvider>
      </>
    );
  }
  
  export default App;