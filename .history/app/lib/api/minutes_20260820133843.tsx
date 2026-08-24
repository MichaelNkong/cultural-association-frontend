import axios from "axios";

export type MeetingMinutes = {
  id: number;
  meetingDate: string;
  title: string;
  agenda: string;
  discussion: string;
  decisions: string;
  futurePlans: string;
  published: boolean;
  recordedBy: string;
};

export type MeetingMinutesInput = Omit<MeetingMinutes, "id" | "published" | "recordedBy">;

class MinutesAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

  private headers() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getMinutes() {
    return axios.get<MeetingMinutes[]>(`${this.baseUrl}/api/minutes`, { headers: this.headers() });
  }

  async createMinutes(minutes: MeetingMinutesInput) {
    return axios.post<MeetingMinutes>(`${this.baseUrl}/api/minutes`, minutes, { headers: this.headers() });
  }

  async publishMinutes(id: number) {
    return axios.post<MeetingMinutes>(`${this.baseUrl}/api/minutes/${id}/publish`, {}, { headers: this.headers() });
  }

  async downloadMinutes(id: number, date: string) {
    const response = await axios.get<Blob>(`${this.baseUrl}/api/minutes/${id}/download`, {
      headers: this.headers(),
      responseType: "blob"
    });
    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `meeting-minutes-${date}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

export default new MinutesAPI();