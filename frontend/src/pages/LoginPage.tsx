import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
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
            navigate('/dashboard'); // or home
        } catch (error: any) {
            console.error(error);
            setError('root', {
                type: 'manual',
                message: error.response?.data?.error || 'Login failed. Please check your credentials.'
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-6 glass rounded-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-muted-foreground">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email', { required: 'Email is required' })}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password', { required: 'Password is required' })}
                        error={errors.password?.message}
                    />

                    {errors.root && (
                        <div className="text-red-500 text-sm text-center">{errors.root.message}</div>
                    )}

                    <Button type="submit" className="w-full" isLoading={isSubmitting}>
                        Sign In
                    </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
