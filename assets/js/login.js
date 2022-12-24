$(function () {
    //点击"去注册账号"的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击"去登录"的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    //自定义校验规则
    form.verify({
        //自定义了一个pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能出现空格'],
        //校验两次密码是否一致
        repwd: function (value) {
            //通过形参拿到的是确认密码
            //还需拿到第一次密码，进行比对，不一样就return一个提示消息
            let pwd = $('.reg-box [name="password"]').val()
            if (pwd != value) {
                return '两次密码不一致！'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //1.阻止表单的默认提交行为
        e.preventDefault()
        //2.发起Ajax的post请求
        let data = { username: $('#form_reg [name="username"]').val(), password: $('#form_reg [name="password"]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            //注册成功后模拟点击事件，切换到登录面板
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        //1.阻止默认提交行为
        e.preventDefault()
        //2.发起Ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //将登录成功得到的token字符串，存储到localStorage中
                localStorage.setItem('token', res.token)
                //登录成功之后跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})