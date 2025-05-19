import React from 'react';
import {Link} from "@inertiajs/react";
import CourseCard from "@/Layouts/CourseCard";
import {useAuth} from "@/Context/AuthContext";
import AdminLinks from "@/Layouts/AdminLinks";

const AllCourses = ({courses}) => {
    const auth = useAuth();

    return (
        <div>
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3 space-y-8">
                            {courses.length > 0 ? courses.map((course) => (
                                <article
                                    key={course.id}
                                    className="flex gap-4 border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
                                >
                                    <CourseCard course={course}/>
                                </article>
                            )) : <p className="w-full">Нет курсов с таким фильтром</p>}
                        </div>
                        {auth.user.role === 'admin' && (
                            <AdminLinks/>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-gray-900 py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {['thumb1.jpg', 'thumb2.jpg', 'thumb3.jpg', 'thumb4.jpg', 'thumb5.jpg', 'thumb6.jpg'].map((img, index) => (
                            <div key={index} className="border border-gray-700 rounded overflow-hidden shadow">
                                <img
                                    src={`/images/${img}`}
                                    alt={`desc ${index + 1}`}
                                    className="w-full h-32 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

    );
}

export default React.memo(AllCourses);
