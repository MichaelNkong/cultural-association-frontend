
import axios from "axios";
import { register } from "module";
class Register {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:8080/api/auth/register";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");   }
    }

    async loginUser(username: any, password: any) {
        const instance = axios.create({
  
            headers: { "Content-Type": "application/json" }
        }

        );
        const response = await instance.post(this.apiUrl,
            JSON.stringify({ username, password }),
         
            {url: this.apiUrl},
         
        );
        return response;

    }
}
export default new Register();