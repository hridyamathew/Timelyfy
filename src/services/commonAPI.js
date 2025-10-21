import axios from 'axios'

const commonApi = async (method, url, data) =>{

    const reqConfig = {
        method,
        url,
        data
    }

    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })

}

export default commonApi