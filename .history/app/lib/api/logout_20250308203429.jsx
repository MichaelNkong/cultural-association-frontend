
import axios from "axios";
import api from "@/app/utils/api"
class Logout {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "/auth/logout";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");   }
    }

    async logournUser(username: any, password: any) {
       
        const response = await api.post(this.apiUrl,
            JSON.stringify({ username, password }),
         
            {url: this.apiUrl},
         
        );
        return response;

    }
}
export default new Logout();