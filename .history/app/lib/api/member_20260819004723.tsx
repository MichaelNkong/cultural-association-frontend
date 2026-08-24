import axios from 'axios';

class Members {
    private apiUrl: string;
    private activationUrl: string;
  
    constructor() {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
        const membersPath = process.env.NEXT_PUBLIC_MEMBERS_API_PATH || "/api7users";
        this.apiUrl = `${baseUrl.replace(/\/$/, "")}/${membersPath.replace(/^\//, "")}`;
        this.activationUrl = `${baseUrl.replace(/\/$/, "")}/members/activate`;
    }

    async getMembers() {
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
            console.error("Error fetching members:", error);
            throw error;
        }
    }
    async updateMemberStatus(user_id: number, active: boolean) {
        const token = localStorage.getItem('token'); 
        
        if (!token) {
            console.error("Token is missing");
            return;  // Don't proceed without the token
        }

        try {
            const response = await axios.post(this.activationUrl,
                { user_id, activation_id: active ? "1" : "0" },
                {
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`  // Ensure Authorization is inside headers
                    }
                }
            );
            return response;
        } catch (error) {
            console.error("Error updating member status:", error);
            throw error;
        }
    }
}

const  MembersAPI =  new Members();
export default MembersAPI;