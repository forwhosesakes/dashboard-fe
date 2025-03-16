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
import TestingIcon from "~/assets/icons/Layer_1.webp";
import UnderConstructionCard from "~/components/ui/under-construction";
import { useEffect, useId, useRef, useState } from "react";
import { TrendingUp, ArrowUpRight, TrendingDown } from "lucide-react";
import CircularProgressBar from "~/components/ui/circular-progress";
import SemiCircleProgress from "~/components/ui/semi-circle-progress";
import SRIcon from "~/assets/icons/SR.svg";
import { Progress } from "~/components/ui/progress";
import { useSidebarStore } from "~/lib/store/sidebar-store";
import { cn } from "~/lib/tw-merge";
interface IProps {
  indicators: any;
}


const FinancialDashboard = (props: IProps) => {
  const { isExpanded } = useSidebarStore();

  useEffect(() => {
    console.log("props", props);
  }, []);
  const finPerfCards = [
    "ABL_COVER_OBLIG",
    "ADMIN_EXPENSES",
    "ADMIN_TO_TOTAL_EXPENSES",
    "CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF",
    "DONAT_MONEY_RAISING",
    "FINANCIAL_SUSTAIN",
    "FUND_RAISING_TO_TOTAL_DONAT",
    "FUND_RAISING_TO_TOTAL_EXPENSES",
    "NET_CACHE_INVEST_ADMIN_EXPENSES",
    "PRGRMS_EXPENSES",
    "PRGRMS_TO_TOTAL_EXPENSES",
    "REV_FIN_SUST_TO_TOTAL_EXPENSES",
    "SUST_EXPENSEES_TO_REV",
    "SUST_RETURN_TO_ASSETS",
    "SUST_TO_TOTAL_EXPENSES",
  ];

  const finValueThemes = {
    ABL_COVER_OBLIG: {
      gradient: "bg-gradient-to-r from-amber-300 to-orange-500",
      text: "text-transparent bg-clip-text",
    },
    CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF: {
      gradient: "bg-gradient-to-r from-sky-300 to-cyan-500",
      text: "text-transparent bg-clip-text",
    },
    NET_CACHE_INVEST_ADMIN_EXPENSES: {
      gradient: "bg-gradient-to-r from-blue-300 to-indigo-500",
      text: "text-transparent bg-clip-text",
    },

    ADMIN_EXPENSES: {
      gradient: "bg-gradient-to-r from-slate-300 to-zinc-500",
      text: "text-transparent bg-clip-text",
    },
    ADMIN_TO_TOTAL_EXPENSES: {
      gradient: "bg-gradient-to-r from-zinc-300 to-stone-500",
      text: "text-transparent bg-clip-text",
    },

    PRGRMS_EXPENSES: {
      gradient: "bg-gradient-to-r from-emerald-300 to-teal-500",
      text: "text-transparent bg-clip-text",
    },
    PRGRMS_TO_TOTAL_EXPENSES: {
      gradient: "bg-gradient-to-r from-green-300 to-lime-600",
      text: "text-transparent bg-clip-text",
    },

    FINANCIAL_SUSTAIN: {
      gradient: "bg-gradient-to-r from-fuchsia-300 to-purple-600",
      text: "text-transparent bg-clip-text",
    },
    SUST_EXPENSEES_TO_REV: {
      gradient: "bg-gradient-to-r from-red-300 to-pink-600",
      text: "text-transparent bg-clip-text",
    },
    SUST_RETURN_TO_ASSETS: {
      gradient: "bg-gradient-to-r from-yellow-300 to-amber-600",
      text: "text-transparent bg-clip-text",
    },
    SUST_TO_TOTAL_EXPENSES: {
      gradient: "bg-gradient-to-r from-violet-300 to-fuchsia-600",
      text: "text-transparent bg-clip-text",
    },
    REV_FIN_SUST_TO_TOTAL_EXPENSES: {
      gradient: "bg-gradient-to-r from-pink-300 to-purple-600",
      text: "text-transparent bg-clip-text",
    },

    DONAT_MONEY_RAISING: {
      gradient: "bg-gradient-to-r from-rose-300 to-red-600",
      text: "text-transparent bg-clip-text",
    },
    FUND_RAISING_TO_TOTAL_DONAT: {
      gradient: "bg-gradient-to-r from-orange-300 to-red-500",
      text: "text-transparent bg-clip-text",
    },
    FUND_RAISING_TO_TOTAL_EXPENSES: {
      gradient: "bg-gradient-to-r from-lime-300 to-green-600",
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

  return (
    <section className={cn(
      " pt-12 w-full flex ",
      isExpanded ? "xl:pl-5 xl:pr-1 xl:gap-4 2xl:gap-8 2xl:pr-32 2xl:pl-24" : "gap-8 xl:pl-16 xl:pr-24 2xl:pr-32"
    )} >
      <div className="w-full lg:w-60 flex flex-col">
        <div className="">
          {/* https://pub-78d8970765b1464a831d610935e4371c.r2.dev/1740233226681-2e73150c0ab935904bcecca40118e54e%20(1).jpeg */}
          <img src={TestingIcon} alt="organization icon" />
        </div>
        <p className="font-bold text-white text-2xl md:text-3xl lg:text-4xl mt-8 md:mt-16 lg:mt-24 text-nowrap">
          لوحــــــــة أداء
        </p>
        <p className="font-bold text-white text-2xl md:text-3xl lg:text-4xl text-nowrap">
          المؤشر المالي
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 h-full">
        {/* first row */}
        <div className={cn(
          "flex ",
          isExpanded ? "xl:gap-3 2xl:gap-4" : "gap-4"
        )}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-1/2 justify-center items-center px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <div className="flex flex-col gap-3 md:gap-6 items-center md:items-start">
              <p className="text-base font-bold">الأداء المالي الكلي</p>
              <p className="text-[#D9B456] font-bold text-3xl md:text-4xl lg:text-5xl">
                45%
              </p>
            </div>
            <div className="mt-4 md:mt-0 min-w-32">
              <CircularProgressBar
                gradientId="1"
                progress={45}
                size="sm"
                gradientStart="#D9B456"
                gradientEnd="#D9B456"
                trackColor="#373A41"
                textFillColor="fill-transparent"
              />
            </div>
          </div>

          <div className={cn(
            "flex  px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]",
            isExpanded?"gap-3 w-6/12":"gap-6 w-1/2"
          )}>
            <div className="flex flex-col gap-3 md:gap-6 items-center md:items-start">
              <p className="text-base font-bold text-center md:text-right">
                النقد وما في حكمه إلى صافي الأصول والالتزامات
              </p>
              <p className="text-[#FF0080] font-bold text-3xl md:text-4xl lg:text-5xl">
                34%
              </p>
            </div>
            <div className="mt-4 md:mt-0 mx-auto md:mx-0 md:min-w-32">
              <CircularProgressBar
                gradientId="2"
                progress={34}
                size="sm"
                gradientStart="#FF0080"
                gradientEnd="#FF0080"
                trackColor="#373A41"
                textFillColor="fill-transparent"
              />
            </div>
          </div>
        </div>
        {/* second row */}
        <div className={cn(
          "flex",
          isExpanded? "xl:gap-3 2xl:gap-4" : "gap-4"
        )}>
          <div className="flex flex-col justify-center w-[25%] items-center p-5 gap-2 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)] ">
            <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="font-bold text-center">
              المصاريف الإدارية والعمومية والحوكمة
            </p>
            <SemiCircleProgress
              percentage={80}
              size={180}
              useGradient={true}
              gradientId="3"
              gradientStart="#EF7BE3"
              gradientEnd="#FF5A5A"
              textSize="4xl"
            />
          </div>

          <div className="flex flex-col justify-center w-[25%] items-center p-5 gap-2 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)] ">
            <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="font-bold text-center">
              قدرة الجمعية على تغطية التزاماتها المستقبلية
            </p>
            <SemiCircleProgress
              percentage={80}
              size={180}
              useGradient={true}
              gradientId="4"
              gradientStart="#00AE84"
              gradientEnd="#58D764"
              textSize="4xl"
            />
          </div>

          <div className="flex flex-col justify-center w-[25%] items-center p-5 gap-2 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)] ">
            <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="font-bold text-center">
              مصاريف جمع الأموال إلى إجمالي المصاريف
            </p>
            <SemiCircleProgress
              percentage={80}
              size={180}
              useGradient={true}
              gradientId="5"
              gradientStart="#FBE947"
              gradientEnd="#58D764"
              textSize="4xl"
            />
          </div>

          <div className="flex flex-col justify-center  w-[21.5%] items-center p-5 gap-5 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <img src={SRIcon} alt="" />
            <div className="text-center">
              <p className="font-bold text-5xl">50%</p>
              <p className="font-bold">جمع الأموال والتبرعات</p>
            </div>
            <Progress value={50} className="bg-[#373A41]" indicatorClassName="bg-accent" />

            <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
          </div>
        </div>

        {/* third row */}
        <div className={cn(
          "flex",
          isExpanded?"xl:gap-3 2xl:gap-4":"gap-4"
        )}>
          <div className="flex justify-center items-center  w-[78.5%] p-5 gap-4 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <div className="flex flex-col pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#EF7BE3] after:to-[#FF5A5A]">
              <p className="font-bold ">الاستدامة المالية (أوقاف واستثمارات)</p>

              <div className="flex gap-4 justify-between items-center">
                <p className="font-bold text-5xl bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">
                  46%
                </p>

                <div className="flex h-fit justify-center text-center items-center text-[#CECFD2] text-sm py-[2px] pl-[6px] pr-2 border border-[#373A41] bg-[#0C0E12] rounded-lg gap-1">
                  0.2%
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
              </div>
            </div>

            <div className="flex flex-col pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#1882FF] after:to-[#36EBCA]">
              <p className="font-bold ">المصاريف الإدارية والعمومية</p>

              <div className="flex gap-4 justify-between items-center">
                <p className="font-bold text-5xl bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
                  46%
                </p>

                <div className="flex h-fit justify-center text-center items-center text-[#CECFD2] text-sm py-[2px] pl-[6px] pr-2 border border-[#373A41] bg-[#0C0E12] rounded-lg gap-1">
                  0.2%
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
              </div>
            </div>

            <div className="flex flex-col pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#FBE947] after:to-[#58D764]">
              <p className="font-bold ">مصاريف البرامج والأنشطة</p>

              <div className="flex gap-4 justify-between items-center">
                <p className="font-bold text-5xl bg-gradient-to-r from-[#FBE947] to-[#58D764] bg-clip-text text-transparent">
                  46%
                </p>

                <div className="flex h-fit justify-center text-center items-center text-[#CECFD2] text-sm py-[2px] pl-[6px] pr-2 border border-[#373A41] bg-[#0C0E12] rounded-lg gap-1">
                  0.2%
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[21.5%] flex flex-col justify-center items-center p-5 gap-5 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <img src={SRIcon} alt="" />
            <div className="text-center">
              <p className="font-bold text-5xl">50%</p>
              <p className="font-bold">
                {" "}
                مصاريف جمع الأموال إلى إجمالي التبرعات
              </p>
            </div>
            <Progress value={50} className="bg-[#373A41]" indicatorClassName="bg-accent" />
            {/* <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div> */}
          </div>
        </div>

        {/* fourth row */}
        <div className="flex justify-between w-full border-2 p-5 gap-4 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
          <div className="flex flex-col gap-5 ">
            <div className="flex pb-6 min-w-fit items-center justify-between border-b-4 gap-4 border-accent">
              <p className="font-bold text-3xl ">
                الاستدامة المالية
                <span className="font-bold text-5xl"> 34%</span>
              </p>

              <div className=" pl-[6px] pr-2 py-0.5 h-fit border-2 border-[#F97066] rounded-xl gap-1 flex justify-center items-center">
                <p className="text-[#FDA29B] text-xs">ضعيف</p>
                <TrendingDown className="text-[#B32318]  h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-col gap-3">

              <div className="flex items-center text-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-l from-[#36F097] to-[rgba(54,240,151,0.2)]" />
                <span className="text-bold">
                  مصاريف الاستدامة إلى إجمالي المصاريف
                </span>
              </div>

              <div className="flex items-center text-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-l from-[#1882FF] to-[#36EBCA]" />
                <span className="text-bold">
                عوائد الاستدامة المالية إلى المصاريف الإدارية والعمومية
                </span>
              </div>

              <div className="flex items-center text-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-l from-[#FBE947] to-[#58D764]" />
                <span className="text-bold">
                مصاريف الاستدامة إلى العوائد
                </span>
              </div>

              <div className="flex items-center text-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-l from-[#EF7BE3] to-[#FF5A5A]" />
                <span className="text-bold">
                عوائد الاستدامة إلى إجمالي الأصول
                </span>
              </div>

              <div className="flex items-center text-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-l from-[#725CFA] to-[#EF7BE3]" />
                <span className="text-bold">
                نسبة مصاريف الاستدامة إلى إجمالي المصاريف
                </span>
              </div>

            </div>
          </div>


          <div id="barChart" className="w-[51%]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'jan', value: 650 },
                  { name: 'Feb', value: 420 },
                  { name: 'Mar', value: 780 },
                  { name: 'Apr', value: 550 },
                  { name: 'May', value: 900 },
                ]}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#22262F" strokeDasharray="" />
                <XAxis dataKey="name" tick={{ fill: '#fff' }} fontSize={12} fontWeight={400}  />
                <YAxis tick={{ fill: '#94979C',dx:-30 }} domain={[0,1000]}/>
                {/* <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                  itemStyle={{ color: '#fff' }}
                /> */}
                <defs>
                  <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF5A5A" />
                    <stop offset="100%" stopColor="#EF7BE3" />
                  </linearGradient>
                  <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#36EBCA" />
                    <stop offset="100%" stopColor="#1882FF" />
                  </linearGradient>
                  <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#58D764" />
                    <stop offset="100%" stopColor="#FBE947" />
                  </linearGradient>
                  <linearGradient id="barGradient4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF7BE3" />
                    <stop offset="100%" stopColor="#725CFA" />
                  </linearGradient>
                  <linearGradient id="barGradient5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(54,240,151,0.2)" />
                    <stop offset="100%" stopColor="#36F097" />
                  </linearGradient>
                </defs>
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                  {
                    [0, 1, 2, 3, 4].map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#barGradient${index+1})`} 
                      />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialDashboard;
