// 登录接口：/wxback/login
// 退出接口：/wxback/logout
// 首页统计数据：/wxback/statis/index
// 设备数据列表（分页）：/wxback/device/index
// 查询设备列表接口，不分页：/wxback/device/deviceList
// 查看用户信息接口：/wxback/user/index
// 保存用户信息接口：/wxback/user/save
// 修改密码接口：/wxback/user/modify

export default {
    // 登录
    API_USER_LOGIN: "/wxback/login",

    // 退出
    API_USER_LOGOUT: "/wxback/logout",

    // 首页统计数据
    API_STATIS_INDEX: "/wxback/statis/index",

    // 机型列表
    API_STATIS_CHANNEL_LIST: "/wxback/statis/channelList",

    // 查看用户信息接口
    API_STATIS_USER_INFO: "/wxback/user/index",

    // 修改用户信息接口
    API_USER_SAVE: "/wxback/user/save",

    // 微信授权
    API_WEIXIN_AUTH: "/wxback/auth",

    // 设备组列表
    API_STATIS_DEVICE_GROUP_PAGE: "/wxback/device/index",

    // 查询设备列表
    API_STATIS_DEVICE_PAGE: "/wxback/device/deviceList",

    // 订单列表
    API_STATIS_ORDER_PAGE: "/wxback/order/index",

    // 首页收入概况
    API_STATIS_INDEX_DETAIL: "/wxback/statis/detail",

    // 头像上传
    API_IMAGE_UPLOAD_AVATAR: "/wxback/user/saveImage",

    // 保存意见反馈
    API_USER_SAVE_FEEDBACK: "/wxback/user/saveRemark",
};
