import {cn} from '@/lib/cn';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLInputElement>{
    children?: React.ReactNode;
}
/*
*peer-checked: I have no idea, I don't think its implemented yet
*peer-focus: selected tab
*peer-enabled: the one you're clicking on?
*/
export const Tab: React.FC<Props> = ({ children, className, ...props }) => {
    const [id, setId] = React.useState('');
    React.useEffect(() => setId(Math.random().toString(36).substring(7)), []);
    return (
        <span className={cn('block w-[100%] max-w-[120px] text-center')}>
            <input {...props} className="peer sr-only" id={id} type="radio"/>
            <label
                className={cn(
                'flex cursor-pointer items-center gap-xs px-md py-sm opacity-25 peer-checked:!opacity-100 peer-checked:border-b-line-width peer-focus:outline-none peer-enabled:hover:opacity-50 peer-enabled:active:opacity-100 peer-enabled:active:border-b-line-width ',
                className,
                )}
                htmlFor={id}
            >
                {children}
            </label>
        </span>
        
    );
};
