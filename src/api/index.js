// 配置API接口地址
var root = '';
var rootUrl="";
var hostName = location.hostname;
var tag = contain(hostName,'192.168')|| contain(hostName,'localhost')||contain(hostName,'127.0');
root = root + (tag ? 'http://192.168.100.27:8081':'http://'+location.host);
root = root + '/gateway/json';
rootUrl='http://192.168.100.102:8088'; //文件服务
// 引用axios
var axios = require('axios')
// 判断是否包含
function contain (str,constr) {
  return str.indexOf(constr)!==-1;
}
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure, headers) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url?url:"/gateway/json",
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false,
    headers: headers || {}
  })
    .then(function (res) {
      let data = res.data
      if (data.returnCode === "00000000") {
        if (success) {
          success(data.returnData)
        }
      } else {
        if (failure) {
          failure(res.data)
        } else {
          window.alert('error: ' + JSON.stringify(data.returnMessage))
        }
      }
    })
    .catch(function (err) {
      window.alert('api error,error code : ' + err)
    }
    )
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure, headers) {
    return apiAxios('GET', url, params, success, failure, headers)
  },
  post: function (url, params, success, failure, headers) {
    return apiAxios('POST', url, params, success, failure, headers)
  },
  put: function (url, params, success, failure, headers) {
    return apiAxios('PUT', url, params, success, failure, headers)
  },
  delete: function (url, params, success, failure, headers) {
    return apiAxios('DELETE', url, params, success, failure, headers)
  },
  getRootUrl:function (){
  	return rootUrl;
  },
  getInterRootUrl:function (){
  	return root;
  }
}
