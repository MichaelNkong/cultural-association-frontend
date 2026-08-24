import axios from 'axios';

class Members {
    private baseUrl: string;
    private apiUrl: string;
    private activationPath: string;
  
    constructor() {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
        this.baseUrl = baseUrl.replace(/\/$/, "");
        const membersPath = process.env.NEXT_PUBLIC_MEMBERS_API_PATH || "/api/users";
        this.apiUrl = `${this.baseUrl}/${membersPath.replace(/^\//, "")}`;
        this.activationPath = process.env.NEXT_PUBLIC_MEMBER_ACTIVATION_API_PATH || "/api/users/{id}/activation";
    }

    async getMembers() {
        const token = localStorage.getItem('token'); 

        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await axios.get(this.apiUrl, {
                headers
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
            const activationUrl = `${this.baseUrl}/${this.activationPath.replace(/^\//, "").replace("{id}", String(user_id))}`;
            const response = await axios.put(activationUrl,
                { active },
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

    async makeAdmin(userId: number) {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token is missing");

        return axios.put(`${this.baseUrl}/api/users/${userId}/admin`, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
    }
}

const  MembersAPI =  new Members();
export default MembersAPI;