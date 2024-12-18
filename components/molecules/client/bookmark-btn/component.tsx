'use client';

import { Btn } from '@/components/atoms/btn';

import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

import React from 'react';

interface Props extends Omit<React.ComponentProps<typeof Btn>, 'children' | 'variant'> {
    isBookmarked: boolean;
}

export const BookmarkBtn: React.FC<Props> = ({className, ...props}) => {
    
    const [isBookmarked, setIsBookmarked] = React.useState(props.isBookmarked);
    function bookmarkHandler() {
        setIsBookmarked(!isBookmarked);
    }

    const BookmarkIcon = isBookmarked ? BookmarkIconSolid : BookmarkIconOutline;

    return (
        <Btn variant={'secondary'} onClick={bookmarkHandler}>
            <BookmarkIcon className="h-6 w-6"/>
            {isBookmarked}
        </Btn>
    );
};