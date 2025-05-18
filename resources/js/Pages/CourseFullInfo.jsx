import {AuthProvider} from "@/Context/AuthContext";
import LanguageProvider from "@/Providers/LanguageProvider";
import Navigation from "@/Layouts/Navigation";
import Footer from "@/Layouts/Footer";
import {Head, router} from "@inertiajs/react";
import dayjs from "dayjs";

export default function CourseFullInfo({auth, languages, course, registrationsCount}) {

    const courseCapacity = course.capacity;

    const handleRegister = () => {
        router.post(route('courses.register', {courseId: course.id, userId: auth.user.id}));
    };

    const handleAdminRegistrations = () => {
        router.get(route('admin.registrations', {id: course.id}));
    }

    return (
        <AuthProvider auth={auth}>
            <LanguageProvider value={languages}>
                <Head title={course.name}/>
                <Navigation/>
                <main>
                    <div className="flex justify-center items-center py-10 min-h-fit bg-gray-100">
                        <div className="bg-white rounded-xl shadow-md p-4 max-w-4xl w-full">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                                {course.name}
                            </h1>

                            <p className="text-gray-600 text-center mb-6">
                                Начало курса: <b>{dayjs(course.start_datetime).format('DD.MM.YYYY HH:mm')}</b><br/>
                                Количество мест: <b>{course.capacity}</b>
                            </p>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <img
                                    src={`/images/${course.image}`}
                                    alt="course"
                                    className="w-[400px] h-[250px] object-cover rounded-lg shadow"
                                />
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {course.description}
                                </p>
                            </div>
                            <div className="mt-6 text-center">
                                {auth.user.role === 'admin' ? (
                                    <button onClick={handleAdminRegistrations}
                                       className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
                                    > Посмотреть записи на курс</button>
                                ) : (
                                    registrationsCount < courseCapacity ? (
                                        dayjs().isBefore(dayjs(course.start_datetime)) ?
                                            (<button
                                                disabled={false}
                                                onClick={handleRegister}
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
                                            >
                                                Записаться
                                            </button>) : (<button
                                                disabled={true}
                                                onClick={handleRegister}
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600"
                                            >
                                                Курс начался
                                            </button>)) : (<button
                                                disabled={true}
                                                onClick={handleRegister}
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600"
                                    >
                                                Мест нет
                                            </button>)
                                    )}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </LanguageProvider>
        </AuthProvider>
    )
}
