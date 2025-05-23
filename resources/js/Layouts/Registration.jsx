import React from 'react';
import dayjs from 'dayjs';
import {router} from "@inertiajs/react"
import {XCircle} from "lucide-react";

const Registration = ({reg}) => {
    const courseStart = dayjs(reg.course.start_datetime);
    const now = dayjs();
    const isTooLate = courseStart.diff(now, 'hour') < 24;
    const courseStarted = now > courseStart;

    const handleCancel = (registrationId) => {
        if (confirm('Вы уверены, что хотите отменить запись?')) {
            router.delete(route('registration.cancel', { id: registrationId }));
        }
    };

    return (
        <>
            <div key={reg.id}
                 className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
                <img
                    src={`/images/${reg.course.image}`}
                    alt={reg.course.name}
                    className="w-[200px] h-[140px] object-cover rounded"
                />
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">{reg.course.name}</h2>
                    <p className="text-gray-600 mt-1">
                        Дата
                        начала: <b>{dayjs(reg.course.start_datetime).format('DD.MM.YYYY HH:mm')}</b>
                    </p>
                    <p className="text-gray-600">
                        Максимальное количество участников: <b>{reg.course.capacity}</b>
                    </p>
                </div>
                <button
                    onClick={() => handleCancel(reg.id)}
                    disabled={isTooLate}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm font-medium transition-colors duration-150
    ${isTooLate
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'}
  `}
                >
                    <XCircle className="w-5 h-5"/>
                    {courseStarted ? 'Курс уже начался' : 'Отменить запись'}
                </button>
            </div>
        </>
    )
}

export default React.memo(Registration);
