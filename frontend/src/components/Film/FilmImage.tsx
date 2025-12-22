
type FilmImageProps = {
    src: string | undefined;
    blured?: boolean;
    className?: string;
    classNameBg?: string;
}

export function FilmImage(props: FilmImageProps) {
    return (
        <>
            {props.blured && (
                <img src={`${props.src}`} className={props.classNameBg} alt={'film'}/>
            )}
            <img src={`${props.src}`} className={props.className} alt={'film'}/>
        </>
    )
}