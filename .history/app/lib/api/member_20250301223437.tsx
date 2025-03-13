import axios from "axios";

class Members {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:8080/api/users";
        if (!this.apiUrl) {
            throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");
        }
    }

    async getMembers() {
        let token = localStorage.getItem('token'); 

        if (!token) {
            throw new Error("Token is missing");
        }

        // Create an axios instance with the Authorization header
        const instance = axios.create({
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // Correctly setting the Authorization header
            }
        });

        try {
            // Make the GET request
            const response = await instance.get(this.apiUrl);
            return response.data;  // Return the response data
        } catch (error) {
            console.error("Error fetching members:", error);
            throw error;  // Rethrow the error if necessary
        }
    }
}

export default new Members();