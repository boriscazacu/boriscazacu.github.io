import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimateOnScrollProps {
    children: ReactNode;
    delay?: string;
    triggerOnce?: boolean;
    className?: string;
}

export function AnimateOnScroll({ 
    children, 
    delay = '0s', 
    triggerOnce = true,
    className = ''
}: AnimateOnScrollProps) {
    const { ref, isVisible } = useScrollAnimation({
        threshold: 0.1,
        triggerOnce,
        rootMargin: '0px'
    });

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ease-out`}
            style={{ 
                transitionDelay: delay,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionProperty: 'opacity, transform'
            }}
        >
            {children}
        </div>
    );
}
