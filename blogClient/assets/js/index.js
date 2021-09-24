$(function () {
    //调用函数去获取用户的基本信息
    getUserInfo()


    //退出登录
    let layer = layui.layer
    $("#btnLogout").click(function(){
        layer.confirm('确定要退出吗',{icon:3 , title:'提示'},function(index){
            //1.清空token
            localStorage.removeItem("token")
            //2.跳到登录页面
            location.href = "./login.html"
            layer.close(index)
        })
    })
})

    //获取用户的基本信息
    function getUserInfo() {
        // $.get("/auth/userinfo", function (res) {
        //     console.log(res);
        //     if (res.status !== 0) {
        //         return layui.layer.msg("获取用户信息失败")
        //     }
        //     //渲染头像
        //     renderAvatar(res.data)
        // })
        $.ajax({
            url:"/auth/userinfo",
            method:"GET",
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg("获取雁用户信息失败")
                }
                renderAvatar(res.data)
            }
        })
    }

    //渲染页面上的头像数据
    function renderAvatar(user) {
        // console.log(user);
        //获取用户的名称
        //如果有昵称 name就是昵称 如果没有name就是用户名
        let name = user.nickname || user.username;
        $("#welcome").html("欢迎"+name)
 
        if(user.user_intro !== null){
            //渲染图片头像
            $(".text-avatar").hide()
            $(".layui-nav-img").attr("src",user.user_intro).show()
        }else{  
            //渲染文本头像
            $(".layui-nav-img").hide()
            $(".text-avatar").html(name[0].toUpperCase()).show()
        }
    }
