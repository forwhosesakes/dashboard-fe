import type { DashboardType } from "~/lib/api/dashboard";
import CorporateDashboard from "./CorporateDashboard";
import OperationalIndicator from "./OperationalIndicators"
import FinancialDashboard from "./FinancialDashboard";
import GeneralDashboard from "./GeneralDashboard";

interface IProps {
  indicators: any;
  type: DashboardType;
  isFullscreen:boolean;
  role:string;
  logoUrl:string;
}

const DashboardIndicators = (props: IProps) => {
  switch (props.type) {
    case "OPERATIONAL":
      return  <OperationalIndicator logoUrl={props.logoUrl}  role={props.role} indicators={props.indicators}/>

    case "GENERAL":
      return <GeneralDashboard logoUrl={props.logoUrl} role={props.role}  indicators={props.indicators} category={""}/>
    case "FINANCIAL":
      return <FinancialDashboard logoUrl={props.logoUrl} role={props.role} indicators={props.indicators} />
    case "CORPORATE":
      return (
        <CorporateDashboard logoUrl={props.logoUrl} role={props.role}  indicators={props.indicators}>
          {" "}
          CORPORATE dashboard indicators{" "}
        </CorporateDashboard>
      );
    default:
      break;
  }
};

export default DashboardIndicators;
