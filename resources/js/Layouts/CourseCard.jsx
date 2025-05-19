import React from 'react';
import {Link, router} from "@inertiajs/react";
import {useAuth} from "@/Context/AuthContext";
import {Trash2} from "lucide-react";

const CourseCard = ({course}) => {
    const auth = useAuth();

    const handleDelete = (id) => {
        if (confirm('Вы уверены, что хотите удалить этот курс?')) {
            router.delete(route('course.destroy', id));
        }
    };

    return (
        <>
            <div className="w-1/4">
                <Link href={route('course.show', course.id)} className="block">
                    <img
                        src={`/images/${course.image}`}
                        alt="desc"
                        className="rounded border border-gray-300 w-full h-32 object-cover"
                    />
                </Link>
            </div>
            <div className="w-3/4">
                <Link href={route('course.show', course.id)}>
                    <h4 className="text-xl font-bold mb-2 text-gray-800">{course.name}</h4>
                </Link>
                <p className="mb-2 text-gray-600">{course.description}</p>
                {auth.user.role === 'admin' && (
                    <div className="ml-[28rem]">
                        <button
                            onClick={() => handleDelete(course.id)}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-150 ease-in-out"
                        >
                            <Trash2 className="w-5 h-5 mr-2"/>
                            Удалить
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default React.memo(CourseCard);
