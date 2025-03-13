
import axios from "axios";
class Members {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = "http://localhost:8080/api/users";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");   }
    }

    async geMembers() {
        const token= localStorage.getItem('token'); 
        const instance = axios.create({
  
            headers: { "Content-Type": "application/json" },
            Authorization:{`Bearer ${token}`  // Attach token to Authorization header
        }

        );
        const response = await instance.get(this.apiUrl,

         
            {url: this.apiUrl},

        );
        return response;

    }
}
export default new Members();