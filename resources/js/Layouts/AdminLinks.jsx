import React from 'react';
import {PlusCircle, ClipboardList} from 'lucide-react';
import {Link} from '@inertiajs/react';

const AdminLinks = () => (

    <div className="w-2/3 lg:w-1/3">
        <div className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Админ-панель</h3>
            <div className="flex justify-between">
                <Link
                    href={route('add.course')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                    <PlusCircle className="w-5 h-5 mr-2"/>
                    Добавить курс
                </Link>

                <Link
                    href={route('admin.registrations')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-150 ease-in-out"
                >
                    <ClipboardList className="w-5 h-5 mr-2"/>
                    Записи на курсы
                </Link>
            </div>
        </div>
    </div>
);

export default React.memo(AdminLinks);
