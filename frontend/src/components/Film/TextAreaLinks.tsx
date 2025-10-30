
import { Textarea} from "@telegram-apps/telegram-ui";
import {ChipLinks} from "@/components/Film/ChipLinks";

type TTextAreaLinksProps = {
    links: Array<string>;
    setLinks: (links: Array<string>) => void;
}

export const TextAreaLinks = (props: TTextAreaLinksProps)=>{

    const onPaste = async () => {
        const pastedText = await navigator.clipboard.readText();
        if(URL.canParse(pastedText)) {
            const url = new URL(pastedText);
            const temp = props.links
            temp.push(url.href)
            props.setLinks?.(temp);
        }
    }

    const onDelete = (linkToDelete: string)=>{
        const setLinks = new Set(props.links)
        setLinks.delete(linkToDelete);
        props.setLinks(Array.from(setLinks.values()));
    }


    return (
        <div style={{ display:"flex", flexDirection: "column", gap: "1em"}}>
            <Textarea placeholder="Incolla qui i link" onPaste={onPaste} value={""}  />
            <div style={{ display:"flex", flexDirection: "row", gap:"1em", padding: "0 1em"}}>
                <ChipLinks links={props.links} onDelete={onDelete}/>
            </div>

        </div>
    )
}
