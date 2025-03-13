import React from 'react';
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-red-50 py-16 mb-10">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div class="text-center">
                    <h1
                        class="font-medium text-gray-700 text-2xl md:text-5xl mb-5"
                    >
                        Contact with me
                    </h1>

                    <p
                        class="font-normal text-gray-400 text-sm md:text-lg mb-20"
                    >
                        I’m not currently taking on new client work but feel
                        free to contact me for any <br />
                        other inquiries.
                    </p>

                    <div
                        class="flex items-center justify-center space-x-4 md:space-x-8"
                    >
                        <Link
                            href="#"
                            class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300"
                        >
                            <i
                                data-feather="twitter"
                                class="text-gray-500 hover:text-white transition ease-in-out duration-500"
                            ></i>
                        </Link>

                        <Link
                            href="#"
                            class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300"
                        >
                            <i
                                data-feather="dribbble"
                                class="text-gray-500 hover:text-white transition ease-in-out duration-500"
                            ></i>
                        </Link>

                        <a
                            href="#"
                            class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300"
                        >
                            <i
                                data-feather="facebook"
                                class="text-gray-500 hover:text-white transition ease-in-out duration-500"
                            ></i>
                        </a>

                        <a
                            href="#"
                            class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300"
                        >
                            <i
                                data-feather="codepen"
                                class="text-gray-500 hover:text-white transition ease-in-out duration-500"
                            ></i>
                        </a>

                        <a
                            href="#"
                            class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300"
                        >
                            <i
                                data-feather="at-sign"
                                class="text-gray-500 hover:text-white transition ease-in-out duration-500"
                            ></i>
                        </a>

                        <a
                            href="#"
                            class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300"
                        >
                            <i
                                data-feather="instagram"
                                class="text-gray-500 hover:text-white transition ease-in-out duration-500"
                            ></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>


    );
}