import {Link, router} from "@inertiajs/react";
import {useAuth} from "@/Context/AuthContext";

export default function CourseCard({course}) {
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
                    <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 hover:underline"
                    >
                        Удалить
                    </button>
                )}
            </div>
        </>
    )
}
