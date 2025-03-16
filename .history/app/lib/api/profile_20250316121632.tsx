
import axios from "axios";
class Profile {
   private apiUrl;

    constructor() {
        this.apiUrl = "http://localhost:8080/api/auth/logout";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");   }
    }

    async logoutUser() {
        const token = localStorage.getItem('token'); 
        const instance = axios.create({
  
            headers: { "Content-Type": "application/json",
                credentials: "include",// Allows cookies to be sent
                "Authorization": `Bearer ${token}` 
             },
     
            method :'Post',
            
        }

        );
        const response = await instance.post(this.apiUrl,
         
            {url: this.apiUrl},
            
         
        );
        return response;

    }
}
const profileAPI = new Profile();
export default profileAPI;
