import Footer from "@/Layouts/Footer";
import AllCourses from "@/Layouts/AllCourses";
import Navigation from "@/Layouts/Navigation";

export default function Authenticated({ header, courses }) {

    return (
        <div className="min-h-screen bg-gray-100">

            <Navigation/>

            {header && (
                <header className="bg-gray-100 shadow-md">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>
                <AllCourses courses={courses}/>
            </main>

            <Footer/>
        </div>
    );
}
