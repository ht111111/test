// const { query } = require("express")
const db = require("../dao/index")
//获取分类数据
exports.getCats = (req,res)=>{
    //从数据库中得到数据，扔给客户端
    let sql = "select * from cats where is_delete=0 order by id asc"
    db.query(sql,(err,result)=>{
        if(err) return res.ss(err)
        //成功 得到分类数据
        res.send({
            status:0,
            message:"获取分类数据成功",
            data:result
        })
    })
}

//新增分类
exports.addCats = (req,res)=>{
    let sql = "select * from cats where is_delete=0 and (name=? or alias=?)"
    db.query(sql,[req.body.name,req.body.alias],(err,result)=>{
        if(err) return res.ss(err)
        if(result.length == 2) return res.ss("分类名称和别名都被占用了，请重新填写")
        if(result.length == 1 && result[0].name == req.body.name && result[0].alias == req.body.alias ) return res.ss("分类名称和别名都被占用了，请重新填写")
        if(result.length == 1 && result[0].name == req.body.name) return res.ss("分类名称被占用了，请重新填写")
        if(result.length == 1 && result[0].alias == req.body.alias) return res.ss("别名被占用了，请重新填写")
    
        //完成添加分类的功能
        let sqlStr = "insert into cats set ?"
        db.query(sqlStr,req.body,(err,result)=>{
            if(err) return res.ss(err)
            if(result.affectedRows !== 1) return res.ss("添加分类失败")

            // 添加分类成功
            res.ss("添加分类成功",0)
        })
    })
}

//根据ID删除分类
exports.deleteCatById = (req,res)=>{
    //ID校验通过后，代码就到这里了
    let sql = "update cats set is_delete=1 where id=?"
    db.query(sql,req.query.id,(err,result)=>{
        if(err) return res.ss(err)
        if(result.affectedRows !== 1) return res.ss("删除分类失败!")

        res.ss("删除分类成功",0)
    })
}

//根据ID获取分类
exports.getCatById = (req,res)=>{
    let sql = "select * from cats where id=?"
    db.query(sql,req.query.id,(err,result)=>{
        if(err) return res.ss(err)
        if(result.length !== 1) return res.ss("获取分类数据失败！")
        res.send({
            status : 0,
            message :"获取分类数据成功",
            data:result[0]
        })
    })

}   

//根据ID修改分类
exports.updateCatById = (req,res)=>{
    let sql = "select * from cats where id<>? and is_delete=0 and (name=? or alias=?)"
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,result)=>{
        if(err) return res.ss(err)
        if(result.length == 2) return res.ss("分类名称和别名都被占用了，请重新填写")
        if(result.length == 1 && result[0].name == req.body.name && result[0].alias == req.body.alias ) return res.ss("分类名称和别名都被占用了，请重新填写")
        if(result.length == 1 && result[0].name == req.body.name) return res.ss("分类名称被占用了，请重新填写")
        if(result.length == 1 && result[0].alias == req.body.alias) return res.ss("别名被占用了，请重新填写")
        
        //完成修改功能
        let sqlStr = "update cats set name=?,alias=? where id=?"
        db.query(sqlStr,[req.body.name,req.body.alias,req.body.id],(err,result)=>{
            if(err) return res.ss(err)
            if(result.affectedRows !== 1) return res.ss("修改分类失败!")
            res.ss("修改分类成功",0)
        })
    })
}