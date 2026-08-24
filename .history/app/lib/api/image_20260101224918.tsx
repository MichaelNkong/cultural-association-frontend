import axios from 'axios';
import { optimizeImage } from 'next/dist/server/image-optimizer';

class Image {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/images/optimize';
        if (!this.apiUrl) {
            throw new Error("API URL is missing.");
        }
    

          async optimizeImage(url: string, width: string,  height: string) {
       
        const response = await api.post(this.apiUrl,
            JSON.stringify({ url, width, height }),
         
            {url: this.apiUrl},
         
        );
        return response;

    }
        
    
}

const Image = new Image();
export default ImageAPI;