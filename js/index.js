$(function () {
  // 1、表单失去焦点时验证值是否为空
  $('.formInner input').on('blur', function () {
    // 获取输入的值
    let val = $(this).val();
    // 值是否为空
    verify(val, $(this));
  })

  // 2、失去焦点验证手机号
  $('input[name=number]').on('blur', function () {
    // 获取输入的值
    let phonenumber = $(this).val();
    // 值是否为空
    if (!verify(phonenumber, $(this))) {
      return false;
    };
    // 值是否合法
    isPhoneNUmber(phonenumber, $('#isshow'), '请输入有效手机号', $('input[name=number]'))
  })

  // 3、点击获取验证码
  $('.authbtn').on('click', function () {
    let count = 30; // 倒计时初始值
    let that = $(this);
    let timer = setInterval(function () {
      // 禁用按钮
      that.prop('disabled', true);
      that.html(count + 's');
      count--;
      if (count < -1) {
        clearInterval(timer);
        that.prop('disabled', false);
        that.html('重新发送');
      }
    }, 1000);
    // 发送ajxa请求
    $.ajax({
      url: '2.json',
      type: 'get',
      success: function(msg) {
        // var json1 = JSON.parse(msg);
        console.log(msg)

        // if(msg.code === '1') {
        //   // 提示语
        //   $('#isshow').html(msg.msg);
        //   $('#isshow').addClass('active');
        // }
      }
    })
  })

  // 3、失去焦点验证“验证码”
  $('input[name=ma]').on('blur', function () {
    // 获取输入的值
    let manumber = $(this).val();
    // 获取手机号
    let pnumber = $('input[name=number]').val();
    // 验证码的值是否为空
    verify(manumber, $(this));
    // 手机号是否为空
    verify(pnumber, $('input[name=number]'));
    // 手机号是否合法
    isPhoneNUmber(pnumber, $('#isshow'), '请输入有效手机号', $('input[name=number]'))
  })

  // 4、点击提交表单时，验证表单是否合法,发送ajax请求
  $('.formbtn').on('click', function () {
    $('.formInner input').blur();
    // 根据类名判断值是否不合法
    let verifyError = $(".verify-error").length;
    if (verifyError > 0) {
      return
    }
    // 当值都合法时， 发送ajax请求
    $.ajax({
      url: '1.json',
      type: 'get',
      success: function (msg) {
        console.log(msg)
        if (msg.code === '1') {
          window.location.href = './detail.html'
        } else if (msg.code == '-1') {
          // 验证码错误
          $('#isshow').html(msg.msg);
          $('#isshow').addClass('active');
        }
      }
    })
  })

});

/*
* 验证表单值是否有效
* val---传入input的值
* ele---input的jq对象
*/
function verify(val, ele) {
  // 当值为空或者小于0时
  if (val == '' || val < 0) {
    ele.css({
      'border': '1px solid red'
    })
    ele.addClass('verify-error');
    return false;
  } else {
    ele.css({
      'border': 'none'
    })
    ele.removeClass('verify-error');
    return true;
  }
  // return false;
}

/*
* 验证手机号是否合法
* val---传入input的值
* ele1---提示信息的jq对象
* ele2---当前input的jq对象
* inner --- 要显示的值
*/
function isPhoneNUmber(val, ele1, inner, ele2) {
  if (!isPoneAvailable(val)) {
    ele1.html(inner);
    ele1.addClass('active');
    ele2.addClass('verify-error');
    ele2.css({
      'border': '1px solid red'
    })
    return false;
  } else {
    ele1.html('');
    ele1.removeClass('active');
    ele2.removeClass('verify-error');
    ele2.css({
      'border': 'none'
    })
  }
}
// 手机号验证正则
function isPoneAvailable(str) {
  let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}
