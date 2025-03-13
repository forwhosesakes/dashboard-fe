import { indicatorsLabels } from "../constants/glossary";

import React, { useEffect } from "react";
import {

  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Progress } from "~/components/ui/progress";
import SemiCircleProgress from "~/components/ui/semi-circle-progress";
import PercentageCircle from "~/components/percentage-circle";
import UnderConstructionCard from "~/components/ui/under-construction";

interface IProps {
  indicators: any;
  children: React.ReactNode;
}

const CorporateDashboard = (props: IProps) => {
 
  useEffect(() => {
    console.log(props);
  });
  const hrInds = ["EMP_PERF_PROD", "EMP_DEV_TRAIN"];
  const piechartData = [
    { name: "EMP_PERF_PROD", value: props.indicators["EMP_PERF_PROD"] },
    { name: "EMP_DEV_TRAIN", value: props.indicators["EMP_DEV_TRAIN"] },
  ];
  const hrColors = {
    EMP_PERF_PROD: {
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    EMP_DEV_TRAIN: {
      gradientStart: "#36F097",
      gradientEnd: "#36F097",
    },
  };
  const ceoPerfIndicators = [
    {
      key: "OPERATIONAL_PLAN_ACHIVMENT_GOALS",
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      key: "FOLLOWUP_BOARD_DECISION",
      gradientStart: "#725CFA",
      gradientEnd: "#EF7BE3",
    },
    {
      key: "FOLLOWUP_EMPS_PERF",
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
    {
      key: "DAILY_OPS_MGMT",
      gradientStart: "#36F097",
      gradientEnd: "#36F097",
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
      gradientStart: "#725CFA",
      gradientEnd: "#EF7BE3",
    },
    {
      key: "DIRECT_MANAGER_EVALUATION",
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
  ]

  

  const satisInds = [
    {
      id: "BENEF_SATIS_MEASURMENT",
      value: Number(props.indicators.BENEF_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.BENEF_SATIS_MEASURMENT,
      fill: "#EF7BE3",
      justify: true,
      size: 150,
    },
    {
      id: "EMP_SATIS_MEASURMENT",
      value: Number(props.indicators.EMP_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.EMP_SATIS_MEASURMENT,
      fill: "#FF5A5A",
      justify: false,
      size: 120,
    },
    {
      id: "PARTENERS_SATIS_MEASURMENT",
      value: Number(props.indicators.PARTENERS_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.PARTENERS_SATIS_MEASURMENT,
      fill: "#725CFA",
      justify: true,
      size: 100,
    },
    {
      id: "VOLUN_SATIS_MEASURMENT",
      value: Number(props.indicators.VOLUN_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.VOLUN_SATIS_MEASURMENT,
      fill: "#FBE947",
      justify: false,
      size: 150,
    },
    {
      id: "DONATORS_SATIS_MEASURMENT",
      value: Number(props.indicators.DONATORS_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.DONATORS_SATIS_MEASURMENT,
      fill: "orange",
      justify: true,
      size: 120,
    },
    {
      id: "ADMIN_ORG_SATIS_MEASURMENT",
      value: Number(props.indicators.ADMIN_ORG_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.ADMIN_ORG_SATIS_MEASURMENT,
      fill: "#063970",
      justify: false,
      size: 100,
    },
    {
      id: "COMMUNITY_SATIS_MEASURMENT",
      value: Number(props.indicators.COMMUNITY_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.COMMUNITY_SATIS_MEASURMENT,
      fill: "#873e23",
      justify: true,
      size: 150,
    },
  ];

  return (
    <section className="px-24">
      <div className="flex mb-5 gap-10">
        {/* right side */}
        <div className="flex flex-col gap-5 w-[60%]">
          {/* <div className="flex flex-wrap gap-5 w-full justify-between rounded-lg bg-[#13161B] p-2">
            <h4 className="w-full text-lg xl:text-3xl font-bold">{"الحوكمة"}</h4>
          </div> */}

          {/* <div className="flex flex-wrap gap-8">
            {cardsInds.map((card: string) => (
              <div
                key={card}
                className="flex flex-col justify-center items-center p-1 border-b-2 border-accent min-w-44 w-[30%] gap-1 shadow-custom "
              >
                <h6 className="text-lg xl:text-xl font-bold text-[#94979C]">
                  {
                    //@ts-ignore
                    indicatorsLabels.CORPORATE[card]
                  }
                </h6>

                <div className="flex justify-center items-center gap-4">
                  <h5 className="text-2xl font-bold">
                    {Number(props.indicators[card]).toFixed(2) + "%"}
                  </h5>
                  <div className="border p-0.5 font-medium text-sm flex justify-center items-center gap-1 rounded-lg">
                    {" "}
                    {"آخر ثلاث شهور"}
                    <TrendingUp className="w-4 text-green-600" />{" "}
                  </div>
                </div>

              </div>
            ))}
          </div> */}

          {/* التخطيط والتنظيم  -  الموارد البشرية */}
          <div className="flex gap-10">
            <div className="w-full flex flex-col">
              <div className="flex flex-wrap gap-5 w-full justify-between rounded-lg bg-[#13161B] p-2">
                <h4 className="w-full flex justify-between  text-lg xl:text-3xl font-bold">
                  <span>
                  {"الأداء الوظيفي "}

                  </span>
                  <span>{Math.round(Number(props.indicators.EMPLOYMENT_PERFORMANCE))}%</span>
                </h4>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-5 my-4">
                {empPerformance.map((card) => (
                  <div className="border flex flex-col rounded-lg p-3 min-w-[45%]  gap-2">
                    {  props.indicators[card.key]==null || props.indicators[card.key] == "NaN" ?   <UnderConstructionCard/>:<> <h5 className="text-xl font-bold text-[#94979C]">
                      {indicatorsLabels.CORPORATE[card.key as keyof typeof indicatorsLabels.CORPORATE]}
                    </h5>
                    <h5 className="text-2xl font-bold">
                      {Math.round(props.indicators[card.key])}%
                    </h5>
                    <Progress
                      className="[&>div]:bg-gradient-to-r [&>div]:from-green-800 [&>div]:to-green-500 w-full h-2.5 bg-gray-700"
                      value={Math.round(Number(props.indicators[card.key]))}
                    /></>}
                   
                  </div>
                ))}
              </div>
            </div>

        
          </div>
        </div>

        {/* أداء المدير التنفيذي */}
        <div className="flex flex-wrap gap-5 justify-center items-center w-[40%] h-full">
          <div className="flex gap-5 w-full rounded-lg bg-[#13161B] p-2">
            <h4 className="w-full flex justify-between  text-lg xl:text-3xl font-bold">
              <span>
              {"أداء المدير التنفيذي"}

              </span>
              
              <span>{
              
              Math.round(Number(props.indicators.CEO_PERFORMANCE))}%</span>
            </h4>
          </div>
          <div>
            <div className="flex justify-center flex-wrap gap-y-16 gap-x-3">
              {ceoPerfIndicators.map((card) => (
                <div
                  key={card.key}
                  className="border rounded-lg p-5 w-[48%] flex flex-col justify-center text-center items-center gap-7"
                >
                  {
                    props.indicators[card.key] ?   <>
                    <p className="text-[#94979C] font-bold text-xl">{indicatorsLabels.CORPORATE[card.key as keyof typeof indicatorsLabels.CORPORATE]}</p>
   
                     <SemiCircleProgress
                       size={120}
                       percentage={Math.round(Number(props.indicators[card.key]))}
                       color={card.gradientStart}
                     />
                    
                    </>  :<UnderConstructionCard/>
                  }
              
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-wrap mb-5 gap-5 w-full justify-between rounded-lg bg-[#13161B] p-2">
          <h4 className="w-full text-lg xl:text-3xl font-bold">{"قياس رضا المستفيدين"}</h4>
        </div>
        <div className="h-60 flex justify-between w-10/12 xl:place-self-center place-self-start">
          {satisInds.map((indicator) => (
            
            
            <div
              className={`h-full w-fit flex flex-col items-center ${
                indicator.justify ? "justify-start" : "justify-end"
              } `}
            >
              <PercentageCircle
                startColor={indicator.fill}
                size={indicator.size}
                value={Math.round(Number(props.indicators[indicator.id]))}
              />
              <div className="text-wrap text-[#94979C] max-w-40 text-center">
              {indicator.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p className="label font-bold">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">
          {
            //@ts-ignore
            indicatorsLabels.FINANCIAL[label]
          }
        </p>
      </div>
    );
  }

  return null;
};
export default CorporateDashboard;
