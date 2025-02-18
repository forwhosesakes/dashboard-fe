import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { indicatorsLabels } from "../constants/glossary";
import { useEffect, useId, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";
interface IProps {
  indicators: any;
}
const FinancialDashboard = (props: IProps) => {
  useEffect(() => {
    console.log("props", props);
  }, []);
  const finPerfCards = [
    "ADMIN_EXPENSES",
    "PRGRMS_EXPENSES",
    "FINANCIAL_SUSTAIN",
    "ABL_COVER_OBLIG",
    "GENERAL_ADMINSTRATIVE_EXPENSES",
    "DONAT_MONEY_RAISING",
  
  ];

  const finValueThemes = {
    ADMIN_EXPENSES: {
      gradient: "bg-gradient-to-r from-indigo-300 to-blue-500",
      text: "text-transparent bg-clip-text",
    },
    PRGRMS_EXPENSES: {
      gradient: "bg-gradient-to-r from-emerald-300 to-teal-500",
      text: "text-transparent bg-clip-text",
    },
    FINANCIAL_SUSTAIN: {
      gradient: "bg-gradient-to-r from-purple-300 to-violet-500",
      text: "text-transparent bg-clip-text",
    },
    ABL_COVER_OBLIG: {
      gradient: "bg-gradient-to-r from-orange-300 to-amber-500",
      text: "text-transparent bg-clip-text",
    },
    GENERAL_ADMINSTRATIVE_EXPENSES: {
      gradient: "bg-gradient-to-r from-sky-300 to-cyan-500",
      text: "text-transparent bg-clip-text",
    },
    DONAT_MONEY_RAISING: {
      gradient: "bg-gradient-to-r from-rose-300 to-pink-500",
      text: "text-transparent bg-clip-text",
    },
  };

  const finSymbols = {
    GENERAL_ADMINSTRATIVE_EXPENSES: "k",
    PRGRMS_EXPENSES: "k",
  };

  const rawData = [
    {
      id: "EFFECIENT_RESOURCE_MGMT",
      name: indicatorsLabels.FINANCIAL.EFFECIENT_RESOURCE_MGMT,
      value: Math.round(props.indicators.EFFECIENT_RESOURCE_MGMT) % 100,
      timeSeries: [
        { period: "2024-01", value: 5 },
        { period: "2024-02", value: 5 },
        { period: "2024-03", value: 5 },
        { period: "2024-04", value: 5 },
        { period: "2024-05", value: 5 },
      ],
      fill: "#58D764",
    },
    {
      id: "PLATFORM_REV_PERC",
      name: indicatorsLabels.FINANCIAL.PLATFORM_REV_PERC,
      value: Math.round(props.indicators.PLATFORM_REV_PERC) % 100,
      timeSeries: [
        { period: "2024-01", value: 5 },
        { period: "2024-02", value: 5 },
        { period: "2024-03", value: 5 },
        { period: "2024-04", value: 5 },
        { period: "2024-05", value: 5 },
      ],
      fill: "#36EBCA",
    },
    {
      id: "PRGMS_PRJKS_REV",
      name: indicatorsLabels.FINANCIAL.PRGMS_PRJKS_REV,
      value: Math.round(props.indicators.PRGMS_PRJKS_REV) % 100,
      timeSeries: [
        { period: "2024-01", value: 5 },
        { period: "2024-02", value: 5 },
        { period: "2024-03", value: 5 },
        { period: "2024-04", value: 5 },
        { period: "2024-05", value: 5 },
      ],
      fill: "#EF7BE3",
    },
   
    {
      id: "DONAT_PERC",
      name: indicatorsLabels.FINANCIAL.DONAT_PERC,
      value: Math.round(props.indicators.DONAT_PERC) % 100,
      timeSeries: [
        { period: "2024-01", value: 5 },
        { period: "2024-02", value: 5 },
        { period: "2024-03", value: 5 },
        { period: "2024-04", value: 5 },
        { period: "2024-05", value: 5 },
      ],
      fill: "#17b26a",
    },
    {
      id: "TOTAL_TAX_REFUND",
      name: indicatorsLabels.FINANCIAL.TOTAL_TAX_REFUND,
      value: Math.round(props.indicators.TOTAL_TAX_REFUND) % 100,
      timeSeries: [
        { period: "2024-01", value: 5 },
        { period: "2024-02", value: 5 },
        { period: "2024-03", value: 5 },
        { period: "2024-04", value: 5 },
        { period: "2024-05", value: 5 },
      ],
      fill: "#F79099",
    },
    {
      id: "DIVERSITY_INCOME_RESOURCES",
      name: indicatorsLabels.FINANCIAL.DIVERSITY_INCOME_RESOURCES,
      value: Math.round(props.indicators.DIVERSITY_INCOME_RESOURCES) % 100,
      timeSeries: [
        { period: "2024-01", value: 5 },
        { period: "2024-02", value: 5 },
        { period: "2024-03", value: 5 },
        { period: "2024-04", value: 5 },
        { period: "2024-05", value: 5 },
      ],
      fill: "#1882FF",
    },


    
  ];

  const isSingleMonth = false;

  const barchartSingleMonthData = [
    {
      name: indicatorsLabels.FINANCIAL["EFFECIENT_RESOURCE_MGMT"],
      value: Math.round(props.indicators["EFFECIENT_RESOURCE_MGMT"]) % 100,
    },
    {
      name: indicatorsLabels.FINANCIAL["PLATFORM_REV_PERC"],
      value: Math.round(props.indicators["PLATFORM_REV_PERC"]) % 100,
    },
    {
      name: indicatorsLabels.FINANCIAL["PRGMS_PRJKS_REV"],
      value: Math.round(props.indicators["PRGMS_PRJKS_REV"]) % 100,
    },
    {
      name: indicatorsLabels.FINANCIAL["TOTAL_TAX_REFUND"],
      value: Math.round(props.indicators["TOTAL_TAX_REFUND"]) % 100,
    },
    {
      name: indicatorsLabels.FINANCIAL["DONAT_PERC"],
      value: Math.round(props.indicators["DONAT_PERC"]) % 100,
    },
    {
      name: indicatorsLabels.FINANCIAL["DIVERSITY_INCOME_RESOURCES"],
      value: Math.round(props.indicators["DIVERSITY_INCOME_RESOURCES"]) % 100,
    },
  ];

  const barchartData = [
    {
      name: "2024-01",
      EFFECIENT_RESOURCE_MGMT: 55,
      PLATFORM_REV_PERC: 22,
      PRGMS_PRJKS_REV: 36,
      TOTAL_TAX_REFUND: 12,
      DONAT_PERC: 60,
    },
    {
      name: "2024-02",
      EFFECIENT_RESOURCE_MGMT: 51,
      PLATFORM_REV_PERC: 28,
      PRGMS_PRJKS_REV: 44,
      TOTAL_TAX_REFUND: 22,
      DONAT_PERC: 80,
    },
    {
      name: "2024-03",
      EFFECIENT_RESOURCE_MGMT: 58,
      PLATFORM_REV_PERC: 32,
      PRGMS_PRJKS_REV: 48,
      TOTAL_TAX_REFUND: 25,
      DONAT_PERC: 75,
    },
    {
      name: "2024-04",
      EFFECIENT_RESOURCE_MGMT: 62,
      PLATFORM_REV_PERC: 35,
      PRGMS_PRJKS_REV: 52,
      TOTAL_TAX_REFUND: 28,
      DONAT_PERC: 70,
    },
    {
      name: "2024-05",
      EFFECIENT_RESOURCE_MGMT: 65,
      PLATFORM_REV_PERC: 38,
      PRGMS_PRJKS_REV: 55,
      TOTAL_TAX_REFUND: 30,
      DONAT_PERC: 65,
    },
    {
      name: "2024-06",
      EFFECIENT_RESOURCE_MGMT: 70,
      PLATFORM_REV_PERC: 42,
      PRGMS_PRJKS_REV: 58,
      TOTAL_TAX_REFUND: 35,
      DONAT_PERC: 85,
    },
    {
      name: "2024-07",
      EFFECIENT_RESOURCE_MGMT: 72,
      PLATFORM_REV_PERC: 45,
      PRGMS_PRJKS_REV: 62,
      TOTAL_TAX_REFUND: 38,
      DONAT_PERC: 90,
    },
    {
      name: "2024-08",
      EFFECIENT_RESOURCE_MGMT: 68,
      PLATFORM_REV_PERC: 40,
      PRGMS_PRJKS_REV: 58,
      TOTAL_TAX_REFUND: 32,
      DONAT_PERC: 82,
    },
    {
      name: "2024-09",
      EFFECIENT_RESOURCE_MGMT: 75,
      PLATFORM_REV_PERC: 48,
      PRGMS_PRJKS_REV: 65,
      TOTAL_TAX_REFUND: 42,
      DONAT_PERC: 88,
    },
    {
      name: "2024-10",
      EFFECIENT_RESOURCE_MGMT: 78,
      PLATFORM_REV_PERC: 52,
      PRGMS_PRJKS_REV: 68,
      TOTAL_TAX_REFUND: 45,
      DONAT_PERC: 92,
    },
    {
      name: "2024-11",
      EFFECIENT_RESOURCE_MGMT: 82,
      PLATFORM_REV_PERC: 55,
      PRGMS_PRJKS_REV: 72,
      TOTAL_TAX_REFUND: 48,
      DONAT_PERC: 95,
    },
    {
      name: "2024-12",
      EFFECIENT_RESOURCE_MGMT: 85,
      PLATFORM_REV_PERC: 58,
      PRGMS_PRJKS_REV: 75,
      TOTAL_TAX_REFUND: 50,
      DONAT_PERC: 98,
    },
  ];
  const gradientIdPrefix = useId();

const CustomTooltip = ({ active, payload, label }:any) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p className="label font-bold">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{
        //@ts-ignore
        indicatorsLabels.FINANCIAL[label]}</p>
      </div>
    );
  }

  return null;
};

  return (
    <section >
      <div className="w-11/12 mx-auto mt-4 rounded-lg  bg-[#13161B] p-1">
        <h5>{"الأداء المالي"}</h5>
      </div>

      <div className="flex min-w-[20%] flex-wrap gap-5 my-5 rounded-lg p-5">
        {finPerfCards.map((card: string) => (
          <div className="border border-[#555C6A] p-3 flex flex-col gap-3 rounded-xl">
            <p className="text-[#94979C] font-bold text-xl">
              {/*  @ts-ignore  */}
              {indicatorsLabels.FINANCIAL[card]}
            </p>
            <div className="flex gap-3">
              <h5
                className={`text-2xl font-bold ${finValueThemes[card].gradient} 
              ${finValueThemes[card].text}`}
              >
                {Number(props.indicators[card]).toFixed(1)}
                {"%"}
              </h5>
              <div className="border p-1 flex justify-center items-center gap-1 text-xs rounded-lg">
                {" "}
                {"آخر ثلاث شهور"}
                <TrendingUp className="w-4 text-green-600" />{" "}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-11/12 mx-auto">
        <div className="w-full  mx-auto mt-4 rounded-lg p-1 bg-[#13161B]">
          <h5>{"تنمية الموارد المالية"}</h5>
        </div>
        <div className=" flex gap-2 justify-between w-full h-full items-center mt-8">
          <div className="grid grid-cols-2 w-1/2  h-[444px] justify-start items-start  p-6 rounded-lg border border-[#555C6A]    ">
            {rawData.map((card) => (
              <div
                className="flex flex-col justify-center items-start gap-1"
                key={card.id}
              >
                <div className="flex items-center mt-4 mb-2 gap-x-4">
                  <div
                    style={{ background: card.fill }}
                    className="rounded-full h-3 w-3"
                  />
                  <h6 className="text-[#94979C]">{card.name}</h6>
                </div>

                <h5 className="text-white">{Number(card.value).toFixed(1)}%</h5>
              </div>
            ))}
          </div>
          <div className="border border-[#555C6A] w-1/2 max-h-[444px]  rounded-lg">
            <ResponsiveContainer width="100%" className={"w-full"} height={444}>
              <BarChart className='[&_.recharts-cartesian-grid-horizontal>line]:[stroke-dasharray:0]' width={150} height={40} data={barchartSingleMonthData}>
                <defs>
                  {barchartSingleMonthData.map((entry, index) => {
                    const colors = [
                      { start: "#FBE947", end: "#58D764" },
                      { start: "#1882FF", end: "#36EBCA" },
                      { start: "#FF5A5A", end: "#EF7BE3" },
                      { start: "#17b26a", end: "#36F097" },
                      { start: "#F79009", end: "#F79099" },
                      { start: "#1882FF", end: "#36EBCA" },

                    ][index];

                    return (
                      <linearGradient
                        key={index}
                        id={`${gradientIdPrefix}-${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={colors.start} />
                        <stop offset="100%" stopColor={colors.end} />
                      </linearGradient>
                    );
                  })}
                </defs>

                <XAxis tick={false} dataKey="name" />
                <YAxis  domain={[0,100]}/>
                <CartesianGrid strokeDasharray='3 3' />
                <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
              

                <Bar dataKey="value" barSize={40} 
                
                radius={[8, 8, 0, 0]}>
                  {barchartSingleMonthData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${gradientIdPrefix}-${index})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
   
        </div>
      </div>
    </section>
  );

  {
  }
};

export default FinancialDashboard;
