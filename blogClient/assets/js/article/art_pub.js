$(function(){
    //初始化富文本编辑器
    initEditor()

    let $image = $("#image")
    //定义配置项
    let options = {
        //宽高比
        aspectRatio: 1,
        //preview指定预览区
        preview: ".img-preview"
    }
    $image.cropper(options)
})