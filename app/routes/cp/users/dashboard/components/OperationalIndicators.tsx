import { indicatorsLabels } from "../constants/glossary";
import ChartPositive from "~/assets/icons/chart-positive.svg?react";
import ChartNegative from "~/assets/icons/chart-negative.svg?react";
import LongChartNegative from "~/assets/icons/longNegativeChart.svg?react";

import CircularProgressBar from "~/components/ui/circular-progress";
import { Label, Pie, PieChart, Text } from "recharts";
import UnderConstructionCard from "~/components/ui/under-construction";
import { cn } from "~/lib/tw-merge";
import { useSidebarStore } from "~/lib/store/sidebar-store";
import TestingIcon from "~/assets/icons/Layer_1.webp";
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
import SmallSRPink from "~/assets/icons/smallSRPink.svg?react";
import SmallSRBlue from "~/assets/icons/smallSRBlue.svg?react";
import SmallSRGreen from "~/assets/icons/smallSRBGreen.svg?react";
import SmallSRPurple from "~/assets/icons/smallSRBPurple.svg?react";
import SmallSRYellow from "~/assets/icons/smallSRYellow.svg?react";
import SmallSROrange from "~/assets/icons/smallSROrange.svg?react";
import SmallSRBrown from "~/assets/icons/smallSRBrown.svg?react";
import { ArrowUpRight } from "lucide-react";

