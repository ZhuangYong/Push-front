import React from "react";
import customStyle from "../../assets/jss/view/custom";
import SalesPage from "../../components/CommonPage/SalesPage";

const style = {
    ...customStyle,
    menuBottomButton: {
        bottom: 56,
        width: '100%',
        position: 'fixed',
        backgroundColor: 'white',
        borderTop: '1px solid #dedede',
        borderRadius: 0
    }
};
export default class PartnerListIndex extends SalesPage {

}
