

"use client";

import Image from "next/image";
import Footer from "@/app/components/ui/footer";
import { useState } from "react";
import image from "@/app/lib/api/image";
import { ok } from "assert";
export default function ImageResizer() {
  const [imageUrl, setImageUrl] = useState("");
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [optimizedUrl, setOptimizedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const optimizeImage = async () => {
    if (!imageUrl) {
      alert("Please enter an image URL.");
      return;
    }

    if (!width || !height || isNaN(Number(width)) || isNaN(Number(height))) {
      alert("Please enter valid width and height values.");
      return;
    }

    setLoading(true);
    setOptimizedUrl("");

    try {


      const response = await image.optimizeImage(imageUrl, width, height);
      const myBlob = await response.data;
      console.log("blob blob blob ", myBlob);
      console.log("Raw Response Body:nn", response);

    const objectUrl =  URL.createObjectURL(myBlob);

     setOptimizedUrl(myBlob );
      console.log("object url ", objectUrl);
      if ( objectUrl ) {
        setOptimizedUrl(myBlob);
              console.log("object url cjcjchh", objectUrl);
      } else {
        alert("Error optimizing image: " + (response.data || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("An error occurred while optimizing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">
                Optimize & Resize Your Image
              </h2>
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

                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    className="border p-2 w-1/2"
                    placeholder="Width"

                    onChange={(e) => setWidth(e.target.valueAsNumber)}
                  />
                  <input
                    type="number"
                    className="border p-2 w-1/2"
                    placeholder="Height"

                    onChange={(e) => setHeight(e.target.valueAsNumber)}
                  />
                </div>

                <button
                  onClick={optimizeImage}
                  className="bg-blue-500 text-white p-2 w-full disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Optimizing..." : "Optimize & Resize"}
                </button>

                {optimizedUrl ? (
                  <div className="mt-4">
                    <p className="mb-2">Optimized Image:</p>

                    <div className="relative w-full max-w-md h-[300px]">
                      <Image
                        src={optimizedUrl}
                        alt="Optimized image"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <p className="mt-2">
                      <a
                        href={optimizedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Download Optimized Image
                      </a>
                    </p>
                  </div>
                ) : (
                  <p className="mt-4">
                    {loading ? "Processing..." : "No optimized image yet."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

