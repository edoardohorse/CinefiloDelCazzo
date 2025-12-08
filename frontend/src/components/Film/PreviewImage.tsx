import "@/css/image.css"
import {Icon24Close} from "@telegram-apps/telegram-ui/dist/icons/24/close";
import {IconButton} from "@telegram-apps/telegram-ui";

type PreviewImageProps = {
	uri:Blob,
	onErase: ()=>void
}

export const PreviewImage = ({uri, onErase} : PreviewImageProps )=>{
	return (
		<div className="preview-image-wrapper">
			<img src={uri} alt="film" className="preview-image"/>
			<IconButton  className={"preview-image-btn"} onClick={onErase}>
				<Icon24Close/>
			</IconButton>
		</div>
	)
}