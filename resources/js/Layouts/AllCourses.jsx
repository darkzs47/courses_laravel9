import {Link} from "@inertiajs/react";
import CourseCard from "@/Layouts/CourseCard";
import {useAuth} from "@/Context/AuthContext";
import {useState} from "react";
import dayjs from "dayjs";

export default function AllCourses({courses}) {
    const auth = useAuth();

    const [filter, setFilter] = useState('active');

    const filteredCourses = courses.filter(course => {
        switch (filter) {
            case 'active':
                return dayjs().isBefore(dayjs(course.start_datetime)) && course.capacity > course.registrations_count;
            case 'completed':
                return dayjs().isAfter(dayjs(course.start_datetime));
            case 'noSpaces':
                return course.capacity <= course.registrations_count;
            default:
                return true;
        }
    });

    return (
        <div>
            <section className="bg-white flex">
                <div className="mb-4 m-auto">
                    <button onClick={() => setFilter('active')}
                            className="mr-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Активные курсы
                    </button>
                    <button onClick={() => setFilter('completed')}
                            className="mr-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Завершенные курсы
                    </button>
                    <button onClick={() => setFilter('noSpaces')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Без мест
                    </button>
                </div>
            </section>
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3 space-y-8">
                            {filteredCourses.map((course, index) => (
                                <article
                                    key={index}
                                    className="flex gap-4 border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
                                >
                                    <CourseCard course={course}/>
                                </article>
                            ))}
                        </div>
                        {auth.user.role === 'admin' && (
                            <div className="w-full lg:w-1/3">
                                <div className="bg-gray-100 p-4 rounded shadow">
                                    <h3 className="text-lg font-bold mb-4">Админ-панель</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href={route('add.course')}>Добавить курс</Link> <br/>
                                            <Link href={route('user.registration')}>Записи на курсы</Link>
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
