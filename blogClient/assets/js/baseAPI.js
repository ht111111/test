//自动拼接
$.ajaxPrefilter(function (options) {
    //发送ajax之前，先走请求拦截器
    //在请求拦截器中拼接服务器地址
    //options.url 代表你使用$.get() $.post() , $.ajax()时里面填写的url
    options.url = "http://127.0.0.1:3000" + options.url

    //放置token 
    if(options.url.indexOf("/auth/") !== -1) {
        options.headers = {
            Authorization:localStorage.getItem("token") || ""
        }
    }

    if(options.url.indexOf("/cauth/") !== -1) {
        options.headers = {
            Authorization:localStorage.getItem("token") || ""
        }
    }
    //complete回调函数 (ajax成功或失败都要调用)
    
    options.complete = function(res){
        if(res.responseJSON.status == 1 && res.responseJSON.message == "身份验证失败"){
            //1  强制清空token
            localStorage.removeItem("token")
            //2 重定向到登录页
            location.href = "./login.html"
        }
    }
})