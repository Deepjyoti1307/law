import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hover?: boolean;
    icon?: React.ReactNode;
    header?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, hover = true, icon, header, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-[var(--component-bg)] backdrop-blur-sm rounded-lg border border-border p-6 transition-all duration-[var(--animation-duration-normal)]",
                    hover && "hover:shadow-lg hover:border-accent hover:-translate-y-1",
                    className
                )}
                {...props}
            >
                {(icon || header) && (
                    <div className="mb-4">
                        {icon && (
                            <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-lg bg-accent/10 text-accent">
                                {icon}
                            </div>
                        )}
                        {header && <div className="font-semibold text-lg text-foreground">{header}</div>}
                    </div>
                )}
                <div className="text-[var(--text-secondary)]">
                    {children}
                </div>
            </div>
        );
    }
);

Card.displayName = "Card";

export { Card };
