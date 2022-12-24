//每次调用$.get()或$.post()或$.ajax()的时候
//会先调用$.ajaxPrefilter这个函数
//该函数可以拿到ajax的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})