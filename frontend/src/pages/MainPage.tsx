
import {Link as NavLink } from "react-router-dom";

import {Link, List} from "@telegram-apps/telegram-ui";



const MainPage = () => {

	return(
		<List>
			<div>
				<NavLink to={"/list"}>
					<Link>
						Lista
					</Link>
				</NavLink>
			</div>
			<div>
				<NavLink to={"/new"}>
					<Link>
						Nuovo film
					</Link>
				</NavLink>
			</div>
		</List>
	)
}

export {MainPage}