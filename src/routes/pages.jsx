import Index from "../controller/Index";
import DeviceGroup from "../controller/Device/Index";
import DeviceList from "../controller/Device/DeviceList";
import OrderIndex from "../controller/Order/Index";
import UserIndex from "../controller/User/Index";
import EditInfo from "../controller/User/EditInfo";
import UserIncome from "../controller/User/UserIncome";
import Path from "../utils/path";
import ElectronicAgreement from "../controller/User/ElectronicAgreement";
import Feedback from "../controller/User/Feedback";

const dashRoutes = [
    {path: Path.PATH_INDEX, name: "index", component: Index, needLogin: true},
    {path: Path.PATH_DEVICE_GROUP_LIST, name: "device", component: DeviceGroup, needLogin: true},
    {path: Path.PATH_DEVICE_INDEX, name: "deviceList", component: DeviceList, needLogin: true},
    {path: Path.PATH_ORDER_INDEX, name: "order", component: OrderIndex, needLogin: true},
    {path: Path.PATH_USER_INDEX, name: "index", component: UserIndex, needLogin: true},
    {path: Path.PATH_USER_EDIT_INFO, name: "editUserInfo", component: EditInfo, needLogin: true},
    {path: Path.PATH_USER_INCOME_INFO, name: "editUserInfo", component: UserIncome, needLogin: true},
    {path: Path.PATH_USER_FEEDBACK, name: "feedback", component: Feedback, needLogin: true},
    {path: Path.PATH_USER_ELECTRONIC_AGREEMENT, name: "electronicAgreement", component: ElectronicAgreement, needLogin: true},
    {redirect: true, path: "/", pathTo: Path.PATH_INDEX, name: "index", needLogin: true}
];
export default dashRoutes;
