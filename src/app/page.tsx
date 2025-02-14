import { TaskForm } from '@/components/shared/forms/TasksForm';
import { NextPage } from 'next';

const Page: NextPage = async () => {
	return (
		<div className='flex items-center justify-center'>
			<TaskForm />
		</div>
	);
};

export default Page;
