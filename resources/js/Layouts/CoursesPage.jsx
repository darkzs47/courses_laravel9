import {Link} from "@inertiajs/react";

export default function CoursesPage() {
    return (
        <div>
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3 space-y-8">
                            {[
                                {
                                    img: 'a1.jpg',
                                    title: 'Интенсивный курс английского языка',
                                    text: 'Текст.',
                                },
                                {
                                    img: 'thumb2.jpg',
                                    title: 'Китайский язык для начинающих',
                                    text: 'Текст.',
                                },
                            ].map((course, index) => (
                                <article
                                    key={index}
                                    className="flex gap-4 border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-1/4">
                                        <a href="#" className="block">
                                            <img
                                                src={`/images/${course.img}`}
                                                alt="desc"
                                                className="rounded border border-gray-300 w-full h-32 object-cover"
                                            />
                                        </a>
                                    </div>
                                    <div className="w-3/4">
                                        <a href="#">
                                            <h4 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h4>
                                        </a>
                                        <p className="mb-2 text-gray-600">{course.text}</p>
                                        <a href="#" className="text-red-600 hover:underline">Удалить</a>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="w-full lg:w-1/3">
                            <div className="bg-gray-100 p-4 rounded shadow">
                                <h3 className="text-lg font-bold mb-4">Админ-панель</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href={route('addCourse')}>Добавить курс</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
