'use client';

import { Btn } from '@/components/atoms/btn';

import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

import React from 'react';

interface Props extends React.ComponentProps<typeof Btn>{}

export const BookmarkBtn: React.FC<Props> = ({className, children, variant, ...props}) => {
    
    const [bookmark, setBookmark] = React.useState<boolean>(false);
    function bookmarkHandler() {
        setBookmark(!bookmark);
    }

    const BookmarkIcon = bookmark ? BookmarkIconSolid : BookmarkIconOutline;

    return (
        <Btn variant={'secondary'} onClick={bookmarkHandler}>
            <BookmarkIcon className="h-6 w-6"/>
            {bookmark}
        </Btn>
    );
};