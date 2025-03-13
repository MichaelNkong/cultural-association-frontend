
import axios from "axios";
class Users {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:8080/api/auth/login";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");
        }
    }

    async loginUser(username: string, password: string) {
        const instance = axios.create({
            baseURL: 'http://localhost:8080/api/auth/login',
            timeout: 1000,
            headers: {     "Content-Type": "application/json"}
          });
        const response = await axios.post(this.apiUrl, {
            username,
            password,
        }, {
            headers: {
                "Content-Type": "application/json"
       
            }
     
        }
        );
        return response;
    }
}

export default new Users();