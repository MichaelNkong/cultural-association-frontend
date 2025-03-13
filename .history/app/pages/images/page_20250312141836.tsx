"use client";

import Footer from "@/app/components/ui/footer";
import Header from "@/app/components/ui/header";
import { useState } from "react";

export default function ImageResizer() {
    const [imageUrl, setImageUrl] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [optimizedUrl, setOptimizedUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const optimizeImage = async () => {
        if (!imageUrl) {
            alert("Please enter an image URL.");
            return;
        }

        if ((!width || !height) || isNaN(width) || isNaN(height)) {
            alert("Please enter valid width and height values.");
            return;
        }

        setLoading(true);
        setOptimizedUrl(""); // Clear previous results

        try {
            const response = await fetch("https://api.kraken.io/v1/url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    auth: {
                        api_key: "bfbdc7bd7883f3fa69bfa20802c5dee6",
                        api_secret: "94ece621f4605bf900256894d5118652cdd188c4"
                    },
                    url: imageUrl, // Image URL input
                    wait: true,
                    resize: {
                        width: parseInt(width),
                        height: parseInt(height),
                        strategy: "exact" // Ensures exact resizing
                    }
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setOptimizedUrl(data.kraked_url);
            } else {
                alert("Error optimizing image: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
            alert("An error occurred while optimizing the image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Optimize & Resize Your Image</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-wrap">
                                <input
                                    type="text"
                                    className="border p-2 mb-2 w-full"
                                    placeholder="Enter image URL"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                                <div className="flex space-x-2 mb-2">
                                    <input
                                        type="number"
                                        className="border p-2 w-1/2"
                                        placeholder="Width"
                                        value={width}
                                        onChange={(e) => setWidth(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="border p-2 w-1/2"
                                        placeholder="Height"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={optimizeImage}
                                    className="bg-blue-500 text-white p-2 w-full"
                                    disabled={loading}
                                >
                                    {loading ? "Optimizing..." : "Optimize & Resize"}
                                </button>

                                {optimizedUrl ? (
                                    <div className="mt-4">
                                        <p>Optimized Image:</p>
                                        <img src={optimizedUrl} alt="Optimized" className="w-1/2" />
                                        <p>
                                            <a
                                                href={optimizedUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500"
                                            >
                                                Download Optimized Image
                                            </a>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-4">{loading ? "Processing..." : "No optimized image yet."}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}