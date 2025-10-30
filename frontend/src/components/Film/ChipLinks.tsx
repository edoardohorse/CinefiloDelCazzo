import {Chip, Text} from "@telegram-apps/telegram-ui";
import {Icon16Cancel} from "@telegram-apps/telegram-ui/dist/icons/16/cancel";
import {getHostName} from "@/utils/stringFormatter";

type TChipLinksProps = {
    links: Array<string>;
    onDelete?: (link: string)=>void
}

export const ChipLinks = ({links, onDelete}:TChipLinksProps) => {

    const hasDelete = onDelete !== undefined;


    return (
        <>
        {links.map((link) => (
            <Chip key={link} mode="elevated" after={hasDelete && <Icon16Cancel onClick={()=>{ onDelete && onDelete(link)}} />}>
                <Text onClick={()=>window.open(link, "_blank")}>{getHostName(link)}</Text>
            </Chip>
        ))}
        </>
    )
}