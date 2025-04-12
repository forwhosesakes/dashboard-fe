import type { DashboardType } from "~/lib/api/dashboard";
import CorporateDashboard from "./CorporateDashboard";
import OperationalIndicator from "./OperationalIndicators"
import FinancialDashboard from "./FinancialDashboard";
import GeneralDashboard from "./GeneralDashboard";
import GovernanceDashboard from "./GovernanceDashboard";

interface IProps {
  indicators: any;
  type: DashboardType |"GOVERNANCE";
  isFullscreen:boolean;
  role:string;
  logoUrl:string;
}

const DashboardIndicators = (props: IProps) => {
  switch (props.type) {
    case "OPERATIONAL":
      return  <OperationalIndicator isFullscreen={props.isFullscreen} logoUrl={props.logoUrl}  role={props.role} indicators={props.indicators}/>

    case "GENERAL":
      return <GeneralDashboard isFullscreen={props.isFullscreen} logoUrl={props.logoUrl} role={props.role}  indicators={props.indicators} category={""}/>
    case "FINANCIAL":
      return <FinancialDashboard isFullscreen={props.isFullscreen} logoUrl={props.logoUrl} role={props.role} indicators={props.indicators} />
    case "CORPORATE":
      return (
        <CorporateDashboard isFullscreen={props.isFullscreen} logoUrl={props.logoUrl} role={props.role}  indicators={props.indicators}>
          {" "}
          CORPORATE dashboard indicators{" "}
        </CorporateDashboard>
      );
      case "GOVERNANCE":
        return <GovernanceDashboard isFullscreen={props.isFullscreen} logoUrl={props.logoUrl} role={props.role} indicators={props.indicators}/>

    default:
      break;
  }
};

export default DashboardIndicators;
