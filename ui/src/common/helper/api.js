import axios from 'axios';

async function API(entity) {

    return axios({
        baseURL: entity.callURL,
        method: entity.callMethod,
        data: entity.bodyData,
        params: { ...entity.urlParams },
        // headers: { ...entity.headers }
    }).then((res) => {
        let data = { ...res, status: true }

        return entity.callBack(data);
    }).catch((err) => {
        let data = { status: false, message: err.response.data }

        return entity.callBack(data);
    })
}

export default API;