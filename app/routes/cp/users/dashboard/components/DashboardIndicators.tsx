import type { DashboardType } from "~/lib/api/dashboard";
import CorporateDashboard from "./CorporateDashboard";
import OperationalIndicator from "./OperationalIndicators"
import FinancialDashboard from "./FinancialDashboard";
import GeneralDashboard from "./GeneralDashboard";

interface IProps {
  indicators: any;
  type: DashboardType;
  isFullscreen:boolean
}

const DashboardIndicators = (props: IProps) => {
  switch (props.type) {
    case "OPERATIONAL":
      return  <OperationalIndicator   indicators={props.indicators}/>

    case "GENERAL":
      return <GeneralDashboard  indicators={props.indicators} category={""}/>
    case "FINANCIAL":
      return <FinancialDashboard indicators={props.indicators} />
    case "CORPORATE":
      return (
        <CorporateDashboard isFullscreen={props.isFullscreen} indicators={props.indicators}>
          {" "}
          CORPORATE dashboard indicators{" "}
        </CorporateDashboard>
      );
    default:
      break;
  }
};

export default DashboardIndicators;
