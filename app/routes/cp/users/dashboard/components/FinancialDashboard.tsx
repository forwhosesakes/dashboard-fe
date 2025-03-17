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
                {props.indicators["CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF"]}%
              </p>
            </div>
            <div className="mt-4 md:mt-0 mx-auto md:mx-0 md:min-w-32">
              <CircularProgressBar
                gradientId="2"
                progress={props.indicators["CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF"]}
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
              percentage={Number(props.indicators["ADMIN_TO_TOTAL_EXPENSES"])}
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
              percentage={Number(props.indicators["ABL_COVER_OBLIG"])}
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
              percentage={props.indicators["FUND_RAISING_TO_TOTAL_EXPENSES"]}
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
              <p className="font-bold text-5xl">{props.indicators["DONAT_MONEY_RAISING"]}%</p>
              <p className="font-bold">جمع الأموال والتبرعات</p>
            </div>
            <Progress value={Number(props.indicators["DONAT_MONEY_RAISING"])} className="bg-[#373A41]" indicatorClassName="bg-accent" />

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
                  {props.indicators["FINANCIAL_SUSTAIN"]}%
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
                  {props.indicators["ADMIN_EXPENSES"]}%
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
                  {props.indicators["PRGRMS_EXPENSES"]}%
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
              <p className="font-bold text-5xl">{props.indicators["FUND_RAISING_TO_TOTAL_DONAT"]}%</p>
              <p className="font-bold">
                {" "}
                مصاريف جمع الأموال إلى إجمالي التبرعات
              </p>
            </div>
            <Progress value={Number(props.indicators["FUND_RAISING_TO_TOTAL_DONAT"])} className="bg-[#373A41]" indicatorClassName="bg-accent" />
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
                <span className="font-bold text-5xl"> {props.indicators["FINANCIAL_SUSTAIN"]}%</span>
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
                  { name: 'jan', value: Number(props.indicators["SUST_RETURN_TO_ASSETS"]) },
                  { name: 'Feb', value: Number(props.indicators["REV_FIN_SUST_TO_TOTAL_EXPENSES"]) },
                  { name: 'Mar', value: Number(props.indicators["SUST_EXPENSEES_TO_REV"]) },
                  { name: 'Apr', value: 550 },
                  { name: 'May', value: Number(props.indicators["SUST_TO_TOTAL_EXPENSES"]) },
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
