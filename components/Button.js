import Link from "next/link"
import Image from "next/image"
// FILL BUTTON

const SwitchIcon = (id,nohoversrc,hoversrc,)=>{
    let icon = document.getElementById(`${id}`)
    icon.src = nohoversrc ? nohoversrc : hoversrc
}


export const FillBtn = ({href,text,addclass})=>{
    return (
        <Link href={href} className={"fill "+ addclass} >
            {text}
        </Link>
    );
}

export const FillBLueBtn = ({href,text,addclass})=>{
    return (
        <Link href={href} className={"bluefill "+ addclass} >
            {text}
        </Link>
    );
}

// NO FILL BUTTON
export const NoFillBtn = ({href,text,addclass})=>{
    return (
        <Link href={href} className={"nofill "+ addclass} >
            {text}
        </Link>
    );
}

// Save Button
export const SaveBtn = ({text,action,addclass})=>{
    return (
        <button className={"save "+ addclass} onMouseEnter={()=>{
            SwitchIcon('save',undefined,'/assets/svgs/mark_green.svg')
        }} onMouseLeave={()=>{
            SwitchIcon('save','/assets/svgs/mark.svg',undefined)
        }}onClick={()=>{
            action()
        }}>
            <Image id="save" className="mr-2" width={20} height={14} src={"/assets/svgs/mark.svg"} alt="save button"/>
            {text}
        </button>
    )
}

// Cancel/Delete Button
export const CanDelBtn = ({text,action,addclass})=>{
    return (
        <button className={"cancel "+ addclass} onMouseEnter={()=>{
            SwitchIcon('cancel',undefined,'/assets/svgs/ex_red.svg')
        }}onMouseLeave={()=>{
            SwitchIcon('cancel','/assets/svgs/ex.svg',undefined)
        }} onClick={()=>{
            action()
        }}>
            <Image id="cancel" className="mr-1" width={24} height={22} src={"/assets/svgs/ex.svg"} alt="cancel button"/>
            {text}
        </button>
    )
}

// Normal Button
export const NormalBtn = ({text,action,addclass})=>{
    return (
        <button className={"normal "+ addclass}  onClick={()=>{
            action()
        }}>
            {text}
        </button>
    )
}