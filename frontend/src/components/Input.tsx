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
                    <label className="block text-sm font-medium text-foreground mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full px-4 py-2 bg-background/50 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground ${error ? 'border-destructive' : ''
                        } ${className}`}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';

export default Input;
