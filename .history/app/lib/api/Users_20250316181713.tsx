class Users{
    private apiUrl: string;
  
    constructor() {
      this.apiUrl = process.env.NEXT_PUBLIC_USERS_API || "";
      if (!this.apiUrl) {
        throw new Error("API URL is missing. Make sure to set NEXT_PUBLIC_NEWS_API in .env.local");
      }
    }
  
    async getUsers() {
      try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        const data = await response.json();
        return data || [];
      } catch (error) {
        console.error("Error fetching news:", error);
        return [];
      }
    }
  }
  
  const  UserAPI = new Users();