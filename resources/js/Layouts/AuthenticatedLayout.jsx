import React, {useState} from 'react';
import Footer from "@/Layouts/Footer";
import AllCourses from "@/Layouts/AllCourses";
import Navigation from "@/Layouts/Navigation";
import CourseFilters from "@/Components/CourseFilters";
import dayjs from "dayjs";

const Authenticated = ({ header, courses }) => {

    const [filter, setFilter] = useState('active');

    const filteredCourses = React.useMemo(() => {
        return courses.filter(course => {
            switch (filter) {
                case 'active':
                    return dayjs().isBefore(dayjs(course.start_datetime)) &&
                        course.capacity > course.registrations_count;
                case 'completed':
                    return dayjs().isAfter(dayjs(course.start_datetime));
                case 'noSpaces':
                    return course.capacity <= course.registrations_count;
                default:
                    return true;
            }
        });
    }, [courses, filter]);

    return (
        <div className="min-h-screen bg-gray-100">

            <Navigation/>

            {header && (
                <header className="bg-gray-100 shadow-md flex justify-between">
                    <div className="max-w-2xl mx-40 py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                    <CourseFilters currentFilter={filter} onFilterChange={setFilter} />
                </header>
            )}

            <main>
                <AllCourses courses={filteredCourses}/>
            </main>

            <Footer/>
        </div>
    );
}

export default React.memo(Authenticated);
