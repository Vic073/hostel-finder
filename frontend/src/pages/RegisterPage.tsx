import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import type { RegisterCredentials } from '../types';

const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterCredentials>();

    const onSubmit = async (data: RegisterCredentials) => {
        try {
            await registerUser(data);
            navigate('/dashboard');
        } catch (error: any) {
            console.error(error);
            setError('root', {
                type: 'manual',
                message: error.response?.data?.error || 'Registration failed. Please try again.'
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-6 glass rounded-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Create Account
                    </h1>
                    <p className="mt-2 text-muted-foreground">Join HostelFinder today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        {...register('name', { required: 'Name is required' })}
                        error={errors.name?.message}
                    />
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
                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        error={errors.password?.message}
                    />

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground mb-1">I am a...</label>
                        <div className="flex gap-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="student"
                                    {...register('role', { required: 'Role is required' })}
                                    className="accent-primary"
                                />
                                <span>Student</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="owner"
                                    {...register('role', { required: 'Role is required' })}
                                    className="accent-primary"
                                />
                                <span>Owner</span>
                            </label>
                        </div>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>

                    {errors.root && (
                        <div className="text-red-500 text-sm text-center">{errors.root.message}</div>
                    )}

                    <Button type="submit" className="w-full" isLoading={isSubmitting}>
                        Register
                    </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
