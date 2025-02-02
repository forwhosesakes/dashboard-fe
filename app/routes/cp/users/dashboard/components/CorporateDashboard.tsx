interface IProps {
    indicators: any,
    children: React.ReactNode
}
const CorporateDashboard = (props:IProps)=>{





    return <h3>CorporateDashboard: {JSON.stringify(props.indicators)}</h3>
}


export default CorporateDashboard