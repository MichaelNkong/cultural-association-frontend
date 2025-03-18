import axios from 'axios';

class Events {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = {$process.n}/api/events';
        if (!this.apiUrl) {
            throw new Error("API URL is missing.");
        }
    }

    async getEvents() {
        const token = localStorage.getItem('token'); 
        
        if (!token) {
            console.error("Token is missing");
            return;  // Don't proceed without the token
        }

        // Log token to ensure it's correct
        console.log("Using token:", token);  

        try {
            const response = await axios.get(this.apiUrl, {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Ensure Authorization is inside headers
                }
            });
            console.log("Response:", response.data);
            return response;
        } catch (error) {
            console.error("Error fetching members:", error);
            return null;
        }
    }
}

const EventsAPI = new Events();
export default EventsAPI;