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

    // 查看用户信息接口
    API_STATIS_USER_INFO: "/wxback/user/index",

    // 设备组列表
    API_STATIS_DEVICE_GROUP_PAGE: "/wxback/device/index",

    // 查询设备列表
    API_STATIS_DEVICE_PAGE: "/wxback/device/deviceList",

};
