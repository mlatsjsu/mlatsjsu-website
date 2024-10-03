import { Btn } from '@/components/atoms/btn'; //imports atom btn

import thumbsIcon from '@/assets/hand-thumb-up.svg'; //changed the googleicon to the thumbs icon 
//TODO: download and place svg for the thumbs icon
import Image from 'next/image';

interface Props extends React.ComponentProps<typeof Btn>{} //removed omits

export const LikeBtn: React.FC<Props> = ({ ...props }) => { //kept component/function def same from Authbtn
    return (
        /*
        function clickHandler() {
            setLiked();
        }
        */

        <Btn {...props}> Like <Image src = {thumbsIcon} alt = "thumbsup"/></Btn>
    )
};
