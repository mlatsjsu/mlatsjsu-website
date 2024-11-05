import { cn } from '@/lib/cn';

interface Props {
    variant: 'small' | 'large';
}

export const ArticlePreview:React.FC<Props> = ({variant}) => {
    const update_day = Date();
    const article_name = '';
    const article_desc = '';
    const timeAgo = '';
    return (
        <div className={cn(
            'flex flex-col rounded-md hover:bg-light-neutral-gray'
        )}>
            user profile
            <p className={cn(
                'text-light-secondary',
                {
                    'text-h4-desktop' : variant === 'large',
                    'text-h4-mobile' : variant === 'small',
                }
                
            )}>
                Last updated, {update_day} * {timeAgo}
            </p>
            <h2 className={cn(
                'text-light-neutral-dark',
                {
                    'text-h2-desktop' : variant === 'large',
                    'text-h2-mobile' : variant === 'small',
                }
            )}>
                {article_name}
            </h2>

            <p className={cn(
                'text-light-secondary',
                {
                    'text-h3-desktop' : variant === 'large',
                    'text-h3-mobile' : variant === 'small',
                }
            )}>
                {article_desc}
            </p>
            Button interactions
        </div>
    );
};