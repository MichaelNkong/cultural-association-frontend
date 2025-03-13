
import axios from "axios";
class Members {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = "http://localhost:8080/api/users";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");   }
    }

    async geMembers() {
        let token = localStorage.getItem('token'); 
        const instance = axios.create({
  
            headers: { "Content-Type": "application/json" },
      
    
        }

        );
        const response = await instance.get(this.apiUrl,

        {} "Authorization": `Bearer ${token}`,
            {url: this.apiUrl},

        );
        return response;

    }
}
export default new Members();