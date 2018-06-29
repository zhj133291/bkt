// var key104 = require()
export default {
  goodTime (str) {
    let now = new Date().getTime()
    let oldTime = new Date(str).getTime()
    let difference = now - oldTime
    let result = ''
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let year = month * 12
    let _year = difference / year
    let _month = difference / month
    let _week = difference / (7 * day)
    let _day = difference / day
    let _hour = difference / hour
    let _min = difference / minute

    if (_year >= 1) {
      result = '发表于 ' + ~~(_year) + ' 年前'
    } else if (_month >= 1) {
      result = '发表于 ' + ~~(_month) + ' 个月前'
    } else if (_week >= 1) {
      result = '发表于 ' + ~~(_week) + ' 周前'
    } else if (_day >= 1) {
      result = '发表于 ' + ~~(_day) + ' 天前'
    } else if (_hour >= 1) {
      result = '发表于 ' + ~~(_hour) + ' 个小时前'
    } else if (_min >= 1) {
      result = '发表于 ' + ~~(_min) + ' 分钟前'
    } else {
      result = '刚刚'
    }
    return result
  },
  vili:{
    loginName (str) {
      let myReg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      return myReg.test(str);
    },
    password (str) {
      let myReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      return myReg.test(str);
    }
  },
  goTop () {
    document.documentElement.scrollTop?document.documentElement.scrollTop = 0:'';
    document.body.scrollTop?document.body.scrollTop=0:'';
  },
  ajaxCode:{
    nameErr:"10000001",
    getValidateCodeErr:"1000002",
    phoneErrCode:"10000003",
    validateCodeErr:"10000004",
    nameOrPwdErr:"10000006",
    userStatusErr:"10000007",
    resetCode:"10000008",
    viliCode:"10000009",
    exist:"10000010",
  },

  //写cookies
  setCookie(c_name, value, expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + (expiredays * 24 * 60 * 60 * 1000));
    document.cookie=c_name+ "=" + value + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
  },

  //读取cookies
  getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  },

  //删除cookies
  delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  },

  //去重
  deleteRepetionChar(arr){
    var arrTable = {},arrData = [];
    for (var i = 0; i < arr.length; i++) {
      if( !arrTable[ arr[i] ]){
        arrTable[ arr[i] ] = true;
        arrData.push(arr[i])
      }
    }
    return arrData;
  },

  //图片URL
  imgURL: {
    img: 'http://rongtb.chenkuo.com.cn:4422/'
  },
  getLen (str) {
    let realLength = 0, len = str.length, charCode = -1;
    for (let i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128)
        realLength += 1;
      else
       realLength += 2;
    }
    return realLength;
  },
  goLogin (code) {
    let str = '00000007_'+'00000008_'+'00000009_'+'00000010_'+'00000011_'+'00000012_'+'00000013_'+'00000014_'+'00000015_'+'00000016_'+'10000005_'+'10000011_';
    if(str.indexOf(code)!=-1){
      return true;
    }
  }
}
