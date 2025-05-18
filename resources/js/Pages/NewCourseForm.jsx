import React from 'react';
import Navigation from "@/Layouts/Navigation";
import Footer from "@/Layouts/Footer";
import {Head, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import {AuthProvider} from "@/Context/AuthContext";
import LanguageProvider from "@/Providers/LanguageProvider";

export default function NewCourseForm({auth, languages}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        description: '',
        language_id: '',
        capacity: '',
        image: null,
        start_datetime: '',
    });

    const handleChange = (e) => {
        const {name, type, value, files} = e.target;
        setData(name, type === 'file' ? files[0] : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('courses.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthProvider auth={auth}>
            <LanguageProvider value={languages}>
                <Head title="Добавление курса"/>
                <Navigation/>
                <main>
                    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-lg mt-6">
                        <h2 className="text-2xl font-bold mb-4">Добавить новый курс</h2>

                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <InputLabel className="block font-medium" htmlFor="courseName" value="Название курса"/>
                                <TextInput
                                    id="courseName"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="w-full mt-1"
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>

                            <div>
                                <InputLabel className="block font-medium" htmlFor="description" value="Описание"/>
                                <TextAreaInput
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    className="w-full mt-1"
                                />
                                <InputError message={errors.description} className="mt-2"/>
                            </div>

                            <div>
                                <InputLabel className="block font-medium" htmlFor="language_id" value="Язык"/>
                                <SelectInput
                                    id="language_id"
                                    name="language_id"
                                    value={data.language_id}
                                    onChange={handleChange}
                                    options={languages}
                                />
                                <InputError message={errors.language_id} className="mt-2"/>
                            </div>

                            <div>
                                <InputLabel className="block font-medium" htmlFor="capacity"
                                            value="Макс. количество участников"/>
                                <TextInput
                                    id="capacity"
                                    type="number"
                                    name="capacity"
                                    value={data.capacity}
                                    onChange={handleChange}
                                    className="w-full mt-1"
                                />
                                <InputError message={errors.capacity} className="mt-2"/>
                            </div>

                            <div>
                                <InputLabel className="block font-medium" htmlFor="datetime-local" value="Дата начала"/>
                                <TextInput
                                    id="datetime-local"
                                    type="datetime-local"
                                    name="start_datetime"
                                    value={data.start_datetime}
                                    onChange={handleChange}
                                    className="w-full mt-1"
                                />
                                <InputError message={errors.start_datetime} className="mt-2"/>
                            </div>

                            <div>
                                <InputLabel className="block font-medium" htmlFor="file" value="Изображение"/>
                                <input
                                    id="file"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Добавить курс
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
                <Footer/>
            </LanguageProvider>
        </AuthProvider>
    );
}
