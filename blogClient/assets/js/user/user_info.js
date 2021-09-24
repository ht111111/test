$(function () {
    initUserInfo()

    //数据的回显
    let layer = layui.layer
    let form = layui.form
    //实现数据的回显
    function initUserInfo() {
        $.ajax({
            url: "/auth/userinfo",
            method: "GET",
            success: function (res) {
                if (res.status !== 0) return layer.msg("获取用户信息失败")
                // console.log(res);
                form.val("formUserInfo", res.data)
            }
        })
    }

    //实现重置事件
    $("#btnReset").click(function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //提交修改
    $(".layui-form").submit(function (e) {
        e.preventDefault();
        let nickname = $("input[name='nickname']").val()
        let email = $("input[name='email']").val()
        $.ajax({
            url: "/auth/userinfo",
            method: "POST",
            //快速获取表单的数据
            data: {
                nickname,
                email
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg("更新用户信息失败")
                layer.msg("更新用户成功")

                window.parent.getUserInfo()
            }
        })
    })
})