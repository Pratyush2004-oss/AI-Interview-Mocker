import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div>
            <section className="relative h-screen bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
                <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

                <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                            Test your knowledge
                            <strong className="block font-extrabold text-primary"> in your field. </strong>
                        </h1>

                        <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                            Create Your AI Mock Interview and test your Interview preparation
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <Link
                                href="/dashboard"
                                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-900 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto"
                            >
                                + Create AI Mock Interview
                            </Link>

                            <Link
                                href="/dashboard/work"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-primary shadow hover:text-purple-900 focus:outline-none focus:ring active:text-purple-500 sm:w-auto"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero