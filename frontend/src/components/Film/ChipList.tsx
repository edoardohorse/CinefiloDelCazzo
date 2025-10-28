import {Icon16Cancel} from "@telegram-apps/telegram-ui/dist/icons/16/cancel";
import {Chip, Textarea, Text} from "@telegram-apps/telegram-ui";

type TChipLinksProps = {
    links: Array<string>;
    setLinks: (links: Array<string>) => void;
}

function getHostName(link: string){
    return (new URL(link)).hostname;
}

export const ChipLinks = (props: TChipLinksProps)=>{

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
                {props.links.map((link) => (
                    <Chip key={link} mode="elevated" after={<Icon16Cancel
                        onClick={()=>{onDelete(link)}} />}>
                        <Text onClick={()=>window.open(link, "_blank")}>{getHostName(link)}</Text>
                    </Chip>
                ))
                }
            </div>

        </div>
    )
}
