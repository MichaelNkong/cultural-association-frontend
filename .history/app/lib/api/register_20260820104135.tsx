
import axios from "axios";

class Register {
    private apiUrl: string;

    constructor() {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
        this.apiUrl = `${baseUrl.replace(/\/$/, "")}/api/auth/register`;
    }

    async registerUser(username: string, email: string, password: string) {
        return axios.post(this.apiUrl, { username, email, password }, {
            headers: { "Content-Type": "application/json" }
        });
    }
}
const RegisterAPI = new Register();
export default RegisterAPI;