
import axios from "axios";
class Users{
    private apiUrl: string;
  
    constructor() {
      this.apiUrl = process.env.POST_USER_API || "";
      if (!this.apiUrl) {
        throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");
      }
    }
  
    async loginUser(usernmae: string, password: string) {
        const response = await axios("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(loginData),
        });
      
        const response = await fetch(this.apiUrl);
        
    }
  }
  
  export default new Users();