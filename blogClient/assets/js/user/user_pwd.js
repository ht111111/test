$(function () {
    let form = layui.form
    //定义表单的校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            //新密码框中输入的数据
            if (value === $('[name=oldPwd]').val()) {
                return "新密码和旧密码不能相同"
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次新密码输入的不一致"
            }
        }
    })

    //发起ajax请求, 重置密码  提交事件的事件源是form表单
    $(".layui-form").submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: "/auth/updatepwd",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("更新密码失败")
                }
                layui.layer.msg("更新密码成功!")
                $(".layui-form")[0].reset()  //重置表单
            }
        })
    })

    // $(".layui-form").submit(function (e) {
    //     let newPwd = $("input[name='newPwd']").val()
    //     let oldPwd = $("input[name='oldPwd']").val()

    //     e.preventDefault()
    //     $.ajax({
    //         url: "/auth/updatepwd",
    //         method: "POST",
    //         data: { newPwd, oldPwd },
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layui.layer.msg("更新密码失败")
    //             }
    //             layui.layer.msg("更新密码成功!")
    //             $(".layui-form")[0].reset()  //重置表单
    //         }
    //     })
    // })
})