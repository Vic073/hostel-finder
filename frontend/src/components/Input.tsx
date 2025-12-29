import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm md:text-sm font-medium text-foreground mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full px-4 py-3 md:py-2 text-base md:text-sm bg-background/50 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground min-h-[44px] ${error ? 'border-destructive focus:ring-destructive/50' : ''
                        } ${className}`}
                    {...props}
                />
                {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';

export default Input;
