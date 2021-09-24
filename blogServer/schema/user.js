let joi = require("@hapi/joi")    //导入定义校验规则模块
// const { connect } = require("../constroller/userinfo")


//定义用户名和密码的校验规则
//  alphanum()  a-zA-Z0-9
//  required()  必填

let username = joi.string().alphanum().min(2).max(10).required()
let password = joi.string().alphanum().min(2).max(10).required()

//定义nickname 和email的验证规则
let nickname = joi.string().required()
let email = joi.string().email().required()

//验证头像的规则
//dataUri() 表示你的字符串必须满足如下格式
let avatar = joi.string().dataUri().required()


// reg_login_schema 注册和登陆表单校验规则对象
exports.reg_login_schema = {
    body:{
        username,
        password
    }
}

//update_userinfo_schema 邮箱验证规则
exports.update_userinfo_schema = {
    body:{
        nickname,
        email
    }
}

//校验修改密码的规则
exports.update_password_schema = {
    body:{
        //老密码呵新密码不能一样
        oldPwd:password,
        //新的密码值和老的密码值不一样
        newPwd:joi.not(joi.ref("oldPwd")).concat(password)
    }
}

exports.update_avatar_schema = {
    body:{
        avatar
    }
}