import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({className = '', isFocused = false, rows = 4, ...props}, ref) {
        const textarea = ref || useRef();

        useEffect(() => {
            if (isFocused && textarea.current) {
                textarea.current.focus();
            }
        }, [isFocused]);

        return (
            <div className="flex flex-col items-start">
                <textarea
                    {...props}
                    rows={rows}
                    className={
                        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                        className
                    }
                    ref={textarea}
                />
            </div>
        );
    }
)
