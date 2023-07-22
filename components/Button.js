
// FILL BUTTON
export const FillBtn = ({text,addclass})=>{
    return (
        <button className={"fill "+ addclass}>
            {text}
        </button>
    )
}

// NO FILL BUTTON
export const NoFillBtn = ({text,addclass})=>{
    return (
        <button className={"nofill "+ addclass}>
            {text}
        </button>
    )
}