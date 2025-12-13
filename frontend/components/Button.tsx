import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-[var(--button-primary-bg)] text-primary-foreground hover:bg-[var(--button-primary-bg-hover)] shadow-md hover:shadow-lg transition-all duration-[var(--animation-duration-normal)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                secondary: "bg-[var(--button-secondary-bg)] text-white hover:bg-[var(--button-secondary-bg-hover)] shadow-md hover:shadow-lg transition-all duration-[var(--animation-duration-normal)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-[var(--animation-duration-normal)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                ghost: "bg-transparent hover:bg-muted text-foreground transition-all duration-[var(--animation-duration-normal)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                gradient: "bg-gradient-to-r from-[#c49b5a] via-[#d4a862] to-[#c49b5a] bg-[length:280%_auto] text-white border-none font-medium transition-all duration-700 hover:bg-right focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-[#c49b5a] motion-reduce:transition-none shadow-[0px_0px_20px_rgba(196,155,90,0.5),0px_5px_5px_-1px_rgba(196,155,90,0.25),inset_4px_4px_8px_rgba(212,168,98,0.5),inset_-4px_-4px_8px_rgba(180,143,70,0.35)] hover:shadow-[0px_0px_25px_rgba(196,155,90,0.6),0px_5px_5px_-1px_rgba(196,155,90,0.3),inset_4px_4px_8px_rgba(212,168,98,0.6),inset_-4px_-4px_8px_rgba(180,143,70,0.4)]",
            },
            size: {
                sm: "h-9 px-4 py-2 text-sm min-w-[100px]",
                md: "h-11 px-6 py-2.5 text-base min-w-[120px]",
                lg: "h-14 px-8 py-3 text-lg min-w-[140px]",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, icon, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {icon && <span className="shrink-0">{icon}</span>}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
