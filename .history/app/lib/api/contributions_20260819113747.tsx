import axios from "axios";

export interface Contribution {
  id: number | string;
  memberId?: number | string;
  memberUsername?: string;
  period: string;
  amountDue: number;
  amountPaid: number;
  paidAt?: string | null;
  status?: string;
}

class ContributionsAPI {
  private baseUrl: string;
  private contributionsPath: string;
  private allContributionsPath: string;

  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.contributionsPath = process.env.NEXT_PUBLIC_CONTRIBUTIONS_API_PATH || "/api/contributions";
    this.allContributionsPath = process.env.NEXT_PUBLIC_ALL_CONTRIBUTIONS_API_PATH || "/api/contributions/all";
  }

  private headers() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async getMyContributions() {
    return axios.get(`${this.baseUrl}${this.contributionsPath}`, {
      headers: this.headers()
    });
  }

  async getAllContributions() {
    return axios.get(`${this.baseUrl}${this.allContributionsPath}`, {
      headers: this.headers()
    });
  }
}

export default new ContributionsAPI();
