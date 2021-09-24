let express = require('express');
//导入constroller的处理函数
let catsHandler = require("../constroller_handler/cats")
let router = express.Router()

//导入数据校验的中间件
let expressJoi = require('@escook/express-joi');
let {add_cats_schema,delete_cats_schema,get_cats_schema,update_cats_schema} = require("../schema/cats")


//获取分类数据
router.get("/cates",catsHandler.getCats)

//新增分类数据
router.post("/addcates",expressJoi(add_cats_schema),catsHandler.addCats)

//根据ID实现删除分类
router.get("/deletecate",expressJoi(delete_cats_schema),catsHandler.deleteCatById)

//根据ID获取分类
router.get("/cateById",expressJoi(get_cats_schema),catsHandler.getCatById)

//根据ID修改分类
router.post("/updateCat",expressJoi(update_cats_schema),catsHandler.updateCatById)

module.exports = router