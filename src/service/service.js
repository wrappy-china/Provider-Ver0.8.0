import {
    BASE_URL
} from "../constans/network";

/**
 * 默认post请求
 * @param {m} url 
 * @param {*} json 
 */
export function service(url, json) {
    return fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: json,
        })
        .then(response => {
            console.log("fetch : " + url, JSON.stringify(response));
            return response.json();
        });
}

