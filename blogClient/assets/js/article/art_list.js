$(function () {
    //初始化文章列表
    initArticle()
    initCates() //渲染分类数据

    template.defaults.imports.dataFormat = function (data) {
        let dt = new Date(date)
        var y = dt.getFullYear()
        var m = dt.getMonth()
        var d = dt.getDate()
        var hh = Zero(dt.getHours())
        var mm = Zero(dt.getMinutes())
        var ss = Zero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss
    }

    //补0的函数
    function Zero(n) {
        return n > 9 ? n : "0" + n

    }

    function initArticle() {
        $.ajax({
            url: "/cauth/aticle/list",
            method: "get",
            success: function (res) {
                // console.log(res.data);
                if (res.status !== 0) return layui.layer.msg("获取文章列表失败")
                // layui.layer.msg("获取文章列表成功")
                var htmlStr = template("tpl-table", { data: res.data })
                $("tbody").html(htmlStr)
                // renderPage(res.all)
            }
        })
    }

    //渲染分类数据
    function initCates() {
        $.ajax({
            url: "/cauth/aticle/list",
            method: "get",
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg("获取文章列表失败")
                let htmlStr = template("tpl-cate", { data: res.data })
                $("[name = cate_id]").html(htmlStr)
                layui.form.render()
            }
        })
    }

    //渲染分页
    // let laypage = layui.laypage
    // function renderPage(total){
    //     laypage.render({
    //         elem:"pageBox",

    //     })
    // }

    //实现删除文章
    $("tbody").on("click", ".btn-delete", function (e) {
        let id = $(this).attr("data-id")
        // console.log(id);
        layui.layer.confirm("确认要删除吗", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                url: "/cauth/aticle/delete",
                method: "get",
                data: {id},
                success: function (res) {
                    if (res.status !== 0) return layui.layer.msg("删除分类失败")
                    layui.layer.close(index)
                    initArticle()
                    layui.layer.msg("删除分类成功")
                }
            })
        })
    })
})