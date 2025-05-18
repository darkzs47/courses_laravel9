import React from 'react';
import Navigation from "@/Layouts/Navigation";
import Footer from "@/Layouts/Footer";
import {AuthProvider} from "@/Context/AuthContext";
import LanguageProvider from "@/Providers/LanguageProvider";
import {Head} from "@inertiajs/react";
import dayjs from 'dayjs';
import CourseCard from "@/Layouts/CourseCard";

export default function CoursesByLanguage({auth, languages, coursesByLanguage, currentLanguage}) {

    const language = currentLanguage.language;

    return (
        <AuthProvider auth={auth}>
            <LanguageProvider value={languages}>
                <Head title={language}/>
                <Navigation/>
                <header className="bg-gray-100 shadow-md">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Языковая школа LINGVO</h2>
                    </div>
                </header>
                <main>
                    <section className="py-10 bg-white">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="w-full lg:w-2/3 space-y-8">
                                    {coursesByLanguage.map((course, index) => (
                                        <article
                                            key={course.id}
                                            className="flex gap-4 border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
                                        >
                                            <CourseCard course={course}/>
                                        </article>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </section>
                </main>
                <Footer/>
            </LanguageProvider>
        </AuthProvider>
    )
}
