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

    // 微信授权
    API_WEIXIN_AUTH: "/wxback/auth",

    // 首页统计数据
    API_STATIS_INDEX: "/wxback/statis/index",

    // 机型列表
    API_STATIS_CHANNEL_LIST: "/wxback/statis/channelList",

    // 查看用户信息接口
    API_STATIS_USER_INFO: "/wxback/user/index",

    // 修改用户信息接口
    API_USER_SAVE: "/wxback/user/save",

    // 设备组列表（销售方|自营分组）
    API_STATIS_DEVICE_GROUP_PAGE: "/wxback/device/index",

    // 查询设备列表
    API_STATIS_DEVICE_PAGE: "/wxback/device/deviceList",

    // 订单列表
    API_STATIS_ORDER_PAGE: "/wxback/order/index",

    // 提现申请
    API_ORDER_CASH_APPLY: "/wxback/order/cashApply",

    // 提现记录
    API_ORDER_CASH_LIST: "/wxback/order/cashList",

    // 提现相关信息
    API_ORDER_CASH_DETAIL: "/wxback/order/cashDetail",

    // 首页收入概况
    API_STATIS_INDEX_DETAIL: "/wxback/statis/detail",

    // 头像上传
    API_IMAGE_UPLOAD_AVATAR: "/wxback/user/saveImage",

    // 保存意见反馈
    API_USER_SAVE_FEEDBACK: "/wxback/user/saveRemark",

    // 保存设备信息
    API_DEVICE_SAVE_INFO: "/wxback/device/save",

    // 查看产品列表分页
    API_PRICE_PRODUCT_PAGE: "/wxback/product/index",

    // 修改价格
    API_PRICE_PRODUCT_SAVE: "/wxback/product/save",

    // ------- 合作伙伴 ------
    // 查询销售方
    API_SALES_PAGE: "/wxback/device/salesList",

    // 合作伙伴详情
    API_PARTNER_DETAIL: "/wxback/user/child/",

    // 保存销售方
    API_SALES_EDIT: "/wxback/device/saveSales",

    // 保存销售方设备(选择设备保存)
    API_SALES_SAVE_DEVICE: "/wxback/device/saveDevice",

    // ----------自营---------
    // 设备组详情
    API_DEVICE_GROUP_STATIS: "/wxback/statis/group/",

    // 保存设备组
    API_DEVICE_GROUP_SAVE: "/wxback/device/saveGroup",

    // 销售组的跑马灯列表
    API_DEVICE_MARQUEE_LIST: "/wxback/marquee/index",

    // 销售组的跑马灯修改
    API_DEVICE_MARQUEE_SAVE: "/wxback/marquee/save",
};
