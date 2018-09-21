export default {
    // 是否是生成环境
    isProduction: process.env === "production",

    EVENT: {
        APP_LOADING_DONE: "appLoadingDone",
        EVENT_API_ERR: "EVENT_API_ERR",
        EVENT_MSG: "EVENT_MSG",
        EVENT_DRAWER_MENU: "EVENT_DRAWER_MENU"
    },

    // 状态
    //-----------------------------
    CODE_SUCCESS: 200,

    CODE_BAD_REQUEST: 400,

    CODE_BAD_CREDENTIALS: 401,

    CODE_SERVICE_ERR: 500,

    CODE_NEED_LOGIN: 1004,
    //-----------------------------

    // fetch方法失败提示信息显示时间
    FETCH_ERROR_COUNT: 3,

    BASE_API: process.env.apiDomain,

    ROLE: {
        J_MAKE: 1,
        SALES: 2,
        MANUFACTURE: 3
    },
    // 命令类型
    //-----------------------------
    //消息提示
    CMD_MSG: "msg",
    //-----------------------------

    // 消息提示类型
    //-----------------------------
    MSG_TYPE_ALERT: 'alert',

    //
    MSG_TYPE_NOTIFICATION: 'notification',

    // 打开一个全屏页面
    MSG_TYPE_OPEN_FULL_PAGE: 'fullPage',

    // isInit 1需要强制修改密码 2 不需要 password 密码
    // 首次登录需要修改密码
    FORCE_CHANGE_PASSWORD_FIRST_LOGIN: 1,

    FORCE_CHANGE_PASSWORD_FIRST_LOGIN_DISABLE: 2,

    // 验证密码，必须有一个大写字母and必须有一个小写字母and必须有一个数字and必须大于或等于8位
    VALID_PASSWORD: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))[A-Za-z0-9!@#$].{7,20}$/,
    // 判断用户名的email格式
    VALID_USERNAME_EMAIL: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,

    // 销售方超级管理员
    SALES_ROLE_ADMIN: 1,
    // 销售方管理账号
    SALES_ROLE_MANAGER: 2,
};
