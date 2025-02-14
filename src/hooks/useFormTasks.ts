import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const newHardTaskDto = z.object({
	token: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	tags: z.string().min(1),
	budget_from: z.string().min(1),
	budget_to: z.string().min(1),
	deadline: z.string().min(1),
	reminds: z.string().min(1),
	all_auto_responses: z.boolean(),
	rules: z.string().min(1),
});
export type NewHardTaskDto = z.infer<typeof newHardTaskDto>;

export const useFormTasks = () => {
	return useForm<NewHardTaskDto>({
		resolver: zodResolver(newHardTaskDto),
		defaultValues: {
			token: '',
			title: '',
			description: '',
			tags: '',
			budget_from: '',
			budget_to: '',
			deadline: '',
			reminds: '',
			all_auto_responses: false,
			rules: '',
		},
	});
};
