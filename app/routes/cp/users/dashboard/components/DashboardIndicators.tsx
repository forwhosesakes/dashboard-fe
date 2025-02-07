import type { DashboardType } from "~/lib/api/dashboard";
import CorporateDashboard from "./CorporateDashboard";
import OperationalIndicator from "./OperationalIndicators"
import FinancialDashboard from "./FinancialDashboard";

interface IProps {
  indicators: any;
  type: DashboardType;
}

const DashboardIndicators = (props: IProps) => {
  switch (props.type) {
    case "OPERATIONAL":
      return  <OperationalIndicator indicators={props.indicators}/>

    case "GENERAL":
      return <h2> GENERAL dashboard indicators </h2>;

    case "FINANCIAL":
      return <FinancialDashboard indicators={props.indicators} />
    case "CORPORATE":
      return (
        <CorporateDashboard indicators={props.indicators}>
          {" "}
          CORPORATE dashboard indicators{" "}
        </CorporateDashboard>
      );
    default:
      break;
  }
};

export default DashboardIndicators;
