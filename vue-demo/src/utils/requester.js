import axios from 'axios';

export default (url='',data={},type='GET',headers={})=>{
    return new Promise((resolve,reject)=>{
        const instance=axios.create({
            baseURL:'http://localhost:8081',
            timeout:20000
        });
        instance({
            url:url,
            method:type,
            params:data,
            headers:headers
        }).then(response=>{
            const res = response.data;
            //10000成功
            if (res.retCode == "10000" ) {
                alert(res.message);
                resolve(res);                
            }
            alert(res.retCode+res.message);
            reject(res);
        }).catch(error=>{
            alert(error);
            reject(error);
        });
    });
}