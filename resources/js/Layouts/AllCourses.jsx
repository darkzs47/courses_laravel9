import React from 'react';
import {Link} from "@inertiajs/react";
import CourseCard from "@/Layouts/CourseCard";
import {useAuth} from "@/Context/AuthContext";
import {useState} from "react";
import dayjs from "dayjs";
import CourseFilters from '@/Layouts/CourseFilters';

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
                            )) : <p>Нет курсов с таким фильтром</p>}
                        </div>
                        {auth.user.role === 'admin' && (
                            <div className="w-full lg:w-1/3">
                                <div className="bg-gray-100 p-4 rounded shadow">
                                    <h3 className="text-lg font-bold mb-4">Админ-панель</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href={route('add.course')}>Добавить курс</Link> <br/>
                                            <Link href={route('user.registrations')}>Записи на курсы</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
