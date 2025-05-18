import {AuthProvider} from "@/Context/AuthContext";
import LanguageProvider from "@/Providers/LanguageProvider";
import Navigation from "@/Layouts/Navigation";
import Footer from "@/Layouts/Footer";
import {Head} from "@inertiajs/react";
import Registration from "@/Layouts/Registration";

export default function Registrations({auth, languages, registrations}){

    return (
        <>
            <AuthProvider auth={auth}>
                <LanguageProvider value={languages}>
                    <Head title={auth.user.name}/>
                    <Navigation/>
                    <main>
                        <div className="max-w-5xl mx-auto py-10 px-4">
                            <h1 className="text-3xl font-bold text-center mb-8">Мои записи</h1>

                            {registrations.length === 0 ? (
                                <p className="text-center text-gray-500">Вы пока не записаны ни на один курс.</p>
                            ) : (
                                <div className="space-y-6">
                                    {registrations.map(reg => (
                                        <Registration reg={reg}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    </main>
                    <Footer/>
                </LanguageProvider>
            </AuthProvider>
        </>
    )
}
