
import axios, { Axios } from "axios";
class Users{
    private apiUrl: string;
  
    constructor() {
      this.apiUrl = process.env.POST_USER_API || "";
      if (!this.apiUrl) {
        throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");
      }
    }
  
    async loginUser(usernmae: string, password: string) {
        const response = await Axios.post()", {
            headers: { "Content-Type": "application/json"},
   
        });
      
        return response;
    }
  }
  
  export default new Users();