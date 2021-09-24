const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');
const joi = require('@hapi/joi')

var app = express()

//解决跨域问题
app.use(cors())

//配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
 
//托管静态资源
app.use(express.static(path.join(__dirname,"./uploads")))


app.use(function(req,res,next){
    res.ss = function(err,status=1){
      console.log(err);
      res.send({       
        status,
        message:err instanceof Error ? err.message:err
      })
      
    }
    next()
})

//在路由之前配置
const expressJWT = require('express-jwt');
let config = require("./config")
app.use(expressJWT({secret:config.jwtSecretKey}).unless({ path:[/^\/api/] }))

//引入二级路由
let userConstroller = require("./constroller/user")
app.use("/api",userConstroller)

//获取二级用户信息模块
let userInfoConstroller = require("./constroller/userinfo")
app.use("/auth",userInfoConstroller)

//引入分类管理模块
let catsConstroller = require("./constroller/cats")
app.use("/cauth",catsConstroller)

//引入文章管理模块
let articleConstroller = require("./constroller/article")
app.use("/cauth/aticle",articleConstroller) 

//处理错误中间件
app.use((err,req,res,next)=>{
  if(err.name === "UnauthorizedError"){
      return res.ss("身份验证失败")
  }

  if(err instanceof joi.ValidationError){
     return res.ss(err)
  }
  res.ss("未知错误")
  console.log(err);
})

app.listen(3000,()=>{
    console.log("3000 is runnning .......");
})