import { indicatorsLabels } from "../constants/glossary";

import React from "react";
import { Progress } from "~/components/ui/progress";
import UnderConstructionCard from "~/components/ui/under-construction";
import GradientText from "~/components/gardient-text";
import { TrendingUp } from "lucide-react";
import RatingsGraph from "~/components/ratings-graph";
import { useSidebarStore } from "~/lib/store/sidebar-store";

interface IProps {
  indicators: any;
  children: React.ReactNode;
  role: string;
  logoUrl:string;
  isFullscreen:boolean;
}

const CorporateDashboard = (props: IProps) => {

  const firstRowMainIndicators = [
    {
      key: "EMPLOYMENT_PERFORMANCE",
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      key: "CEO_PERFORMANCE",
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },

  ];


  const empPerformance = [
    {
      key: "EMP_PERF_AND_PROD",
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      key: "EMP_COMMITMENT",
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      key: "DIRECT_MANAGER_EVALUATION",
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",

    },
    {
      key:"EMP_TRAINING_INDICATOR",
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      key: "FOLLOWUP_BOARD_DECISION",
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
    {
      key: "FOLLOWUP_EMPS_PERF",
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
    //TODO: REPLACE THIS WITH  BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE LATER 
    {
      key: "DAILY_OPS_MGMT",
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
  {
    key:"OPERATIONAL_PLAN_ACHIVMENT_GOALS",
    gradientStart: "#1882FF",
    gradientEnd: "#36EBCA",
  }
  ];

  const satisInds = [
    {
      id: "BENEF_SATIS_MEASURMENT",
      percentage: Math.ceil(props.indicators.BENEF_SATIS_MEASURMENT),
      label: indicatorsLabels.CORPORATE.BENEF_SATIS_MEASURMENT,
    },
    {
      id: "EMP_SATIS_MEASURMENT",
      percentage: Math.ceil(props.indicators.EMP_SATIS_MEASURMENT),
      label: indicatorsLabels.CORPORATE.EMP_SATIS_MEASURMENT,
    },
    {
      id: "PARTENERS_SATIS_MEASURMENT",
      percentage: Math.ceil(props.indicators.PARTENERS_SATIS_MEASURMENT),

      label: indicatorsLabels.CORPORATE.PARTENERS_SATIS_MEASURMENT,
    },
    {
      id: "VOLUN_SATIS_MEASURMENT",
      percentage: Math.ceil(props.indicators.VOLUN_SATIS_MEASURMENT),

      label: indicatorsLabels.CORPORATE.VOLUN_SATIS_MEASURMENT,
    },
    {
      id: "DONATORS_SATIS_MEASURMENT",
      percentage: Math.ceil(props.indicators.DONATORS_SATIS_MEASURMENT),
      label: indicatorsLabels.CORPORATE.DONATORS_SATIS_MEASURMENT,
    },
    {
      id: "ADMIN_ORG_SATIS_MEASURMENT",
      percentage: Math.ceil(props.indicators.ADMIN_ORG_SATIS_MEASURMENT),
      label: indicatorsLabels.CORPORATE.ADMIN_ORG_SATIS_MEASURMENT,
    },
    {
      id: "COMMUNITY_SATIS_MEASURMENT",
      percentage: Math.ceil(props.indicators.COMMUNITY_SATIS_MEASURMENT),
      label: indicatorsLabels.CORPORATE.COMMUNITY_SATIS_MEASURMENT,
    },
  ];

  return (
    <section className="px-24">
      <div className="flex flex-col gap-y-8">
        <div className="flex mt-12 gap-10">
          <div className="w-full flex items-center  flex-col">
            {(props.role !== "admin" ||props.isFullscreen ) &&
               (
                <div className="flex mb-12 w-full items-center">
                  <div className="flex-1 text-center">
                    <h4 className="text-2xl">لوحة المؤشر المؤسسي</h4>
                  </div>
                  <div className="max-w-[141px]">
                    <img
                      src={props.logoUrl}
                      className="w-full h-auto object-contain max-h-[48px]"
                      alt="organization icon"
                    />
                  </div>
                </div>
              )}

            <div className="flex flex-wrap pl-5 gap-5 w-full justify-between rounded-lg mb-12">
              {firstRowMainIndicators.map((indicator) => (
                <div className="flex-1" key={indicator.key}>
                  <p className="text-base font-bold mb-2">
                    {
                      //@ts-ignore
                      indicatorsLabels.CORPORATE[indicator.key]
                    }
                  </p>

                  <GradientText
                    className="text-5xl"
                    text={`${Number(props.indicators[indicator.key]).toFixed(
                      2
                    )}%`}
                    gradientStart={indicator.gradientStart}
                    gradientEnd={indicator.gradientEnd}
                  />

                  <Progress
                    className=" w-full h-2.5 bg-gray-700"
                    gradientStart={indicator.gradientStart}
                    gradientEnd={indicator.gradientEnd}
                    value={Math.ceil(Number(props.indicators[indicator.key]))} indicatorClassName={""}                  />
                </div>
              ))}
            </div>

<div className="flex  flex-col gap-5 w-full">
  <div className="flex flex-wrap items-center gap-5 w-full">
    {empPerformance.map((card) => (
      <div
        key={card.key}
        className="border-2 border-[#9C9C9C] flex flex-col justify-center items-center  rounded-xl min-h-48 p-3 gap-2"
        style={{ width: "calc(25% - 1.25rem)" }}
      >
      
          <>
            {/* <div className="border w-fit p-1 mb-5 flex justify-center items-center gap-1 text-xs rounded-lg">
              {" "}
              {"آخر ثلاث شهور"}
              <TrendingUp className="w-4 text-green-600" />{" "}
            </div>{" "} */}
            <h5 className="text-base w-full text-center font-bold text-white">
              {
                indicatorsLabels.CORPORATE[
                  card.key as keyof typeof indicatorsLabels.CORPORATE
                ]
              }
            </h5>
            {props.indicators[card.key] == null ||
        props.indicators[card.key] == "NaN" ? (
          <UnderConstructionCard />
        ) :
            <GradientText
              gradientStart={card.gradientStart}
              gradientEnd={card.gradientEnd}
              text={`${Number(props.indicators[card.key]).toFixed(
                1
              )}%`}
              className="text-5xl  w-full text-center font-bold"
            />}
          </>
        
      </div>
    ))}
  </div>


</div>
          </div>
        </div>

        <div className="pl-4">
          <RatingsGraph ratings={satisInds} />
        </div>
      </div>
    </section>
  );
};

export default CorporateDashboard;
