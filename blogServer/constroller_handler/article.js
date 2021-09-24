let db = require("../dao/index")
let path = require("path")
// const expressJoi = require("@escook/express-joi")

//新增文章
exports.addAricle = (req, res) => {
    //如果数据校验OK，代码就走到此处
    if (!req.file || req.file.fieldname !== "cover_img") return res.ss("文章的封面是必传项")
    // 准备需要入库的数据
    const articleInfo = {
        ...req.body,
        cover_img: path.join("/uploads", req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    //准备sql语句
    let sql = "insert into article set ?"
    db.query(sql, articleInfo, (err, result) => {
        if (err) return res.ss(err)
        if (result.affectedRows !== 1) return res.ss("发布文章失败")
        res.ss("发布文章成功", 0)
    })
}
 
//显示文章
exports.listAricle = (req, res) => {
    let sql = "select * from article where is_delete=0 order by id asc"
    db.query(sql, (err, result) => {
        if (err) return res.ss(err)
        res.send({
            status: 0,
            message: "显示文章数据成功",
            data: result
        })
    })
}

//根据id删除文章
exports.deleteAricle = (req, res) => {
    let sql = "update article set is_delete = 1 where id = ?"
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.ss(err)
        if (result.affectedRows !== 1) return res.ss("删除文章失败")

        res.ss("删除文章成功", 0)
    })
}

//根据id获取文章
exports.articleById = (req, res) => {
    let sql = "select * from article where id=?"
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.ss(err)
        if (result.length !== 1) return res.ss("获取文章数据失败！")
        res.send({
            status: 0,
            message: "获取文章数据成功",
            data: result[0].content
        })
    })
}

//根据id修改文章
exports.updateAricle = (req, res) => {
    // console.log(req.body.id)
    if (!req.file || req.file.fieldname !== "cover_img") return res.ss("文章的封面是必传项")
    const articleupdate = {
        ...req.body,
        cover_img: path.join("/uploads", req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    const data=[req.body.title,req.body.content,req.body.state,req.body.cate_id,req.body.id];
    // console.log(articleupdate)
    let sqlStr = "update article set  title= ? , content= ? ,state= ? ,cate_id= ?  where id= ? "
    db.query(sqlStr, data, (err, result) => {
        if (err) return res.ss(err)
        if (result.affectedRows !== 1) return res.ss("修改文章失败!")
        res.ss("修改文章成功", 0)
    })
}