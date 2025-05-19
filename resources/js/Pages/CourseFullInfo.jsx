import {AuthProvider} from "@/Context/AuthContext";
import LanguageProvider from "@/Providers/LanguageProvider";
import Navigation from "@/Layouts/Navigation";
import Footer from "@/Layouts/Footer";
import {Head, router} from "@inertiajs/react";
import dayjs from "dayjs";
import {Eye, CheckCircle, Lock, CalendarX} from "lucide-react";

export default function CourseFullInfo({auth, languages, course, registrationsCount, registerExists}) {

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
                                    <button
                                        onClick={handleAdminRegistrations}
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-150"
                                    >
                                        <Eye className="w-5 h-5"/>
                                        Посмотреть записи на курс
                                    </button>
                                ) : registerExists ? (
                                    <button
                                        type="button"
                                        disabled
                                        className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 font-medium px-4 py-2 rounded-lg shadow-sm border border-gray-300 cursor-not-allowed"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        Уже записаны
                                    </button>
                                ) : dayjs().isBefore(dayjs(course.start_datetime)) ? (
                                    registrationsCount < courseCapacity ? (
                                        <button
                                            onClick={handleRegister}
                                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-150"
                                        >
                                            <CheckCircle className="w-5 h-5"/>
                                            Записаться
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="inline-flex items-center gap-2 bg-gray-300 text-gray-600 font-medium px-4 py-2 rounded-lg shadow-sm cursor-not-allowed"
                                        >
                                            <Lock className="w-5 h-5"/>
                                            Мест нет
                                        </button>
                                    )
                                ) : (
                                    <button
                                        disabled
                                        className="inline-flex items-center gap-2 bg-gray-300 text-gray-600 font-medium px-4 py-2 rounded-lg shadow-sm cursor-not-allowed"
                                    >
                                        <CalendarX className="w-5 h-5"/>
                                        Курс начался
                                    </button>
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
