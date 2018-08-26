import Index from "../controller/Index";
import DeviceGroup from "../controller/Device/Index";
import SelfDeviceList from "../controller/Device/SelfDeviceList";
import OrderIndex from "../controller/Order/Index";
import UserIndex from "../controller/User/Index";
import PriceIndex from "../controller/price/Index";
import EditInfo from "../controller/User/EditInfo";
import UserIncome from "../controller/User/UserIncome";
import Path from "../utils/path";
import ElectronicAgreement from "../controller/User/ElectronicAgreement";
import Feedback from "../controller/User/Feedback";
import EditSales from "../controller/Partner/EditPartner";
import PartnerDeviceList from "../controller/Device/PartnerDeviceList";
import EditDeviceGroup from "../controller/Device/EditDeviceGroup";
import CashApplyList from "../controller/Order/CashApplyList";
import SelfDeviceGroupDetail from "../controller/Device/SelfDeviceGroupDetail";
import PartnerDetail from "../controller/Partner/partnerDetail";
import DeviceMarquee from "../controller/Device/Marquee/DeviceMarqueeList";
import EditMarquee from "../controller/Device/Marquee/EditMarquee";

const dashRoutes = [
    {path: Path.PATH_INDEX, name: "index", component: Index, needLogin: true},
    {path: Path.PATH_DEVICE_GROUP_LIST, name: "deviceGroup", component: DeviceGroup, needLogin: true},
    {path: Path.PATH_DEVICE_GROUP_EDIT, name: "editDeviceGroup", component: EditDeviceGroup, needLogin: true},
    {path: Path.PATH_DEVICE_GROUP_SELF_DETAIL, name: "self device group detail", component: SelfDeviceGroupDetail, needLogin: true},
    {path: Path.PATH_PARTNER_DETAIL, name: "partner detail", component: PartnerDetail, needLogin: true},
    {path: Path.PATH_DEVICE_INDEX, name: "deviceList", component: SelfDeviceList, needLogin: true},
    {path: Path.PATH_DEVICE_MARQUEE_LIST, name: "device marquee", component: DeviceMarquee, needLogin: true},
    {path: Path.PATH_DEVICE_MARQUEE_EDIT, name: "edit marquee", component: EditMarquee, needLogin: true},
    {path: Path.PATH_DEVICE_PARTNER_INDEX, name: "partnerDeviceList", component: PartnerDeviceList, needLogin: true},
    {path: Path.PATH_SALES_EDIT, name: "edit sales", component: EditSales, needLogin: true},
    {path: Path.PATH_ORDER_INDEX, name: "order", component: OrderIndex, needLogin: true},
    {path: Path.PATH_ORDER_CASH_APPLY_INDEX, name: "cash apply list", component: CashApplyList, needLogin: true},
    {path: Path.PATH_PRICE_INDEX, name: "price", component: PriceIndex, needLogin: true},
    {path: Path.PATH_USER_INDEX, name: "index", component: UserIndex, needLogin: true},
    {path: Path.PATH_USER_EDIT_INFO, name: "editUserInfo", component: EditInfo, needLogin: true},
    {path: Path.PATH_USER_INCOME_INFO, name: "editUserInfo", component: UserIncome, needLogin: true},
    {path: Path.PATH_USER_FEEDBACK, name: "feedback", component: Feedback, needLogin: true},
    {path: Path.PATH_USER_ELECTRONIC_AGREEMENT, name: "electronicAgreement", component: ElectronicAgreement, needLogin: true},
    {redirect: true, path: "/", pathTo: Path.PATH_INDEX, name: "index", needLogin: true}
];
export default dashRoutes;
