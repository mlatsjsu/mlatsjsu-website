"use client"; //needed?

import { Btn } from '@/components/atoms/btn'; //imports atom btn

import thumbsIcon from '@/assets/hand-thumb-up.svg'; //changed the googleicon to the thumbs icon 
import orangeThumbsIcon from '@/assets/hand-thumb-up-orange.svg';
//TODO: download and place svg for the thumbs icon
import Image from 'next/image';
import React from 'react';//needed?

interface Props extends React.ComponentProps<typeof Btn>{} //removed omits

export const LikeBtn: React.FC<Props> = ({ ...props }) => { //kept component/function def same from Authbtn
    
    const [liked,setLiked] = React.useState<boolean>(false);
    const [likeCount, setLikeCount] = React.useState<number>(0);
    const [thumbs, setThumbs] = React.useState<string>(thumbsIcon);
    
    function likeHandler() {
        liked ? setLiked(false) : setLiked(true);
        liked ? setLikeCount(likeCount => likeCount-1) : setLikeCount(likeCount => likeCount+1);
        liked ? setThumbs(thumbsIcon) : setThumbs(orangeThumbsIcon);
    }

    return (
        /*
        function clickHandler() {
            setLiked();
        }
        */

        <Btn {...props} onClick={likeHandler}> <Image src = {thumbs} alt = "thumbsup"/> {likeCount} {liked} </Btn>
    )
};
