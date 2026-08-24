
import api from "@/app/utils/api"
class Login {
    async loginUser(username: string, password: string) {
        return api.post("/api/auth/login", { username, password });
    }
}
const  LoginAPI = new Login();
export default LoginAPI;