import {cn} from '@/lib/cn';

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    children?: React.ReactNode;
}

export const Tabs: React.FC<Props> = ({ children, ...props }) => {
    const Component = (Props) => (<div className={cn('box-border h-[41px] m-1 border-line-width border-px w-1/4 rounded-[5px] text-light-neutral-dark border-dashed')} >{Props.children}</div>)
    return (
        <section className={cn('box-border m-[20px] flex w-[460px] h-[102px] justify-around content-between flex-wrap  border-b-[1px]')}> 
            <Component {...props}> 
            </Component> {/*not exactly sure how to pass things into props to test it out*/}
        </section>
        
           
       
        
    );
};
