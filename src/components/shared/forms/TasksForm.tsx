'use client';

import React, { useState, useTransition } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { NewHardTaskDto, useFormTasks } from '@/hooks/useFormTasks';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { tasksApi } from '@/api/TasksApi';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { InputMask } from '@/components/ui/InputMask';
import { useHandleError } from '@/hooks/useHandleError';

export const TaskForm: React.FC = () => {
	const [, setToken] = useState('');
	const { toast } = useToast();
	const { handleError } = useHandleError();

	const form = useFormTasks();
	const [isPending, startTransition] = useTransition();
	const handleSubmit = async (values: NewHardTaskDto) => {
		startTransition(async () => {
			try {
				await tasksApi.newHardTask(values);

				toast({
					title: 'Task',
					description: `Task created with token ${values.token}`,
				});

				setToken(values.token);
				form.reset();
			} catch (error) {
				handleError(error);
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='w-full max-w-[32rem] space-y-2 md:space-y-4'>
				<FormField
					control={form.control}
					name='token'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Token</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Textarea {...field} className='min-h-[6rem] resize-none md:min-h-[8rem]' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea {...field} className='min-h-[10rem] resize-none md:min-h-[12rem]' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='tags'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tags</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-2 items-center gap-x-4'>
					<FormField
						control={form.control}
						name='budget_from'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Budget from</FormLabel>
								<FormControl>
									<InputMask {...field} maskOptions={{ mask: Number }} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='budget_to'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Budget to</FormLabel>
								<FormControl>
									<InputMask {...field} maskOptions={{ mask: Number }} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-x-4'>
					<FormField
						control={form.control}
						name='deadline'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Deadline</FormLabel>
								<FormControl>
									<InputMask {...field} maskOptions={{ mask: Number }} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='reminds'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Reminds</FormLabel>
								<FormControl>
									<InputMask {...field} maskOptions={{ mask: Number }} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='rules'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rules</FormLabel>
							<FormControl>
								<Textarea {...field} className='min-h-[6rem] resize-none md:min-h-[8rem]' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='all_auto_responses'
					render={({ field }) => (
						<FormItem className='flex items-center space-y-0'>
							<FormLabel>All auto responses</FormLabel>
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} className='ml-2' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full' disabled={isPending}>
					Submit
				</Button>
			</form>
		</Form>
	);
};
