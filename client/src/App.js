import "./App.css";
import Layout from "./components/partials/Layout";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./styles/bootstrap.css";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { QueryClientProvider, QueryClient } from "react-query";
import ProductProvider from "./context/products/ProductProvider";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Sales from "./components/pages/Sales";
import Products from "./components/pages/Products";
import Suppliers from "./components/pages/Suppliers";
import Settings from "./components/pages/Settings";
import UserAccounts from "./components/pages/UserAccounts";
import SalesSummary from "./components/pages/SalesSummary";
import PrintPreview from "./components/pages/PrintPreview";
import User from "./components/pages/User";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import AuthRoute from "./components/partials/AuthRoute";
import RedirectPage from "./components/partials/RedirectPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <AuthRoute>
                  <Dashboard />
                </AuthRoute>
              }
            />
            <Route
              path="sales"
              element={
                <AuthRoute>
                  <Sales />
                </AuthRoute>
              }
            />
            <Route
              path="products"
              element={
                <AuthRoute>
                  <Products />
                </AuthRoute>
              }
            />
            <Route
              path="suppliers"
              element={
                <AuthRoute>
                  <Suppliers />
                </AuthRoute>
              }
            />
            <Route
              path="settings"
              element={
                <AuthRoute>
                  <Settings />
                </AuthRoute>
              }
            />
            {/* <Route path="about" element={<About />} /> */}
            <Route
              path="accounts"
              element={
                <AuthRoute>
                  <UserAccounts />
                </AuthRoute>
              }
            />
            <Route
              path="summary"
              element={
                <AuthRoute>
                  <SalesSummary />
                </AuthRoute>
              }
            />
            <Route path="print" element={<PrintPreview />} />
            <Route path="error" element={<NotFound />} />
          </Route>
          <Route path="user" element={<User />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="redirect" element={<RedirectPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProductProvider>
    </QueryClientProvider>
  );
}

export default App;
