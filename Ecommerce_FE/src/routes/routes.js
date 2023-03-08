import config from "../config";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProductDetail from "../pages/ProductDetail/ProductDetail";

const userRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
  },
];

export { userRoutes };
