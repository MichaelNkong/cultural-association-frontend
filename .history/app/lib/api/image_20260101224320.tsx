import axios from 'axios';

class Image {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/images/optimize';
        if (!this.apiUrl) {
            throw new Error("API URL is missing.");
        }
    }

    async getOptimizeImage() {
        
    }
}

const ImageAPI = new Image();
export default ImageAPI;