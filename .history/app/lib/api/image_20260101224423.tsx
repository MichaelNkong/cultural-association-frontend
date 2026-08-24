import axios from 'axios';

class Image {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/images/optimize';
        if (!this.apiUrl) {
            throw new Error("API URL is missing.");
        }
    }

          async optimizeImage(url: string, password: string) {
       
        const response = await api.post(this.apiUrl,
            JSON.stringify({ username, password }),
         
            {url: this.apiUrl},
         
        );
        return response;

    }
        
    }


const ImageAPI = new Image();
export default ImageAPI;