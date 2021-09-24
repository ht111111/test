
let express = require('express');
let router = express.Router()

//导入constroll的处理函数
let userinfoHandler = require('../constroller_handler/userinfo')

//导入校验规则的中间件
let expressJoi = require('@escook/express-joi');
//导入校验规则对象
let { update_userinfo_schema,update_password_schema,update_avatar_schema } = require("../schema/user")

//获取用户信息
router.get("/userinfo",userinfoHandler.getUserInfo)
//修改用户的基本信息
router.post("/userinfo",expressJoi(update_userinfo_schema),userinfoHandler.updateUserInfo)
//修改密码
router.post("/updatepwd",expressJoi(update_password_schema),userinfoHandler.updatePassword)
//修改用户头像
router.post("/updateAvatar",expressJoi(update_avatar_schema),userinfoHandler.updateAvatar)

module.exports = router