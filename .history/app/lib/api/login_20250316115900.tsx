

import api from "@/app/utils/api"
class Login {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "/auth/login";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");   }
    }

    async loginUser(username: string, password: string) {
       
        const response = await api.post(this.apiUrl,
            JSON.stringify({ username, password }),
         
            {url: this.apiUrl},
         
        );
        return response;

    }
}
const eventsAPI = new <Lo></Lo>();
export default eventsAPI;
export default new Login();