$(function () {
    //调用getUserinfo函数获取用户基本信息
    getUserinfo()

    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //1.清空本地存储中的token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = '/login.html'
            //关闭confirm询问框
            layer.close(index)
        })
    })
})


//获取用户的基本信息的函数
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //请求成功之后，调用函数渲染用户头像
            renderAvatar(res.data)
        },
    })
}

//渲染用户头像的函数
function renderAvatar(user) {
    //1.获取用户名
    let name = user.nickname || user.username
    //2.设置欢迎的文本内容
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    //3.按需渲染用户的头像
    if (user.user_pic) {
        //3.1若有图片，则渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2若没有图片，则渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
