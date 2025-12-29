import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createHostel } from '../api/hostels';
import Input from '../components/Input';
import Button from '../components/Button';
import type { Hostel } from '../types';

type HostelFormData = Omit<Hostel, 'ID' | 'Images' | 'average_rating' | 'OwnerID'>;

const CreateHostelPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<HostelFormData>();

    const onSubmit = async (data: HostelFormData) => {
        try {
            // Ensure Price is a number
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
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Create New Listing</h1>

            <div className="glass p-8 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Hostel Name"
                        placeholder="e.g. Sunny Size Student Home"
                        {...register('Name', { required: 'Name is required' })}
                        error={errors.Name?.message}
                    />

                    <Input
                        label="Location"
                        placeholder="e.g. 123 University Ave"
                        {...register('Location', { required: 'Location is required' })}
                        error={errors.Location?.message}
                    />

                    <Input
                        label="Monthly Price ($)"
                        type="number"
                        placeholder="e.g. 350"
                        {...register('Price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
                        error={errors.Price?.message}
                    />

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                        <textarea
                            className="w-full px-4 py-2 bg-background/50 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground min-h-[150px]"
                            placeholder="Describe amenities, rules, and vibe..."
                            {...register('Description', { required: 'Description is required' })}
                        ></textarea>
                        {errors.Description && <p className="text-sm text-destructive">{errors.Description.message}</p>}
                    </div>

                    {errors.root && (
                        <div className="text-red-500 text-sm text-center">{errors.root.message}</div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => navigate('/dashboard')} className="w-full">Cancel</Button>
                        <Button type="submit" isLoading={isSubmitting} className="w-full">Create Listing</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateHostelPage;
