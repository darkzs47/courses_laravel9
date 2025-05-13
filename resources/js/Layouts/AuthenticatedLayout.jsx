import Footer from "@/Layouts/Footer";
import CoursesPage from "@/Layouts/CoursesPage";
import Navigation from "@/Layouts/Navigation";

export default function Authenticated({ header }) {

    return (
        <div className="min-h-screen bg-gray-100">

            <Navigation/>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>
                <CoursesPage/>
            </main>

            <Footer/>
        </div>
    );
}
