import Index from "../controller/Index";
import SelfDeviceList from "../controller/Device/SelfDeviceList";
import OrderIndex from "../controller/Order/Index";
import UserIndex from "../controller/User/Index";
import PriceIndex from "../controller/Price/Index";
import EditInfo from "../controller/User/EditInfo";
import UserIncome from "../controller/User/UserIncome";
import Path from "../utils/path";
import ElectronicAgreement from "../controller/User/ElectronicAgreement";
import Feedback from "../controller/User/Feedback";
import EditSales from "../controller/Partner/EditPartner";
import PartnerDeviceList from "../controller/Device/PartnerDeviceList";
import EditDeviceGroup from "../controller/Device/Group/EditDeviceGroup";
import CashApplyList from "../controller/Order/CashApplyList";
import SelfDeviceGroupDetail from "../controller/Device/Group/SelfDeviceGroupDetail";
import PartnerDetail from "../controller/Partner/partnerDetail";
import DeviceMarquee from "../controller/Device/Marquee/DeviceMarqueeList";
import EditMarquee from "../controller/Device/Marquee/EditMarquee";
import DeviceGroupIndex from "../controller/Device/Group/DeviceGroupIndex";
import PartnerListIndex from "../controller/Partner/PartnerListIndex";
import EditPassword from "../controller/User/EditPassword";
import ManufactureDeviceGroupIndex from "../controller/Manufacture/Device/Group/DeviceGroupIndex";
import PartnerDeviceGroupIndex from "../controller/Partner/Group/DeviceGroupIndex";
import PartnerEditDeviceGroup from "../controller/Partner/Group/EditDeviceGroup";

const dashRoutes = [
    {path: Path.PATH_INDEX, name: "index", component: Index, needLogin: true},
    {path: Path.PATH_DEVICE_GROUP_EDIT, name: "editDeviceGroup", component: EditDeviceGroup, needLogin: true},
    {path: Path.PATH_DEVICE_GROUP_SELF_DETAIL, name: "self device group detail", component: SelfDeviceGroupDetail, needLogin: true},
    {path: Path.PATH_DEVICE_INDEX, name: "device list", component: SelfDeviceList, needLogin: true},
    {path: Path.PATH_DEVICE_GROUP_INDEX, name: "device group list", component: DeviceGroupIndex, needLogin: true},
    {path: Path.PATH_DEVICE_MARQUEE_LIST, name: "device marquee", component: DeviceMarquee, needLogin: true},
    {path: Path.PATH_DEVICE_MARQUEE_EDIT, name: "edit marquee", component: EditMarquee, needLogin: true},
    {path: Path.PATH_ORDER_INDEX, name: "order", component: OrderIndex, needLogin: true},
    {path: Path.PATH_ORDER_CASH_APPLY_INDEX, name: "cash apply list", component: CashApplyList, needLogin: true},
    {path: Path.PATH_PRICE_INDEX, name: "price", component: PriceIndex, needLogin: true},
    {path: Path.PATH_USER_INDEX, name: "index", component: UserIndex, needLogin: true},
    {path: Path.PATH_USER_EDIT_INFO, name: "editUserInfo", component: EditInfo, needLogin: true},
    {path: Path.PATH_USER_EDIT_PASSWORD, name: "edit user password", component: EditPassword, needLogin: true},
    {path: Path.PATH_USER_INCOME_INFO, name: "editUserInfo", component: UserIncome, needLogin: true},
    {path: Path.PATH_USER_FEEDBACK, name: "feedback", component: Feedback, needLogin: true},
    {path: Path.PATH_USER_ELECTRONIC_AGREEMENT, name: "electronicAgreement", component: ElectronicAgreement, needLogin: true},

    // Manufacture
    {path: Path.PATH_MANUFACTURE_DEVICE_GROUP_INDEX, name: "device group list", component: ManufactureDeviceGroupIndex, needLogin: true},

    //partner
    {path: Path.PATH_PARTNER_LIST_INDEX, name: "partner list", component: PartnerListIndex, needLogin: true},
    {path: Path.PATH_PARTNER_DEVICE_GROUP_LIST, name: "partner list", component: PartnerDeviceGroupIndex, needLogin: true},
    {path: Path.PATH_PARTNER_DETAIL, name: "partner detail", component: PartnerDetail, needLogin: true},
    {path: Path.PATH_SALES_EDIT, name: "edit partner", component: EditSales, needLogin: true},
    {path: Path.PATH_DEVICE_PARTNER_INDEX, name: "partner device list", component: PartnerDeviceList, needLogin: true},
    {path: Path.PATH_DEVICE_PARTNER_GROUP_EDIT, name: "partner edit group", component: PartnerEditDeviceGroup, needLogin: true},

    {redirect: true, path: "/", pathTo: Path.PATH_INDEX, name: "index", needLogin: true}
];
export default dashRoutes;
