
import axios from "axios";

class Register {
    private apiUrl: string;

    constructor() {
        this.apiUrl =     this.apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/auth/register';
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");   }
    }

    async registerUser(username: string,email: string, password: string) {
        const instance = axios.create({
  
            headers: { "Content-Type": "application/json" },
            method :'Post'
        }

        );
        const response = await instance.post(this.apiUrl,
            JSON.stringify({ username,email, password }),
         
            {url: this.apiUrl},
         
        );
        return response;

    }
}
const RegisterAPI = new Register();
export default RegisterAPI;