$(function(){
    initCateList()  //获取分类数据

    function initCateList(){
        $.ajax({
            url:"/cauth/cates",
            method:"get",
            success:function(res){
                // console.log(res);
                if(res.status !== 0) return layui.layer.msg("获取分类失败")
                var htmlStr = template("tpl-table",{data:res.data})
                $("tbody").html(htmlStr)
            }
        })
    }

    //点击添加分类按钮，弹出弹出层
    let addIndex = null
    $("#btnAddCate").click(function(){
         addIndex = layui.layer.open({
            type:1,
            title:'添加分类',
            area:['500px','250px'],
            content:$("#dialog-add").html()
        })
    })

    $("body").on("submit","#form-add",function(e){
        e.preventDefault()
        $.ajax({
            url:"/cauth/addCates",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0)  return layui.layer.msg(res.message)
                initCateList()
                layui.layer.msg("新增分类成功")
                layui.layer.close(addIndex)
            }
        })
    })

    //通过事件委托找到对应的编辑按钮
    let edit = null
    $("body").on("click",".btn-edit",function(e){
        //不需要阻止默认事件
         edit = layui.layer.open({
            type:1,
            area:['500px','250px'],
            title:'编辑分类',
            content:$("#dialog-edit").html()
        })

        let id = $(this).attr("data-id")
        // console.log(id);
        $.ajax({
            url:"/cauth/CateById",
            method:"get",
            data:{id:id},
            success:function(res){
                if(res.status !== 0) return layui.layer.msg("获取分类失败")
                // console.log(res.data);
                layui.form.val("form-edit",res.data)
            }
        })
    })

    //实现编辑
    $("body").on("submit","#form-edit",function(e){
        e.preventDefault()
        $.ajax({
            url:"/cauth/updateCat",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0)  return layui.layer.msg(res.message)
                initCateList()
                layui.layer.msg("修改分类成功")
                layui.layer.close(edit)
            }
        })
    })

    //删除分类
    $("body").on("click",".btn-delete",function(e){
        let id = $(this).attr("data-id")  //得到要删除分类的ID
        layui.layer.confirm("确定要删除吗",{icon:3,title:"提示"},function(index){
            $.ajax({
                url:"/cauth/deletecate",
                method:"get",
                data:{id:id},
                success:function(res){
                    if(res.status !== 0) return layui.layer.msg("删除分类失败")
                    layui.layer.msg("删除分类成功")
                    layui.layer.close(index)
                    initCateList()
                } 
            })
        })
    })
})