import { parseParams } from '@/helpers/url';
import { BaseApi } from './BaseApi';
import { NewHardTaskDto } from '@/hooks/useFormTasks';

class TasksApi extends BaseApi {
	path = 'tasks';

	async newHardTask(params: NewHardTaskDto) {
		const url = new URL(`${this.baseApiUrl}/${this.path}/client/newhardtask`);
		url.search = parseParams(params);
		const res = await fetch(url);
		const data = await res.json();

		if (res.status === 200) {
			return data;
		} else {
			throw new Error(data.error);
		}
	}
}

export const tasksApi = new TasksApi();
