import axios from 'axios'
const HOST='/api';
// axios.create({
//     baseURL: process.env.BASE_API, // api 的 base_url
//     timeout: 5000 // request timeout
//   })
//   axios.defaults.baseURL='/api'
  axios.defaults.timeout = 50000//默认请求超时时间
  axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求前拦截
// axios.interceptors.request.use(
//     config => {
//       return config;
//     },
//     err => {
//       console.log("请求超时");
//       return Promise.reject(err);
//     }
//   );
  // 返回后拦截
// axios.interceptors.response.use(
//     data => {
//       return data;
//     },
//     err => {
//       if (err.response.status === 504 || err.response.status === 404) {
//         console.log("服务器被吃了⊙﹏⊙∥");
//       } else if (err.response.status === 401) {
//         console.log("登录信息失效⊙﹏⊙∥");
//       } else if (err.response.status === 500) {
//         console.log("服务器开小差了⊙﹏⊙∥");
//       }
//       return Promise.reject(err);
//     }
//   );
  
// module.exports={
const api={
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(response => {
                if(response.status===200){
                    resolve(response)
                }else{
                    reject(response)
                }       
            }).catch(err => {
                reject(err)
            })
        })
    },
    
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then(response => {
                    resolve(response.data)
                }).catch(err=> {
                    reject(err)
                })
        })
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
export default api