import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

class BackendApi {

    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;

        const params = (method === "get")
            ? data
            : {};

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const result = await axios(url, { method: method, data: data, params: params, headers: headers });
            return result;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }

    }


    // Individual API routes

    /** Get token for login from username, password. */

    static async login(data) {
        console.log("sending log in request")
        let res = await this.request(`auth/token`, data, "post");
        return res.data;
    }

    static async register(data) {
        console.log("sending new user registration request")
        let res = await this.request(`auth/register`, data, "post");
        return res.data;
    }

}


export default BackendApi;