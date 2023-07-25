import Link from "next/link"
// FILL BUTTON
export const FillBtn = ({href,text,addclass})=>{
    return (
        <Link href={href} className={"fill "+ addclass}>
            {text}
        </Link>
    )
}

// NO FILL BUTTON
export const NoFillBtn = ({href,text,addclass})=>{
    return (
        <Link href={href} className={"nofill "+ addclass}>
            {text}
        </Link>
    )
}