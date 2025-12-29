import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus, GraduationCap, Home as HomeIcon } from 'lucide-react';
import type { RegisterCredentials } from '../types';

const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, watch } = useForm<RegisterCredentials>();

    const selectedRole = watch('role');

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
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-6 md:py-8">
            <div className="w-full max-w-md px-4">
                <div className="glass rounded-2xl p-6 md:p-8 space-y-6 border border-white/10">
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <UserPlus className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Create Account
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">Join HostelFinder today</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            autoComplete="name"
                            {...register('name', { 
                                required: 'Name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters'
                                }
                            })}
                            error={errors.name?.message}
                        />
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
                            placeholder="Create a strong password"
                            autoComplete="new-password"
                            {...register('password', { 
                                required: 'Password is required', 
                                minLength: { 
                                    value: 6, 
                                    message: 'Password must be at least 6 characters' 
                                } 
                            })}
                            error={errors.password?.message}
                        />

                        <div className="space-y-3">
                            <label className="block text-sm md:text-sm font-medium text-foreground">I am a...</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`flex flex-col items-center justify-center p-4 md:p-5 rounded-lg border-2 transition-all cursor-pointer min-h-[100px] ${
                                    selectedRole === 'student' 
                                        ? 'border-primary bg-primary/10' 
                                        : 'border-input hover:border-primary/50 hover:bg-white/5'
                                }`}>
                                    <input
                                        type="radio"
                                        value="student"
                                        {...register('role', { required: 'Role is required' })}
                                        className="sr-only"
                                    />
                                    <GraduationCap className={`w-8 h-8 md:w-10 md:h-10 mb-2 ${selectedRole === 'student' ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <span className={`text-sm md:text-base font-medium ${selectedRole === 'student' ? 'text-primary' : 'text-foreground'}`}>
                                        Student
                                    </span>
                                </label>
                                <label className={`flex flex-col items-center justify-center p-4 md:p-5 rounded-lg border-2 transition-all cursor-pointer min-h-[100px] ${
                                    selectedRole === 'owner' 
                                        ? 'border-primary bg-primary/10' 
                                        : 'border-input hover:border-primary/50 hover:bg-white/5'
                                }`}>
                                    <input
                                        type="radio"
                                        value="owner"
                                        {...register('role', { required: 'Role is required' })}
                                        className="sr-only"
                                    />
                                    <HomeIcon className={`w-8 h-8 md:w-10 md:h-10 mb-2 ${selectedRole === 'owner' ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <span className={`text-sm md:text-base font-medium ${selectedRole === 'owner' ? 'text-primary' : 'text-foreground'}`}>
                                        Owner
                                    </span>
                                </label>
                            </div>
                            {errors.role && (
                                <p className="text-destructive text-sm mt-2">{errors.role.message}</p>
                            )}
                        </div>

                        {errors.root && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                <p className="text-destructive text-sm text-center">{errors.root.message}</p>
                            </div>
                        )}

                        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs md:text-sm">
                            <span className="px-2 bg-background text-muted-foreground">Already have an account?</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to="/login">
                            <Button variant="outline" className="w-full" size="md">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>

                <p className="text-center text-xs md:text-sm text-muted-foreground mt-6">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
