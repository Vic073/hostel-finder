import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { LogIn } from 'lucide-react';
import type { LoginCredentials } from '../types';

const LoginPage = () => {
    return <LoginForm />;
};

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginCredentials>();

    const onSubmit = async (data: LoginCredentials) => {
        try {
            await login(data);
            navigate('/dashboard');
        } catch (error: any) {
            console.error(error);
            setError('root', {
                type: 'manual',
                message: error.response?.data?.error || 'Login failed. Please check your credentials.'
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-6 md:py-8">
            <div className="w-full max-w-md px-4">
                <div className="glass rounded-2xl p-6 md:p-8 space-y-6 border border-white/10">
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <LogIn className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Welcome Back
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">Sign in to continue to HostelFinder</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...register('password', { 
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                            error={errors.password?.message}
                        />

                        {errors.root && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                <p className="text-destructive text-sm text-center">{errors.root.message}</p>
                            </div>
                        )}

                        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs md:text-sm">
                            <span className="px-2 bg-background text-muted-foreground">New to HostelFinder?</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to="/register">
                            <Button variant="outline" className="w-full" size="md">
                                Create an Account
                            </Button>
                        </Link>
                    </div>
                </div>

                <p className="text-center text-xs md:text-sm text-muted-foreground mt-6">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
