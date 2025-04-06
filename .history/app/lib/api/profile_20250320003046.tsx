import axios from "axios";

class Profile {
    private apiUrl: string;

    constructor() {
        this.apiUrl =     this.apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/auth/logout';
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_LOGOUT_API in .env.local");
        }
    }

    async logoutUser() {
        const token = localStorage.getItem('token'); 

        if (!token) {
            throw new Error("No token found. User might not be logged in.");
        }

        try {
            const response = await axios.post(
                this.apiUrl,
                {}, // No body needed for logout
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    withCredentials: true // Allows cookies to be sent
                }
            );
            return response;
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }
}

const ProfileAPI = new Profile();
export default ProfileAPI;