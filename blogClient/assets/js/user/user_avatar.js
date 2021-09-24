$(function () {
    let $image = $("#image")
    //定义配置项
    let options = {
        //宽高比
        aspectRatio: 1,
        //preview指定预览区
        preview: ".img-preview"
    }
    $image.cropper(options)


    //给按钮绑定一个点击事件
    $("#btnChooseImage").click(function () {
        $("#file").click();
    })

    //change 如果是input type=file
    //每当选中一个图片，就会触发change事件
    $("#file").change(function (e) {
        let filelist = e.target.files
        if (filelist.length == 0) {
            return layui.layer.msg("请选择一张图片")
        }
        //选中图片
        let file = e.target.files[0]
        let imgUrl = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr("src", imgUrl)
            .cropper(options)
    })

    //将图片转成base64,上传至服务器
    $("#btnUpload").click(function(){
        //得到剪裁的区域，并把他们转换成base64字符串  
        let dataURL = $image.cropper("getCroppedCanvas",{
            //指定canvas的大小
            width:100,
            height:100
        }).toDataURL("image/png")   //把上面的canvas画布转成base64

        //dataURL代表用户剪裁的图片的base64
        $.ajax({
            url:"/auth/updateAvatar",
            method:"post",
            data:{avatar:dataURL},
            success:function(res){
                // console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg("更换头像失败！")
                }
                layui.layer.msg("更换头像成功！")
                window.parent.getUserInfo()
            }
        })
    })
})