export default function OperationalIndicator({
  indicators,
}: {
  indicators: any;
}) {
  console.log("indicators::", indicators);

  const { isExpanded } = useSidebarStore();

  const approvedExpQuar = [
    {
      id: "APPROVED_ACTIVITY_EXPENSES",
      color: "#0088FE",
      value: Math.round(
        (Number(indicators.children?.APPROVED_ACTIVITY_EXPENSES.value) /
          Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES",
      color: "#725CFA",
      value: Math.round(
        (Number(
          indicators.children
            ?.APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES.value
        ) /
          Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "APPROVED_SERVICE_EXPENSES",
      color: "#36EBCA",
      value: Math.round(
        (Number(indicators.children?.APPROVED_SERVICE_EXPENSES.value) /
          Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "APPROVED_SALARY_EXPENSES",
      color: "#EE46BC",
      value: Math.round(
        (Number(indicators.children?.APPROVED_SALARY_EXPENSES.value) /
          Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "APPROVED_MISCELLANEOUS_EXPENSES",
      color: "#FF8042",
      value: Math.round(
        (Number(indicators.children?.APPROVED_MISCELLANEOUS_EXPENSES.value) /
          Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "APPROVED_MARKETING_EXPENSES",
      color: "#FFBB28",
      value: Math.round(
        (Number(indicators.children?.APPROVED_MARKETING_EXPENSES.value) /
          Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "APPROVED_OTHER_EXPENSES",
      color: "#00C49F",
      value: Math.round(
        (Number(indicators.children?.APPROVED_OTHER_EXPENSES.value) /
          Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
  ];

  const expQuar = [
    {
      id: "ACTIVITY_EXPENSES",
      color: "#0088FE",
      value: Math.round(
        (Number(indicators.children?.ACTIVITY_EXPENSES.value) /
          Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES",
      color: "#725CFA",
      value: Math.round(
        (Number(
          indicators.children?.ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES
            .value
        ) /
          Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "SERVICE_EXPENSES",
      color: "#36EBCA",
      value: Math.round(
        (Number(indicators.children?.SERVICE_EXPENSES.value) /
          Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "SALARY_EXPENSES",
      color: "#EE46BC",
      value: Math.round(
        (Number(indicators.children?.SALARY_EXPENSES.value) /
          Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "MISCELLANEOUS_EXPENSES",
      color: "#FF8042",
      value: Math.round(
        (Number(indicators.children?.MISCELLANEOUS_EXPENSES.value) /
          Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
    {
      id: "OTHER_EXPENSES",
      color: "#FFBB28",
      value: Math.round(
        (Number(indicators.children?.OTHER_EXPENSES.value) /
          Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)) *
          100
      ),
    },
  ];

  const Bullet = ({ backgroundColor, size }: any) => {
    return (
      <div
        className="CirecleBullet"
        style={{
          backgroundColor,
          width: size,
          height: size,
        }}
      ></div>
    );
  };
  const CustomizedLegend = (props: any) => {
    const { payload } = props;
    console.log("props in CustomizedLegend", props);

    return (
      <ul className="flex gap-x-4 flex-wrap w-3/5 LegendList">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`}>
            <div className="BulletLabel">
              <Bullet backgroundColor={entry.payload.fill} size="8px" />
              <div className="BulletLabelText">
                {
                  indicatorsLabels.OPERATIONAL[
                    entry.payload
                      .id as keyof typeof indicatorsLabels.OPERATIONAL
                  ]
                }
              </div>
            </div>
            <div style={{ marginLeft: "20px" }}>{entry.payload.value}%</div>
          </li>
        ))}
      </ul>
    );
  };

  const CustomLabel = ({ viewBox, labelText, value }: any) => {
    const { cx, cy } = viewBox;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fontSize="15"
        >
          {labelText}
        </text>
        <text
          x={cx}
          y={cy + 20}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#0088FE"
          fontSize="26"
          fontWeight="600"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <section
      className={cn(
        "py-20 w-full h-full flex flex-col gap-16",
        isExpanded ? " px-10 2xl:px-14" : " px-20 2xl:px-28"
      )}
    >
      <div className="w-full h-full flex items-center justify-center">
        <img src={TestingIcon} className="" alt="organization icon" />
        <div className="flex-1 text-center font-bold text-4xl">
          لوحة المؤشر التشغيلي
        </div>
      </div>

      {/* indicators */}
      <div id="main-container" className="flex justify-center  h-full gap-11">
        {/* first column */}
        <div className={cn(
          "p-5 h-auto flex flex-col gap-11 border-2 border-[#9C9C9C] rounded-xl",
          isExpanded ? "w-1/3 2xl:w-[29%]" : "w-1/3 2xl:w-[29%]"
        )}>
          <div className="flex w-full justify-center">
            <div className="relative  w-[300px] h-[300px] ">
              <div className="absolute inset-0 z-10 flex items-center justify-center text-2xl">
                المبالغ المعتمدة
              </div>
              <ResponsiveContainer
                width={300}
                minWidth={300}
                minHeight={300}
                height={300}
              >
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient
                      id="colorGradient1"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#EF7BE3" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#FF5A5A "
                        stopOpacity={1}
                      />
                    </linearGradient>

                    <linearGradient
                      id="colorGradient2"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#1882FF " stopOpacity={1} />
                      <stop offset="100%" stopColor="#36EBCA" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient3"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#36F097 " stopOpacity={1} />
                      <stop offset="100%" stopColor="#3a9c5c" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient4"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#725CFA" stopOpacity={1} />
                      <stop offset="100%" stopColor="#EF7BE3" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient5"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FBE947" stopOpacity={1} />
                      <stop offset="100%" stopColor="#58D764" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient6"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FBE947" stopOpacity={1} />
                      <stop offset="100%" stopColor="#F9A000" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient7"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ff7300" stopOpacity={1} />
                      <stop offset="100%" stopColor="#c25502" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Pie
                    dataKey="value"
                    data={[
                      {
                        name: "مصاريف الأنشطة",
                        value: 20,
                        fill: "url(#colorGradient1)",
                      },
                      {
                        name: "مصاريف إدارية",
                        value: 30,
                        fill: "url(#colorGradient2)",
                      },
                      {
                        name: "مصاريف نثرية",
                        value: 25,
                        fill: "url(#colorGradient3)",
                      },
                      {
                        name: "مصاريف خدمات",
                        value: 80,
                        fill: "url(#colorGradient4)",
                      },
                      {
                        name: "مصاريف التسويق",
                        value: 65,
                        fill: "url(#colorGradient5)",
                      },
                      {
                        name: "مصاريف الرواتب",
                        value: 40,
                        fill: "url(#colorGradient6)",
                      },
                      { name: "أخرى", value: 11, fill: "url(#colorGradient7)" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius="80%"
                    outerRadius="100%"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            {/* مصاريف الانشطة */}
            <div className="flex justify-between w-2/3 items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#F86790] w-2 h-2" />
                <p className="font-bold">مصاريف الأنشطة</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRPink />
              </div>
            </div>
            {/* مصاريف إدارية */}
            <div className="flex justify-between w-2/3 items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#36EBCA] w-2 h-2" />
                <p className="font-bold">مصاريف إدارية</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRBlue />
              </div>
            </div>

            {/* مصاريف نثرية */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#3a9c5c] w-2 h-2" />
                <p className="font-bold">مصاريف نثرية</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#36F097] to-[#3a9c5c] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRGreen />
              </div>
            </div>

            {/* مصاريف خدمات */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#725CFA] w-2 h-2" />
                <p className="font-bold">مصاريف خدمات</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#725CFA] to-[#EF7BE3] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRPurple />
              </div>
            </div>

            {/* مصاريف التسويق */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#58D764] w-2 h-2" />
                <p className="font-bold">مصاريف التسويق</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#FBE947] to-[#58D764] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRYellow />
              </div>
            </div>

            {/* مصاريف الرواتب */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#F9A000] w-2 h-2" />
                <p className="font-bold">مصاريف الرواتب</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#F9A000] to-[#FBE947] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSROrange />
              </div>
            </div>

            {/* أخرى */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#c25502] w-2 h-2" />
                <p className="font-bold">أخرى</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#ff7300] to-[#c25502] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRBrown />
              </div>
            </div>
          </div>
        </div>

        {/* second column */}
        <div className={cn(
          "p-5 h-auto flex flex-col gap-11 border-2 border-[#9C9C9C] rounded-xl",
          isExpanded ? "w-1/3 2xl:w-[29%]" : "w-1/3 2xl:w-[29%]"
        )}>
          <div className="flex w-full justify-center">
            <div className="relative  w-[300px] h-[300px] ">
              <div className="absolute inset-0 z-10 flex items-center justify-center text-2xl">
                المبالغ المصروفة
              </div>
              <ResponsiveContainer
                width={300}
                minWidth={300}
                minHeight={300}
                height={300}
              >
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient
                      id="colorGradient1"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#EF7BE3" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#FF5A5A "
                        stopOpacity={1}
                      />
                    </linearGradient>

                    <linearGradient
                      id="colorGradient2"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#1882FF " stopOpacity={1} />
                      <stop offset="100%" stopColor="#36EBCA" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient3"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#36F097 " stopOpacity={1} />
                      <stop offset="100%" stopColor="#3a9c5c" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient4"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#725CFA" stopOpacity={1} />
                      <stop offset="100%" stopColor="#EF7BE3" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient5"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FBE947" stopOpacity={1} />
                      <stop offset="100%" stopColor="#58D764" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient6"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FBE947" stopOpacity={1} />
                      <stop offset="100%" stopColor="#F9A000" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="colorGradient7"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ff7300" stopOpacity={1} />
                      <stop offset="100%" stopColor="#c25502" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Pie
                    dataKey="value"
                    data={[
                      {
                        name: "مصاريف الأنشطة",
                        value: 20,
                        fill: "url(#colorGradient1)",
                      },
                      {
                        name: "مصاريف إدارية",
                        value: 30,
                        fill: "url(#colorGradient2)",
                      },
                      {
                        name: "مصاريف نثرية",
                        value: 25,
                        fill: "url(#colorGradient3)",
                      },
                      {
                        name: "مصاريف خدمات",
                        value: 80,
                        fill: "url(#colorGradient4)",
                      },
                      {
                        name: "مصاريف التسويق",
                        value: 65,
                        fill: "url(#colorGradient5)",
                      },
                      {
                        name: "مصاريف الرواتب",
                        value: 40,
                        fill: "url(#colorGradient6)",
                      },
                      { name: "أخرى", value: 11, fill: "url(#colorGradient7)" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius="80%"
                    outerRadius="100%"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            {/* مصاريف الانشطة */}
            <div className="flex justify-between w-2/3 items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#F86790] w-2 h-2" />
                <p className="font-bold">مصاريف الأنشطة</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRPink />
              </div>
            </div>
            {/* مصاريف إدارية */}
            <div className="flex justify-between w-2/3 items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#36EBCA] w-2 h-2" />
                <p className="font-bold">مصاريف إدارية</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRBlue />
              </div>
            </div>

            {/* مصاريف نثرية */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#3a9c5c] w-2 h-2" />
                <p className="font-bold">مصاريف نثرية</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#36F097] to-[#3a9c5c] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRGreen />
              </div>
            </div>

            {/* مصاريف خدمات */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#725CFA] w-2 h-2" />
                <p className="font-bold">مصاريف خدمات</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#725CFA] to-[#EF7BE3] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRPurple />
              </div>
            </div>

            {/* مصاريف التسويق */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#58D764] w-2 h-2" />
                <p className="font-bold">مصاريف التسويق</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#FBE947] to-[#58D764] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRYellow />
              </div>
            </div>

            {/* مصاريف الرواتب */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#F9A000] w-2 h-2" />
                <p className="font-bold">مصاريف الرواتب</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#F9A000] to-[#FBE947] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSROrange />
              </div>
            </div>

            {/* أخرى */}
            <div className="flex justify-between w-2/3  items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#c25502] w-2 h-2" />
                <p className="font-bold">أخرى</p>
              </div>
              <div className="flex items-center ">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#ff7300] to-[#c25502] bg-clip-text text-transparent">
                  34
                </p>
                <SmallSRBrown />
              </div>
            </div>
          </div>
        </div>

        {/* third column */}
        <div className={cn(
          "flex flex-col gap-6 border rounded-xl h-auto ",
          isExpanded ? "w-1/4 2xl:w-1/5" : "w-1/4 2xl:w-1/5"
        )}>
        
          <div className="flex flex-col items-center gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            <div className="flex self-end h-fit w-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="font-bold">مساهمة المتطوعين في تنفيذ المشاريع</p>
            <p className="font-bold text-5xl bg-gradient-to-r from-[#FBE947] to-[#58D764] bg-clip-text text-transparent">34%</p>
          </div>

          <div className="flex flex-col items-center gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            <div className="flex self-end h-fit w-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="font-bold">نسبة استدامة المتطوعين</p>
            <p className="font-bold text-5xl bg-gradient-to-r from-[#F7E706] to-[#F7E706] bg-clip-text text-transparent">34%</p>
          </div>

          <div className="flex flex-col items-center gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            <div className="flex self-end h-fit w-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="font-bold">معدل النمو الربعي للمتطوعين</p>
            <p className="font-bold text-5xl bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">34%</p>
          </div>

          <div className="flex flex-col items-center gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            <div className="flex self-end h-fit w-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div>
            <p className="font-bold">نسبة الوصول للفئة المستهدفة</p>
            <p className="font-bold text-5xl bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">34%</p>
          </div>

        </div>
      </div>
    </section>
  );
}

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
