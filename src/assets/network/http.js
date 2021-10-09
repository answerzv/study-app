import axios from 'axios'
import QS from 'qs';


axios.defaults.baseURL='';
axios.defaults.timeout = 10000;


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//get请求
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)
    })
  });
}
//post
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      }).catch(err =>{
        reject(err.data)
      })
  });
}
//put
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      }).catch(err =>{
        reject(err.data)
      })
  });
}


