"use client";

import Footer from "@/app/components/ui/footer";
import Header from "@/app/components/ui/header";
import { useState } from "react";

export default function ImageResizer() {
    const [imageUrl, setImageUrl] = useState("");
    const [optimizedUrl, setOptimizedUrl] = useState("");

    const optimizeImage = async () => {
        if (!imageUrl) {
            alert("Please enter an image URL.");
            return;
        }

        try {
            const response = await fetch("https://api.kraken.io/v1/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl }),
            });

            const data = await response.json();
            if (data.optimizedUrl) {
                setOptimizedUrl(data.optimizedUrl);
            } else {
                alert("Error optimizing image: " + data.error);
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
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
                                >
                                    Optimize
                                </button>

                                {optimizedUrl ? (
                                    <div className="mt-4">
                                        <p>Optimized Image:</p>
                                        <img src={optimizedUrl} alt="Optimized" className="w-1/2" />
                                    </div>
                                ) : (
                                    <p>No optimized image yet.</p>
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