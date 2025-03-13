
import axios from "axios";
class Users {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:8080/api/auth/login";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");
        }
    }

    async loginUser(username: any, password: any) {
        const instance = axios.create({
            baseURL: this.apiUrl,
            timeout: 1000,
            headers: { "Content-Type": "application/json" }
        },[
      
    
    );
        const response = await instance.post(this.apiUrl,
            {
                 timeout: 5000 
            },
            
           


        );
        return response;

    }
}
export default new Users();