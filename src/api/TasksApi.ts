import { parseParams } from '@/helpers/url';
import { BaseApi } from './BaseApi';
import { NewHardTaskDto } from '@/hooks/useFormTasks';
import { convertToNum } from '@/helpers/converters';

class TasksApi extends BaseApi {
	path = 'tasks';

	async newHardTask(params: NewHardTaskDto) {
		const url = new URL(`${this.baseApiUrl}/${this.path}/client/newhardtask`);

		const { rules, ...otherParams } = params;
		const parsedParams = parseParams(otherParams);
		const rulesParams: Record<string, string | number> = {};
		for (const [key, value] of Object.entries(rules)) {
			rulesParams[key] = convertToNum(value);
		}
		url.search = `${parsedParams}&rules=${encodeURIComponent(JSON.stringify(rulesParams))}`;

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
