import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {AuthProvider} from "@/Context/AuthContext";
import LanguageProvider from "@/Providers/LanguageProvider";
import FlashMessageModal from "@/Layouts/FlashMessageModal";

export default function Dashboard( {auth, languages, courses } ) {
    return (
        <AuthProvider auth={auth}>
            <LanguageProvider value={languages}>
                <Head title="Главная"/>
                <AuthenticatedLayout
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Языковая школа LINGVO</h2>}
                    courses={courses}
                >
                </AuthenticatedLayout>
                <FlashMessageModal/>
            </LanguageProvider>
        </AuthProvider>
    );
}
