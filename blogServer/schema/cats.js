//导入定义校验规则模块
let joi = require("@hapi/joi")

let name = joi.string().required()
let alias = joi.string().alphanum().required()  
let id = joi.number().integer().min(1).required()

exports.add_cats_schema = {
    body:{
        name,
        alias
    }
}

exports.delete_cats_schema = {
    query:{
        id
    }
}

exports.get_cats_schema = {
    query:{
        id
    }
}

exports.update_cats_schema = {
    body:{
        id,
        name,
        alias
    }
}   