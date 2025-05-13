import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        login: '',
        password: '',
        password_confirmation: '',
        avatar: null,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        // Обрабатываем изменения полей
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleFileChange = (e) => {
        // Обрабатываем файл
        setData('avatar', e.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();

        // Формируем FormData для отправки файла
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('login', data.login);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);
        formData.append('avatar', data.avatar); // Добавляем аватар

        // Отправляем данные
        post(route('register'), formData, {
            forceFormData: true, // Указываем, что отправляем данные как FormData
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="name" value="ФИО" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="login" value="Логин" />

                    <TextInput
                        id="login"
                        type="text"
                        name="login"
                        value={data.login}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.login} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Пароль" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Подтверждение пароля" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="avatar" value="Аватар" />

                    <input
                        id="avatar"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        className="mt-1 block w-full"
                        onChange={handleFileChange}
                    />

                    <InputError message={errors.avatar} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Уже зарегистрированы?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Зарегистрироваться
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
