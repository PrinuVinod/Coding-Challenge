import { Form, useActionData, useLoaderData } from "@remix-run/react"

import { storeData, getData } from "../data/savedata"

export default function LoginPage() {
	const response = useActionData()
	const data = useLoaderData()
	return (
		<div>
			<span>{response ? response.message : ""}</span>
			<Form method="post">
				<div>
					<label htmlFor="task">Task:</label>
					<input type="text" id="task" name="task" required />
				</div>
				<div>
					<label htmlFor="details">Details:</label>
					<textarea name="details" id="details" />
				</div>
				<div>
					<button type="submit">Add Task</button>
				</div>
			</Form>
			<ul>
				{data.map((item) => (
					<li key={item.task}>
						<div>{item.task}</div>
						<div>{item.details}</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export async function loader() {
	const data = await getData()
	return data
}

export async function action(data) {
	const formData = await data.request.formData()

	const taskData = {
		task: formData.get("task"),
		details: formData.get("details"),
	}

	await storeData(taskData)
	return {
		status: "ok",
		message: "Record saved",
	}
}
