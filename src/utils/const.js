export default {
    // 是否是生成环境
    isProduction: process.env === "production",

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
    MSG_TYPE_NOTIFICATION: 'notification'

};
