import {Spinner} from "@telegram-apps/telegram-ui";

export const LoadingPage =  ()=>{
	return (
		<div className="page-loading">
			<Spinner size={"l"}/>
		</div>
	)
}