import { NextResponse } from 'next/server';
import Kraken from;

const kraken = new Kraken({
    api_key: 'bfbdc7bd7883f3fa69bfa20802c5dee6',
    api_secret: '94ece621f4605bf900256894d5118652cdd188c4'
});

export async function GET() {
    return NextResponse.json({ message: "Use a POST request to optimize an image" });
}

export async function POST(req: Request) {
    try {
        const { imageUrl } = await req.json(); // Expecting `{ imageUrl: 'https://...' }`
        
        if (!imageUrl) {
            return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
        }

        const params = { url: imageUrl, wait: true };

        return new Promise((resolve) => {
            kraken.url(params, (err: Error | null, data: any) => {
                if (err) {
                    resolve(NextResponse.json({ error: err.message }, { status: 500 }));
                } else {
                    resolve(NextResponse.json({ optimizedUrl: data.kraked_url }));
                }
            });
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}