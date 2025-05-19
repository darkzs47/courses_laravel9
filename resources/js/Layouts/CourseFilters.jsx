import React from 'react';
import {Tab} from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CourseFilters = ({ currentFilter, onFilterChange }) => {
    const filters = [
        { key: 'active', label: 'Активные курсы' },
        { key: 'completed', label: 'Начатые курсы' },
        { key: 'noSpaces', label: 'Без мест' }
    ];

    const selectedIndex = filters.findIndex(f => f.key === currentFilter);

    return (
            <div className="w-[30%] px-2 py-4 sm:px-0 mx-40">
                <Tab.Group selectedIndex={selectedIndex} onChange={(index) => onFilterChange(filters[index].key)}>
                    <Tab.List className="flex space-x-1 rounded-xl bg-gray-500/20 p-1">
                        {filters.map(({key, label}) => (
                            <Tab key={key} className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                    'ring-white/60 ring-offset-2 ring-offset-blue-300 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white text-black shadow'
                                        : 'text-gray-800 hover:bg-white/[0.12]'
                                )
                            }>
                                {label}
                            </Tab>
                        ))}
                    </Tab.List>
                </Tab.Group>
            </div>
    );
};

export default React.memo(CourseFilters);
