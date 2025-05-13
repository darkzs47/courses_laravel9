import React from 'react';
import Navigation from "@/Layouts/Navigation";
import Footer from "@/Layouts/Footer";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import {AuthProvider} from "@/Context/AuthContext";

export default function NewCourseForm({ auth }) {

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
            <Navigation/>

            <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-lg mt-6">
                <h2 className="text-2xl font-bold mb-4">Добавить новый курс</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <div>
                        <label className="block font-medium" htmlFor="courseName">Название курса</label>
                        <TextInput
                            id="courseName"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full mt-1"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Описание</label>
                        <TextAreaInput
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full mt-1"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Язык</label>
                        <SelectInput
                            name="language_id"
                            value={data.language_id}
                            onChange={handleChange}
                            options={[
                                {value: '1', label: 'Английский'},
                                {value: '2', label: 'Китайский'},
                            ]}
                        />
                        {errors.language_id && <p className="text-red-500 text-sm">{errors.language_id}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Макс. количество участников</label>
                        <TextInput
                            type="number"
                            name="capacity"
                            value={data.capacity}
                            onChange={handleChange}
                            className="w-full mt-1"
                        />
                        {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Дата начала</label>
                        <TextInput
                            type="datetime-local"
                            name="start_datetime"
                            value={data.start_datetime}
                            onChange={handleChange}
                            className="w-full mt-1"
                        />
                        {errors.start_datetime && <p className="text-red-500 text-sm">{errors.start_datetime}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Изображение</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="mt-1"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
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

            <Footer/>
        </AuthProvider>
    );
}
