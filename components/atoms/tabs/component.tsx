import {cn} from '@/lib/cn';
import { HorizontalLine} from '@/components/atoms';

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    children?: React.ReactNode;
}

export const Tabs: React.FC<Props> = ({ children, ...rest }) => {
    const Component = (Props) => (<div className={cn('box-border h-[41px] m-1 border-line-width border-px w-1/4 rounded-[5px] text-light-neutral-dark border-dashed')} >{Props.children}
     <p>{Props.customText}</p>  {/* Example of using a custom prop */}</div>)
    return (
        <section className={cn('box-border m-[20px] flex w-[460px] h-[102px] justify-around content-between flex-wrap  border-b-[1px]')}>
            <Component  customText="Hello, world!" >
            </Component>
        </section>
        
           
       
        
    );
};

/*
 <section className={cn('flex w-40 justify-between')}>
            <div className={cn('border-line-width border-px size-[25px] rounded-[5px] text-light-neutral-dark border-dashed')} >
            {children} {}
            </div>
            <div className={cn('border-line-width border-px size-[25px] rounded-[5px] text-light-neutral-dark')} 
            {children} {}
            </div>
            <div className={cn('border-line-width border-px size-[25px] rounded-[5px] text-light-neutral-dark')} {...rest}> 
            {children} {}
        </div>
        </section>
*/