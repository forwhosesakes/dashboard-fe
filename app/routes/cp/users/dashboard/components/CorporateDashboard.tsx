import { indicatorsLabels } from "../constants/glossary";
import ChartProgress from "~/assets/icons/chart-progress.svg?react";
import PlanOrgIcon from "~/assets/icons/plan-org.svg?react";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SemiCircleProgressBar from "~/components/ui/half-circular-progress";
import { Progress } from "~/components/ui/progress";
import { TrendingUp } from "lucide-react";
import SemiCircleProgress from "~/components/ui/semi-circle-progress";

interface IProps {
  indicators: any;
  children: React.ReactNode;
}

const CorporateDashboard = (props: IProps) => {
  const cardsInds = [
    "FINANCIAL_SAFETY_PRACTICES",
    "TRANSPARENCY_DISCLOSURE_PRACTICES",
    "COMPLIANCE_ADHERENCE_PRACTICES",
    "GOVERANCE",
  ];

  const hrInds = ["EMP_PERF_PROD", "EMP_DEV_TRAIN"];
  const ceoPerfIndicators = [
    {
      key: "OPERATIONAL_PLAN_ACHIVMENT_GOALS",
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      key: "ENTERPRISE_COMMUN",
      gradientStart: "#725CFA",
      gradientEnd: "#EF7BE3",
    },
    {
      key: "OPERATIONAL_PERF",
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
    {
      key: "EXEC_LEADERSHIP",
      gradientStart: "#36F097",
      gradientEnd: "#36F097",
    },
  ];

  const orgPlanCards = [
    "PLANNING_ORGANIZING",
    "FOLLOWUP_OPERATIONAL_PLAN",
    "QUALITY_OPERATIONAL_PLAN",
  ];
  const satisInds = [
    {
      value: Number(props.indicators.BENEF_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.BENEF_SATIS_MEASURMENT,
      fill: "url(#paint0_linear_857_15912)",
    },
    {
      value: Number(props.indicators.EMP_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.EMP_SATIS_MEASURMENT,
      fill: "url(#paint0_linear_857_15917)",
    },
    {
      value: Number(props.indicators.PARTENERS_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.PARTENERS_SATIS_MEASURMENT,
      fill: "url(#paint0_linear_857_15907)",
    },
    {
      value: Number(props.indicators.VOLUN_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.VOLUN_SATIS_MEASURMENT,
      fill: "url(#paint0_linear_857_15897)",
    },
    {
      value: Number(props.indicators.DONATORS_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.DONATORS_SATIS_MEASURMENT,
      fill: "url(#paint0_linear_857_15892)",
    },
    {
      value: Number(props.indicators.ADMIN_ORG_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.ADMIN_ORG_SATIS_MEASURMENT,
      fill: "url(#paint0_linear_857_15912)",
    },
    {
      value: Number(props.indicators.COMMUNITY_SATIS_MEASURMENT).toFixed(2),
      name: indicatorsLabels.CORPORATE.COMMUNITY_SATIS_MEASURMENT,
      fill: "url(#paint0_linear_857_15917)",
    },
  ];

  return (
    <section>
      <div className="flex my-5 gap-5">
        {/* right side */}
        <div className="flex flex-col gap-5 w-8/12">
          <div className="flex flex-wrap gap-5 w-full justify-between rounded-lg bg-[#13161B] p-1">
            <h4 className="w-full">{"الحوكمة"}</h4>
          </div>

          <div className="flex flex-wrap gap-5">
            {cardsInds.map((card: string) => (
              <div
                key={card}
                className="relative flex flex-col justify-center items-center p-1 border-b-2 border-accent min-w-44 w-3/12 gap-1 shadow-custom "
              >
                <h6 className="text-[18px] text-[#94979C]">
                  {
                    //@ts-ignore
                    indicatorsLabels.CORPORATE[card]
                  }
                </h6>

                <div className="flex justify-center items-center gap-1">
                  <h5 className="text-">
                    {Number(props.indicators[card]).toFixed(2) + "%"}
                  </h5>
                  <div className="border p-0.5 flex justify-center items-center gap-1 text-xs rounded-lg">
                    {" "}
                    {"آخر ثلاث شهور"}
                    <TrendingUp className="w-4 text-green-600" />{" "}
                  </div>
                </div>

                {/* <ChartProgress className="absolute w-20 h-20 left-4 bottom-0" /> */}
              </div>
            ))}
          </div>
          {/* التخطيط والتنظيم  -  الموارد البشرية */}
          <div className="flex gap-5">
            <div className="w-3/5 flex flex-col">
              <div className="flex flex-wrap gap-5 w-full justify-between rounded-lg bg-[#13161B] p-1">
                <h4 className="w-full">{"التخطيط والتنظيم"}</h4>
              </div>

            </div>

            <div className="w-2/5 flex flex-col">
              <div className="flex flex-wrap gap-5 w-full justify-between rounded-lg bg-[#13161B] p-1">
                <h4 className="w-full">{"الموارد البشرية"}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* أداء المدير التنفيذي */}
        <div className="flex flex-wrap gap-5 justify-center items-center w-4/12">
          <div className="flex gap-5 w-full rounded-lg bg-[#13161B] p-1">
            <h4 className="w-full">{"أداء المدير التنفيذي"}</h4>
          </div>
          <div>
            <div className="flex justify-center flex-wrap gap-y-16 gap-x-3">
              {ceoPerfIndicators.map((card) => (
                <div
                  key={card.key}
                  className="border rounded-lg p-5 w-5/12 flex flex-col justify-center text-center items-center gap-2"
                >
                  <p>{indicatorsLabels.CORPORATE[card.key]}</p>

                  <SemiCircleProgress  size={120} percentage={86} color={card.gradientStart} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className=" rounded-lg p-8 flex-wrap gap-5  bg-[#13161B]  h-[550px] w-1/2 my-5">
          <h5 className="mb-4">قياس الرضا</h5>

          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              width={800}
              height={400}
              data={satisInds}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="paint0_linear_857_15912"
                  x1="19.4768"
                  y1="144"
                  x2="19.4768"
                  y2="90"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#1882FF" />
                  <stop offset="1" stop-color="#36EBCA" />
                </linearGradient>

                <linearGradient
                  id="paint0_linear_857_15917"
                  x1="32"
                  y1="97.2632"
                  x2="8.34548"
                  y2="97.2632"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#36F097" />
                  <stop offset="1" stop-color="#36F097" stop-opacity="0.2" />
                </linearGradient>

                <linearGradient
                  id="paint0_linear_857_15907"
                  x1="0"
                  y1="71.5"
                  x2="32"
                  y2="71.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#EF7BE3" />
                  <stop offset="1" stop-color="#FF5A5A" />
                </linearGradient>

                <linearGradient
                  id="paint0_linear_857_15897"
                  x1="16.6957"
                  y1="88"
                  x2="16.6957"
                  y2="55"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FBE947" />
                  <stop offset="1" stop-color="#58D764" />
                </linearGradient>

                <linearGradient
                  id="paint0_linear_857_15892"
                  x1="0.5"
                  y1="123.5"
                  x2="32.5"
                  y2="123.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#725CFA" />
                  <stop offset="1" stop-color="#EF7BE3" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                label={"القيمة"}
                wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                formatter={function (total) {
                  return `${total}`;
                }}
              />

              <Bar
                dataKey="value"
                barSize={10}
                width={5}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex my-5 min-h-96 w-1/2 gap-4  bg-[#13161B] rounded-lg p-5  flex-col">
          <h5 className="mb-4">{"الموارد البشرية"}</h5>
          {hrInds.map((card) => (
            <div
              key={card}
              className="relative flex flex-col p-5 border border-[#5C626D] rounded-lg min-w-64 h-44 gap-5 shadow-custom"
            >
              <h6 className="text-[16px]">
                {
                  //@ts-ignore
                  indicatorsLabels.CORPORATE[card]
                }
              </h6>

              <h4 className="text-">
                {Number(props.indicators[card]).toFixed(2) + "%"}
              </h4>
              <Progress
                className="[&>div]:bg-gradient-to-r [&>div]:from-green-900 [&>div]:to-green-300 w-full h-2.5 bg-gray-700"
                value={Math.round(Number(props.indicators[card]))}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex my-5 gap-4">
        <div className=" bg-[#13161B] my-5 p-5 rounded-lg  ">
          <h5 className="my-5">{"التخطيط والتنظيم"}</h5>
          <div className="flex flex-col gap-8">
            {orgPlanCards.map((card: string) => (
              <div
                key={card}
                className="relative flex flex-col p-5 border border-[#5C626D] rounded-lg min-w-96 h-32 gap-5 shadow-custom"
              >
                <h6 className="text-[16px]">
                  {
                    //@ts-ignore
                    indicatorsLabels.CORPORATE[card]
                  }
                </h6>

                <h4 className="text-">
                  {Number(props.indicators[card]).toFixed(2) + "%"}
                </h4>
                <PlanOrgIcon className="absolute left-4 bottom-4" />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="bg-[#13161B] my-5 p-5 rounded-lg">
          <h5 className="my-5">{" أداء المدير التنفيذي"}</h5>
          <div className="flex flex-wrap gap-4">
            {ceoPerfIndicators.map((card) => (
              <div
                key={card.key}
                className="relative flex flex-col p-5 border border-[#5C626D] rounded-lg min-w-80  gap-5 shadow-custom"
              >
                <h6 className="text-[16px]">
                  {
                    //@ts-ignore
                    indicatorsLabels.CORPORATE[card.key]
                  }
                </h6>
                <SemiCircleProgressBar
                  gradientStart={card.gradientStart}
                  gradientEnd={card.gradientEnd}
                  gradientId={card.key + "gradient"}
                  progress={Number(props.indicators[card.key])}
                />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CorporateDashboard;
