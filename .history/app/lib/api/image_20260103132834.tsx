import axios from 'axios';
import api from "@/app/utils/api"
class Image {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/images/optimize';
        if (!this.apiUrl) {
            throw new Error("API URL is missing.");
        }
    
    }
async optimizeImage(imageUrl: string, width: number, height: number) {
  const token = localStorage.getItem('token');

  const response = await api.post(
    this.apiUrl,
    JSON.stringify({ imageUrl, width, height }),
    {
      headers: {
    
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  return response;
}

    
}

const image = new Image();
export default image;