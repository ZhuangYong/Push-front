
import headBg from "../../../assets/img/bg/headbg-main.jpg";
export default {
    iconCard: {
        overflow: 'visible',
        padding: '1rem',
        width: 'auto'
    },
    card: {
        borderRadius: '0!important',
        boxShadow: 'none!important',
        borderBottom: '1px solid #dadada'
    },
    carHeader: {
        borderRadius: '0!important',
        backgroundImage: `url(${headBg})`,
        backgroundSize: 'cover',
        backgroundColor: '#ffffff',
    },
    avatar: {
        border: "3px solid white",
        width: '4rem!important',
        height: '4rem!important'
    },
    list: {
        padding: '0!important',
        backgroundColor: '#ffffff'
    },
    item: {
        padding: '1rem!important',
        borderTop: '1px solid #dedede'
    },
    itemIcon: {
        width: '1.4rem',
        margin: '0!important'
    },
    listItemLabel: {
        fontSize: '.86rem'
    },
    ListItemText: {
        maxWidth: '80%',
        paddingLeft: '.6rem!important'
    },
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: '.2rem 0',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'end',
    },
    infoLabel: {
        color: 'black',
        whiteSpace: 'nowrap',
        // width: '5rem',
        fontSize: '.9rem',
        fontWeight: 500,
    },
    secondary: {
        paddingRight: 12,
        fontSize: '.8rem'
    },
    searchResult: {
        margin: 0,
        position: 'relative',
        padding: '4px 12px',
        fontSize: '.86rem',
        backgroundColor: '#fbfbfb',
        borderBottom: '1px solid #ececec'
    },
    menuBottomButton: {
        bottom: 56,
        width: '100%',
        position: 'fixed!important',
        backgroundColor: 'white!important',
        borderTop: '1px solid #dedede!important',
        borderRadius: '0!important'
    }
};
