import Index from "../controller";
import DeviceIndex from "../controller/Device/Index";
import OrderIndex from "../controller/Order/Index";
import UserIndex from "../controller/User/Index";
import Path from "../utils/path";

const dashRoutes = [
    {path: Path.PATH_INDEX, name: "index", component: Index},
    {path: Path.PATH_DEVICE_INDEX, name: "device", component: DeviceIndex},
    {path: Path.PATH_ORDER_INDEX, name: "order", component: OrderIndex},
    {path: Path.PATH_USER_INDEX, name: "index", component: UserIndex},
    {redirect: true, path: "/", pathTo: Path.PATH_INDEX, name: "index"}
];
export default dashRoutes;
