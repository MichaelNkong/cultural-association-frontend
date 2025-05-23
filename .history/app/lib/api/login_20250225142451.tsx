
import axios from "axios";
class Users {
    private apiUrl: string;

    constructor() {
        this.apiUrl = process.env.NEXTPU || "";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");
        }
    }

    async loginUser(username: string, password: string) {
        const response = await axios.post(this.apiUrl, {
            username,
            password,
        }, {
            headers: {
                "Content-Type": "application/json"
       
            },
        }
        );
        return response;
    }
}

export default new Users();