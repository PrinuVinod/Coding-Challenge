import demoStyles from "../styles/demo.css"

export default function Demo() {
	return (
		<div className="container">
			<h1>This is a demo!</h1>
		</div>
	)
}

export function links() {
	return [{ rel: "stylesheet", href: demoStyles }]
}
