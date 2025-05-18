import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function Select(
        {className = '', isFocused = false, options = [], ...props}, ref) {
        const select = ref || useRef();

        useEffect(() => {
            if (isFocused && select.current) {
                select.current.focus();
            }
        }, [isFocused]);

        return (
            <div className="flex flex-col items-start">
                <select
                    {...props}
                    className={
                        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                        className
                    }
                    ref={select}
                >
                    <option key={-1} value="">
                        Язык
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option.id}>
                            {option.language}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

