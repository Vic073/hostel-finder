import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createHostel } from '../api/hostels';
import Input from '../components/Input';
import Button from '../components/Button';
import { Home as HomeIcon, ArrowLeft } from 'lucide-react';
import type { Hostel } from '../types';

type HostelFormData = Omit<Hostel, 'ID' | 'Images' | 'average_rating' | 'OwnerID'>;

const CreateHostelPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<HostelFormData>();

    const onSubmit = async (data: HostelFormData) => {
        try {
            const payload = { ...data, Price: Number(data.Price) };
            await createHostel(payload);
            navigate('/dashboard');
        } catch (error: any) {
            console.error(error);
            setError('root', {
                type: 'manual',
                message: error.response?.data?.error || 'Failed to create hostel.'
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="mb-4 -ml-2"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </Button>

            <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <HomeIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Create New Listing
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">List your property to thousands of students</p>
                    </div>
                </div>
            </div>

            <div className="glass p-5 md:p-8 rounded-xl md:rounded-2xl border border-white/10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Hostel Name"
                        placeholder="e.g. Sunny Side Student Home"
                        {...register('Name', { 
                            required: 'Name is required',
                            minLength: {
                                value: 3,
                                message: 'Name must be at least 3 characters'
                            }
                        })}
                        error={errors.Name?.message}
                    />

                    <Input
                        label="Location"
                        placeholder="e.g. 123 University Ave, Campus District"
                        {...register('Location', { 
                            required: 'Location is required',
                            minLength: {
                                value: 5,
                                message: 'Please provide a detailed location'
                            }
                        })}
                        error={errors.Location?.message}
                    />

                    <Input
                        label="Monthly Price ($)"
                        type="number"
                        placeholder="e.g. 350"
                        {...register('Price', { 
                            required: 'Price is required', 
                            min: { value: 1, message: 'Price must be greater than 0' },
                            max: { value: 10000, message: 'Price seems too high' }
                        })}
                        error={errors.Price?.message}
                    />

                    <div className="space-y-2">
                        <label className="block text-sm md:text-sm font-medium text-foreground">
                            Description
                        </label>
                        <textarea
                            className="w-full px-4 py-3 md:py-2 text-base md:text-sm bg-background/50 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground min-h-[150px] md:min-h-[180px] resize-none"
                            placeholder="Describe your hostel... Include amenities, rules, nearby facilities, and what makes it special for students."
                            {...register('Description', { 
                                required: 'Description is required',
                                minLength: {
                                    value: 20,
                                    message: 'Description must be at least 20 characters'
                                }
                            })}
                        ></textarea>
                        {errors.Description && <p className="text-sm text-destructive mt-2">{errors.Description.message}</p>}
                        <p className="text-xs text-muted-foreground">
                            Tip: Include details about WiFi, security, parking, and proximity to campus
                        </p>
                    </div>

                    {errors.root && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                            <p className="text-destructive text-sm text-center">{errors.root.message}</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => navigate('/dashboard')} 
                            className="w-full order-2 sm:order-1"
                            size="lg"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            isLoading={isSubmitting} 
                            className="w-full order-1 sm:order-2"
                            size="lg"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Listing'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateHostelPage;
