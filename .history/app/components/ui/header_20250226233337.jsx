import React from 'react';
export default function () {
    return (

        <header  class="flex flex-col lg:flex-row justify-between lg:mb-20">
            <div class="text-center lg:text-left mb-20 lg:mb-0">
                <div
                    class="flex items-center justify-center lg:justify-start gap-2 mb-10"
                >
                    <span class="w-20 h-0.5 bg-indigo-700"></span>

                    <p class="font-medium text-indigo-700 text-xl">
                        Jessica Strosin
                    </p>
                </div>

                <h1
                    class="font-bold text-gray-800 text-4xl md:text-6xl xl:text-7xl mb-10"
                >
                    Creative thinker <br />
                    Minimalism lover
                </h1>

                <p
                    class="font-normal text-gray-500 text-sm md:text-md xl:text-lg mb-10"
                >
                    Hi, I’m Jessica. I’m UI/UX Designer. If you are
                    looking for Designer <br />
                    to build your brands and grow your business Let’s
                    shake hands <br />
                    with me.
                </p>

                <div class="space-y-5 lg:space-x-5 mb-10">
                    <a
                        href="#"
                        class="block md:inline px-8 py-3 font-medium bg-indigo-800 text-white text-lg rounded-md hover:bg-indigo-600 transiton ease-in-out duration-300"
                    >Hire me</a
                    >

                    <a
                        href="#"
                        class="block md:inline px-8 py-3 font-medium text-indigo-800 text-lg border-2 border-indigo-800 rounded-md hover:bg-indigo-600 hover:text-white transiton ease-linear duration-300"
                    >Read more</a
                    >
                </div>

                <hr class="text-gray-500 mb-5" />

                <span class="font-normal text-gray-500 text-sm"
                >I am currently open for part-time work.</span
                >
            </div>

            <div class="mx-auto lg:mx-0">
                <img src="assets/image/home-img.svg" alt="Image" />
            </div>
        </header>

    );
}