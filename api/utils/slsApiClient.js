import superagent from 'superagent';

export default function slsApiClient(method, path, body, params) {
    return new Promise((resolve, reject) => {
        params = params || {};
        const url = `${process.env.SERVERLESS_API_URL}${path}`;
        console.log(`[slsApiClient] Sending ${method.toUpperCase()} request to ${url}`);
        const request = superagent(method, url);

        // add authorization header
        if (params.jwt && params.jwt.token) {
            request.set('Authorization', `Bearer ${params.jwt.token}`);
        }

        request.set('Content-Type', 'application/json');
        if (body) {
            if (typeof body !== "string") {
                body = JSON.stringify(body);
            }
            request.send(body);
        }

        request.end((err, res) => {
            if (!err) {
                if (res.body && res.body.errorMessage) {
                    reject(res.body.errorMessage)
                }
                else {
                    resolve(res);
                }
            }
            else {
                // console.log(res);
                console.log(err);
                reject(res.body.errorMessage || res.body.message || res.body.Message || `API returned a ${res.status} status code`);
            }
        });
    });
}