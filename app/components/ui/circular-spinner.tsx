interface IProps {
    size:Size
}


const sizeClassName = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-2',
    lg: 'w-16 h-16 border-2',
    xl: 'w-24 h-24 border-4',
    xl3: 'w-32 h-32 border-4',
    xl4: "w-44 h-44 border-4",
    xl7: "md:w-64 md:h-64 w-24 h-24 border-8",
    fit:"w-fit h-fit"
  } as const
  
  type Size = keyof typeof sizeClassName

const CircularSpinner = (props:IProps)=>{


    return <div className={`${sizeClassName[props.size]} border-primary border-t-transparent rounded-full animate-spin`}></div>
}

export default CircularSpinner