import axios from 'axios';

class Events {
    private apiUrl: string;
  
    constructor() {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
        this.apiUrl = `${baseUrl}/api/events`;
    }

    async getEvents() {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error("Token is missing");
            return;  // Don't proceed without the token
        }

        try {
            const response = await axios.get(this.apiUrl, {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Ensure Authorization is inside headers
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async registerForEvent(eventId: number) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("Please log in before registering for an event.");
        }

        return axios.post(`${this.apiUrl}/${eventId}/register`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    }
}

const EventsAPI = new Events();
export default EventsAPI;