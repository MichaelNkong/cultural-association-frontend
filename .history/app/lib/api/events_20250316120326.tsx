import axios from "axios";

class Events {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:8080/api/events";
    }

    async getEvents() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token is missing");
            return null; // Return null explicitly to indicate failure
        }

        console.log("Using token:", token);

        try {
            const response = await axios.get(this.apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response:", response.data);
            return response.data; // Return only the data, not the full response object
        } catch (error) {
            console.error(
                "Error fetching events:",
                error instanceof Error ? error.message : error
            );
            return null;
        }
    }
}

const eventsAPI = new Events();
export default eventsAPI;