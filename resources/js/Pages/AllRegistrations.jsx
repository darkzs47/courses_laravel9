import {AuthProvider} from "@/Context/AuthContext";
import LanguageProvider from "@/Providers/LanguageProvider";
import Navigation from "@/Layouts/Navigation";
import Footer from "@/Layouts/Footer";
import {Head, router} from "@inertiajs/react";
import {Trash2} from "lucide-react";
import React from "react";

export default function AllRegistrations({auth, languages, registrations, registrationsCount}) {

    const handleDelete = (registrationId) => {
        if (confirm('Вы уверены, что хотите удалить запись?')) {
            router.delete(route('registration.delete', {id: registrationId}));
        }
    };
    return (
        <>
            <AuthProvider auth={auth}>
                <LanguageProvider value={languages}>
                    <Head title={auth.user.name}/>
                    <Navigation/>
                    <main>
                        <div className="max-w-5xl mx-auto py-10 px-4">
                            {registrations.length > 0 ? (
                                <>
                                    <h1 className="text-3xl font-bold text-center mb-8">
                                        {registrations[0].course.name}
                                    </h1>
                                    {registrations.map((registration) => (
                                        <div
                                            key={registration.id}
                                            className="flex items-center mb-6 border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
                                        >
                                            <div className="flex-1">
                                                <p className="text-gray-600">
                                                    Имя пользователя: <b>{registration.user.name}</b>
                                                </p>
                                                <p className="text-gray-600">
                                                    Дата начала курса:{' '}
                                                    <b>{new Date(registration.course.start_datetime).toLocaleString()}</b>
                                                </p>
                                                <p className="text-gray-600">
                                                    Максимальное количество
                                                    участников: <b>{registration.course.capacity}</b>
                                                </p>
                                                <p className="text-gray-600">
                                                    Текущее количество участников:{' '}
                                                    <b>{registrationsCount[registration.course.id]}</b>
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(registration.id)}
                                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-150 ease-in-out"
                                            >
                                                <Trash2 className="w-5 h-5 mr-2"/>
                                                Удалить
                                            </button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p className="text-center text-gray-500">На курс нет записей.</p>
                            )}
                        </div>
                    </main>
                    <Footer/>
                </LanguageProvider>
            </AuthProvider>
        </>
    )
}
