export default function ErrorMessage({ message = "Something went wrong.", onRetry }) {
	return (
		<div className="error-message card" role="alert">
			<span className="error-icon" aria-hidden="true">!</span>
			<div>
				<h3>We couldn’t load this right now</h3>
				<p>{message}</p>
			</div>
			{onRetry && <button className="btn btn-ghost" type="button" onClick={onRetry}>Try again</button>}
		</div>
	);
}
