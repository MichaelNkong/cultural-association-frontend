import axios from 'axios';

class Events {
    private apiUrl: string;
  
    constructor() {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
        this.apiUrl = `${baseUrl}/api/events`;
    }

    private headers() {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    async getEvents() {
        return axios.get(this.apiUrl, { headers: this.headers() });
    }

    async getEvent(eventId: number) {
        return axios.get(`${this.apiUrl}/${eventId}`, { headers: this.headers() });
    }

    async createEvent(event: Omit<EventPayload, 'id'>) {
        return axios.post(this.apiUrl, event, { headers: this.headers() });
    }

    async updateEvent(eventId: number, event: Omit<EventPayload, 'id'>) {
        return axios.put(`${this.apiUrl}/${eventId}`, event, { headers: this.headers() });
    }

    async deleteEvent(eventId: number) {
        return axios.delete(`${this.apiUrl}/${eventId}`, { headers: this.headers() });
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

    async getEventRegistrations(eventId: number) {
        return axios.get(`${this.apiUrl}/${eventId}/registrations`, { headers: this.headers() });
    }
}

export interface EventPayload {
    id?: number;
    name: string;
    date: string;
    location: string;
    description: string;
    estimatedPrice: number;
}

const EventsAPI = new Events();
export default EventsAPI;