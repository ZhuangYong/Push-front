import LoginPage from "../controller/User/LoginPage";
import Default from "../layouts/Default";
import Path from "../utils/path";

const indexRoutes = [
  {path: Path.PATH_LOGIN, name: "LoginPage", component: LoginPage},
  {path: "/", name: "Home", component: Default}
];

export default indexRoutes;
