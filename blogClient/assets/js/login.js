$(function () {
    $("#link_reg").click(function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    $("#link_login").click(function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    //定义校验规则
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            if ($(".reg-box [name=password]").val() !== value) {
                return "两次密码不一致"
            }
        }
    })

    //实现注册
    var layer = layui.layer
    $("#form_reg").submit(function (e) {
        e.preventDefault();
        let data = {
            username: $(".reg-box [name=username]").val(),
            password: $(".reg-box [name=password]").val()
        }
        $.post("/api/register", data, function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            } 
            layer.msg(res.message)
            //模拟人为点击
            $("#link_login").click()
        })
    })

    //实现登录
    $("#form_login").submit(function (e) {
        e.preventDefault();
        // console.log($(this).serialize());
        // $.post("/api/login",$(this).serialize(),function(res){
        //     if(res.status !== 0) return layer.msg(res.message)
        //     layer.msg(res.message)
        //     //把token 存储到localstroage中
        //     localStorage.setItem("token",res.token)
        //     //跳到后台的首页面
        //     location.href = "./index.html"
        // })
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                //把token 存储到localstroage中
                localStorage.setItem("token", res.token)
                //跳到后台的首页面
                location.href = "./index.html"
            }
        })
    })

})