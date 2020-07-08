let header = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cache-Control": "no-cache",
    // "accesstoken": token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
};
let header2={
    method: 'GET',
    // mode:'cors',
    header:{
        "Content-Type":"application/x-www-form-urlencoded",
        "Cache-Control": "no-store",
        'Accept':'application/json,text/plain,*/*',
        'Access-Control-Allow-Origin':'*'
    }

}
let common_url = 'https://xlite.kedacom.com/xlite/api';
// let url1 ='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb3315d583894a360&secret=4d935dab3babaa75a301e42beb1d6f10';
// let common_url = '/api';

const http = {
    
    get(url, params) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        return new Promise(function (resolve, reject) {
            fetch(common_url+url,{
                method: 'GET',
                 mode:'cors',
            }).then(response => 
                response.json()
                // response.text()
            ).then((responseData) => {
                    console.log(responseData)
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log("err:", err)
                    reject(err);
                });
        });
    },
    post(url, params) {
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: header,
                mode:'cors',
                body: JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
            }).then((response) => {
                if(response.status!=200){
                    reject('请求失败！');
                }
                return response.json()
            })
                .then((responseData) => {
                    console.log('res:', url, responseData);   //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log('err:', url, err);   //网络请求失败返回的数据  
                    reject(err);
                });
        });
    },
    json2Form(json) {
        let str = [];
        for (let p in json) {
            let value = encodeURIComponent(json[p]);
            if (value == 'null' || value == 'undefined') {
                value = '';
            }
            str.push(encodeURIComponent(p) + "=" + value);
        }
        return str.join("&");
    },

    json2Options(json) {
        let str = [];
        let pre = false;
        for (let p in json) {
            let value = json[p];
            if (value == null) {
                value = '';
            }
            str.push(p + '=' + value);
        }
        if (str.length > 0) {
            pre = true
        }
        return (pre ? '?' : '') + str.join("&");
    }

}
export default http;