
import axios from "axios";
import { body } from "framer-motion/client";
class Users {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:8080/api/auth/login";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");
        }
    }

    async loginUser(username: string, password: string) {
        const response = await axios.post(this.apiUrl, {
            username,
            password,
        }, {
            headers: {
                "Content-Type": "application/json"
       
            },
           
        },
       { body; }}

        );
        return response;
    }
}

export default new Users();