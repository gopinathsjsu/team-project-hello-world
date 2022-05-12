import axios from 'axios';

async function API(entity) {

    console.log("near axios")
    return axios({
        baseURL: entity.callURL,
        method: entity.callMethod,
        data: entity.bodyData,
        params: { ...entity.urlParams },
        // headers: { ...entity.headers }
    }).then((res) => {
        console.log("ok")
        let data = { ...res, status: true }

        return entity.callBack(data);
    }).catch((err) => {
        console.log(err)
        let data = { status: false, message: err.response.data }

        return entity.callBack(data);
    })
}

export default API;