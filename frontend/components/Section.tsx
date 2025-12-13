import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant?: 'light' | 'dark' | 'gradient';
    container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, children, variant = 'light', container = true, id, ...props }, ref) => {
        const variantClasses = {
            light: 'bg-background',
            dark: 'bg-[var(--component-bg-dark)] text-white',
            gradient: 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white',
        };

        const content = container ? (
            <div className="container mx-auto px-4">
                {children}
            </div>
        ) : children;

        return (
            <section
                ref={ref}
                id={id}
                className={cn(
                    "py-16 md:py-24",
                    variantClasses[variant],
                    className
                )}
                {...props}
            >
                {content}
            </section>
        );
    }
);

Section.displayName = "Section";

export { Section };
