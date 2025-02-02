import type { DashboardType } from "~/lib/api/dashboard";
import CorporateDashboard from "./CorporateDashboard";
import OperationalIndicator from "./OperationalIndicators"

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
      return <h2> FINANCIAL dashboard indicators </h2>;

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
