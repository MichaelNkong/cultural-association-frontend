"use client";

import Footer from "@/app/components/ui/footer";
import Header from "@/app/components/ui/header";
import { useState } from "react";

export default function ImageResizer() {
    const [imageUrl, setImageUrl] = useState("");
    const [optimizedUrl, setOptimizedUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const optimizeImage = async () => {
        if (!imageUrl) {
            alert("Please enter an image URL.");
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
                    url: imageUrl, // Corrected payload
                    wait: true
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
                            <h2 className="heading-section">Optimize Your Image</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-wrap">
                                <input
                                    type="text"
                                    className="border p-2"
                                    placeholder="Enter image URL"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                                <button
                                    onClick={optimizeImage}
                                    className="bg-blue-500 text-white p-2 ml-2"
                                    disabled={loading}
                                >
                                    {loading ? "Optimizing..." : "Optimize"}
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