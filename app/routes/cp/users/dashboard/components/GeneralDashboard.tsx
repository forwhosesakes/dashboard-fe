import { indicatorsLabels } from "../constants/glossary";
import SemiCircleProgressBar from "~/components/ui/half-circular-progress";
import SaudiArabiaSvg from "~/assets/images/saudi-arabia.svg?react";

import PulseLocationSvg from "~/assets/images/pulse-location.svg?react";
import UnderConstructionCard from "~/components/ui/under-construction";
import { useSidebarStore } from "~/lib/store/sidebar-store";
import { cn } from "~/lib/tw-merge";
import TestingIcon from "~/assets/icons/Layer_1.webp";
import { ArrowUpRight } from "lucide-react";
import CircularProgressBar from "~/components/ui/circular-progress";
import SemiCircleProgress from "~/components/ui/semi-circle-progress";
import SRIcon from "~/assets/icons/SR.svg";
import { Progress } from "~/components/ui/progress";
import { useEffect } from "react";
import RatingsGraph from "~/components/ratings-graph";

interface IProps {
  indicators: any;
  category: string;
  role: string;
  logoUrl: string;
}
const GeneralDashboard = ({ indicators, role, logoUrl }: IProps) => {
    const satisInds = [
      {
        id: "BENEF_SATIS_MEASURMENT",
        percentage: Math.round(indicators.BENEF_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.BENEF_SATIS_MEASURMENT,
      },
      {
        id: "EMP_SATIS_MEASURMENT",
        percentage: Math.round(indicators.EMP_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.EMP_SATIS_MEASURMENT,
      },
      {
        id: "PARTENERS_SATIS_MEASURMENT",
        percentage: Math.round(indicators.PARTENERS_SATIS_MEASURMENT),

        label: indicatorsLabels.CORPORATE.PARTENERS_SATIS_MEASURMENT,
      },
      {
        id: "VOLUN_SATIS_MEASURMENT",
        percentage: Math.round(indicators.VOLUN_SATIS_MEASURMENT),

        label: indicatorsLabels.CORPORATE.VOLUN_SATIS_MEASURMENT,
      },
      {
        id: "DONATORS_SATIS_MEASURMENT",
        percentage: Math.round(indicators.DONATORS_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.DONATORS_SATIS_MEASURMENT,
      },
      {
        id: "ADMIN_ORG_SATIS_MEASURMENT",
        percentage: Math.round(indicators.ADMIN_ORG_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.ADMIN_ORG_SATIS_MEASURMENT,
      },
      {
        id: "COMMUNITY_SATIS_MEASURMENT",
        percentage: Math.round(indicators.COMMUNITY_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.COMMUNITY_SATIS_MEASURMENT,
      },
    ];
  const cards = [
    // {
    //   label: "GENERAL_PERFORMANCE",
    //   value: indicators.GENERAL_PERFORMANCE,
    //   gradientStart: "#725CFA",
    //   gradientEnd: "#EF7BE3",
    // },
    {
      label: "GOVERENCE",
      value: indicators.GOVERENCE,
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

    {
      label: "FINANCIAL_PERF",
      value: indicators.FINANCIAL_PERF,
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
    {
      label: "AVG_SATIS_MEASURMENT",
      value: indicators.AVG_SATIS_MEASURMENT,
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
    {
      label: "ECONOMIC_RETURN_OF_VOLUNTEERING",
      value: indicators.ECONOMIC_RETURN_OF_VOLUNTEERING,
      gradientStart: "#725CFA",
      gradientEnd: "#EF7BE3",
    },

    // {
    //   label: "COMPLIANCE_ADHERENCE_PRACTICES_TOTAL",
    //   value: indicators.COMPLIANCE_ADHERENCE_PRACTICES_TOTAL,
    //   gradientStart: "#725CFA",
    //   gradientEnd: "#EF7BE3",
    // },

    // {
    //   label: "NO_RESPOSES_VOL_SATIS_FORM",
    //   value: indicators.NO_RESPOSES_VOL_SATIS_FORM,
    //   gradientStart: "#725CFA",
    //   gradientEnd: "#EF7BE3",
    // },

    {
      label: "NO_RESPONSES_SATIS_FORM",
      value: indicators.NO_RESPONSES_SATIS_FORM,
      gradientStart: "#725CFA",
      gradientEnd: "#EF7BE3",
    },

    {
      label: "VOLUN_SATIS_MEASURMENT",
      value: indicators.VOLUN_SATIS_MEASURMENT,
      gradientStart: "#725CFA",
      gradientEnd: "#EF7BE3",
    },
    {
      label: "BENEF_SATIS_MEASURMENT",
      value: indicators.BENEF_SATIS_MEASURMENT,
      gradientStart: "#725CFA",
      gradientEnd: "#EF7BE3",
    },
    // {
    //   label: "ADMIN_ORG_SATIS_MEASURMENT",
    //   value: indicators.ADMIN_ORG_SATIS_MEASURMENT,
    //   gradientStart: "#725CFA",
    //   gradientEnd: "#EF7BE3",
    // },
    {
      label: "PGRM_PRJKS_EXEC_PERC",
      value: indicators.PGRM_PRJKS_EXEC_PERC,
      gradientStart: "#725CFA",
      gradientEnd: "#EF7BE3",
    },
  ];

  const progressCards = [
    {
      label: "GENERAL_PERFORMANCE",
      value: indicators.GENERAL_PERFORMANCE,
    },
  ];
  const { isExpanded } = useSidebarStore();

  return (
    <section
      className={cn(
        "flex flex-col gap-7 pt-12 pb-20 2xl:px-[80px]",
        isExpanded ? "xl:px-0" : "xl:px-[50px]"
      )}
    >
      {role !== "admin" ||
        (!isExpanded && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-[180px] w-full">
              <img
                src={logoUrl ?? TestingIcon}
                className="w-full h-auto object-contain"
                alt="organization icon"
              />
            </div>
            <div className="flex-1 text-center font-bold text-4xl">
              لوحة الأداء العام
            </div>
          </div>
        ))}

      {/* section has everything except the chart */}
      <div className="flex gap-7">
        {/* right side */}
        <div className={cn("flex flex-col gap-7", isExpanded ? "w-10/12" : "")}>
          {/* right-side first row */}
          <div className="flex gap-11 justify-between">
            <div className="flex flex-col justify-between max-w-[137px] gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#FBE947] after:to-[#58D764]">
              <p className="font-bold text-base">متوسط قياس رضا</p>
              <p className="font-bold text-5xl bg-gradient-to-r from-[#FBE947] to-[#58D764] bg-clip-text text-transparent">
               {Math.round(indicators.AVG_SATIS_MEASURMENT)}%
              </p>
            </div>

            <div className="flex flex-col justify-between max-w-[137px] gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#1882FF] after:to-[#36EBCA]">
              <p className="font-bold text-base">أداء المدير التنفيذي</p>
              <p className="font-bold text-5xl bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
              {Math.round(indicators.CEO_PERFORMANCE)}%

              </p>
            </div>

            <div className="flex flex-col justify-between max-w-[137px] gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#EF7BE3] after:to-[#FF5A5A]">
              <p className="font-bold text-base">
                الاستدامة المالية وقف استثمار
              </p>
              <p className="font-bold text-5xl bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">
              {Math.round(indicators.FINANCIAL_SUSTAIN)}%
             
              </p>
            </div>

            <div className="flex flex-col justify-between max-w-[137px] gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#1882FF] after:to-[#36EBCA]">
              <p className="font-bold text-base">المصاريف الإدارية والعمومية</p>
              <p className="font-bold text-5xl bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
              {Math.round(indicators.ADMIN_EXPENSES)}%

              </p>
            </div>

            <div className="flex flex-col justify-between max-w-[137px] gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#FBE947] after:to-[#58D764]">
              <p className="font-bold text-base">مصاريف البرامج والأنشطة</p>
              <p className="font-bold text-5xl bg-gradient-to-r from-[#FBE947] to-[#58D764] bg-clip-text text-transparent">
              {Math.round(indicators.PRGRMS_EXPENSES)}%

              </p>
            </div>

            <div className="flex flex-col justify-between max-w-[137px] gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#EF7BE3] after:to-[#FF5A5A]">
              <p className="font-bold text-base"> العائد الاقتصادي للتطوع </p>
              <p className="font-bold text-5xl bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">
              {Math.round(indicators.ECONOMIC_RETURN_OF_VOLUNTEERING)}%

              </p>
            </div>
          </div>

          {/* right-side second row */}
          <div className="flex gap-6 w-full">
            <div className="flex border-2 border-[#9C9C9C] rounded-xl w-1/2 gap-6 py-3 px-4 items-center justify-center">
              <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div>

              <div className="flex flex-col gap-6 max-w-[176px] text-start min-w-[132px]">
                <p className="font-bold text-base">الأداء المالي الكلي</p>
                <p className="text-5xl font-bold text-[#D9B456]">
                {Math.round(indicators.FINANCIAL_PERF)}%


                </p>
              </div>

              <div>
                <CircularProgressBar
                  gradientId="1"
                  progress={Math.round(indicators.FINANCIAL_PERF)}
                  size="sm"
                  gradientStart="#D9B456"
                  gradientEnd="#D9B456"
                  trackColor="#373A41"
                  textFillColor="fill-transparent"
                />
              </div>
            </div>

            <div className="flex border-2 border-[#9C9C9C] rounded-xl w-1/2 gap-6 py-3 px-4 items-center justify-center">
              <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div>

              <div className="flex flex-col gap-6 text-start max-w-[176px] min-w-[132px]">
                <p className="font-bold text-base">
الحوكمة
                </p>
                <p className="text-5xl font-bold text-[#FF0080]">

                {Math.round(indicators.GOVERENCE)}%

                </p>
              </div>

              <div>
                <CircularProgressBar
                  gradientId="2"
                  progress={Math.round(indicators.GOVERENCE)}
                  size="sm"
                  gradientStart="#FF0080"
                  gradientEnd="#FF0080"
                  trackColor="#373A41"
                  textFillColor="fill-transparent"
                />
              </div>
            </div>
          </div>

          {/* right-side third row */}
          <div className="flex gap-4 w-full">
            {/* <div className=" flex flex-col min-w-[232px] items-center justify-center gap-2 p-5 border-2 border-[#9C9C9C] rounded-xl">
              <div className="flex w-fit h-fit self-end justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div>
              <p className="text-base font-bold">
                المصاريف الإدارية والعمومية والحوكمة
              </p>

              <div>
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
            </div> */}

            <div className=" flex flex-col min-w-[232px] items-center justify-center gap-2 p-5 border-2 border-[#9C9C9C] rounded-xl">
              <div className="flex w-fit h-fit self-end justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div>
              <p className="text-base font-bold">
                قدرة الجمعية على تغطية التزاماتها المستقبلية
              </p>

              <div>
                <SemiCircleProgress
                  percentage={Math.round(indicators.ABL_COVER_OBLIG)}
                  size={180}
                  useGradient={true}
                  gradientId="4"
                  gradientStart="#1882FF"
                  gradientEnd="#36EBCA"
                  textSize="4xl"
                />
              </div>
            </div>

            <div className=" flex flex-col min-w-[232px] items-center justify-center gap-2 p-5 border-2 border-[#9C9C9C] rounded-xl">
              <div className="flex w-fit h-fit self-end justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div>
              <p className="text-base font-bold">
نسبة تنفيذ البرامج والمشاريع
              </p>

              <div>
                <SemiCircleProgress
                 percentage={Math.round(indicators.PGRM_PRJKS_EXEC_PERC)}

                  size={180}
                  useGradient={true}
                  gradientId="5"
                  gradientStart="#FBE947"
                  gradientEnd="#58D764"
                  textSize="4xl"
                />
              </div>
            </div>

            <div className="flex flex-col  w-full justify-center items-center gap-6 p-5 border-2 border-[#9C9C9C] rounded-xl">
              <div className="flex justify-center">
                <img src={SRIcon} alt="" />
              </div>
              <div className="text-center">
                <p className="font-bold text-5xl">{Math.round(indicators.FUND_RAISING_TO_TOTAL_DONAT)}%</p>
                <p className="font-bold"> مصاريف جمع الأموال إلى اجمالي التبرعات</p>
              </div>
              <Progress
                value={50}
                className="bg-[#373A41]"
                indicatorClassName="bg-accent"
              />

              <div className="flex h-fit w-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* left side */}
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            <div className="flex self-end h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="text-base font-bold">نسبة استدامة المتطوعين</p>
            <p className="font-bold text-5xl text-[#F7E706]">{Math.round(indicators.VOLUN_SUST_PERC)}%</p>
          </div>

          <div className="flex flex-col gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            <div className="flex self-end h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="text-base font-bold">معدل النمو الربعي للمتطوعين  </p>
            <p className="font-bold text-5xl bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">
            {Math.round(indicators.VOLUN_GROWTH_RATE_QUAR)}%
            </p>
          </div>

          <div className="flex flex-col gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            <div className="flex self-end h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="text-base font-bold"> نسبة الوصول للفئة المستهدفة </p>
            <p className="font-bold text-5xl bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
            {Math.round(indicators.REACH_TARGET_AUD_PERC)}%
            
            </p>
          </div>
        </div>
      </div>

      {/* TODO: chart section */}
      <div className="pl-4">
          <RatingsGraph ratings={satisInds} />
        </div>
    </section>
  );
};

export default GeneralDashboard;
