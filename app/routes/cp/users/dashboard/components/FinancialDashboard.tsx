import {
  Bar,
  BarChart,
  CartesianGrid,
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
import { useEffect, useRef, useState } from "react";
import {TrendingUp} from "lucide-react"
interface IProps {
  indicators: any;
}
const FinancialDashboard = (props: IProps) => {

  useEffect(()=>{
    console.log("props",props);
    
  },[])
  const finPerfCards = [
    "ADMIN_EXPENSES",
    "PRGRMS_EXPENSES",
    "FINANCIAL_SUSTAIN",
    "ABL_COVER_OBLIG",
    "GENERAL_ADMINSTRATIVE_EXPENSES",
    "DONAT_MONEY_RAISING",
    "ABL_COVER_OBLIG"
  ];

  const finValueThemes = {
    ADMIN_EXPENSES: {
      gradient: "bg-gradient-to-r from-indigo-300 to-blue-500",
      text: "text-transparent bg-clip-text"
    },
    PRGRMS_EXPENSES: {
      gradient: "bg-gradient-to-r from-emerald-300 to-teal-500",
      text: "text-transparent bg-clip-text"
    },
    FINANCIAL_SUSTAIN: {
      gradient: "bg-gradient-to-r from-purple-300 to-violet-500",
      text: "text-transparent bg-clip-text"
    },
    ABL_COVER_OBLIG: {
      gradient: "bg-gradient-to-r from-orange-300 to-amber-500",
      text: "text-transparent bg-clip-text"
    },
    GENERAL_ADMINSTRATIVE_EXPENSES: {
      gradient: "bg-gradient-to-r from-sky-300 to-cyan-500",
      text: "text-transparent bg-clip-text"
    },
    DONAT_MONEY_RAISING: {
      gradient: "bg-gradient-to-r from-rose-300 to-pink-500",
      text: "text-transparent bg-clip-text"
    }
  };

  const finSymbols={
    GENERAL_ADMINSTRATIVE_EXPENSES:"k",
    PRGRMS_EXPENSES:"k",
  }

  const rawData = [
    {
      id:"EFFECIENT_RESOURCE_MGMT",
      name:indicatorsLabels.FINANCIAL.EFFECIENT_RESOURCE_MGMT,
      value: Math.round(props.indicators.EFFECIENT_RESOURCE_MGMT) % 100,
      timeSeries:[{period:"2024-01",value:5},{period:"2024-02",value:5},{period:"2024-03",value:5},{period:"2024-04",value:5},{period:"2024-05",value:5}],
      fill: "#EE46BC",
    },
    {
      id:"PLATFORM_REV_PERC",
      name:indicatorsLabels.FINANCIAL.PLATFORM_REV_PERC,
      value: Math.round(props.indicators.PLATFORM_REV_PERC) % 100,
      timeSeries:[{period:"2024-01",value:5},{period:"2024-02",value:5},{period:"2024-03",value:5},{period:"2024-04",value:5},{period:"2024-05",value:5}],
      fill: "#F79009",
    },
    {
      id:"PRGMS_PRJKS_REV",
      name:indicatorsLabels.FINANCIAL.PRGMS_PRJKS_REV,
      value:Math.round(props.indicators.PRGMS_PRJKS_REV) % 100,
      timeSeries:[{period:"2024-01",value:5},{period:"2024-02",value:5},{period:"2024-03",value:5},{period:"2024-04",value:5},{period:"2024-05",value:5}],
      fill: "#1F51FF"
    },
    {
      id: "TOTAL_TAX_REFUND",
      name: indicatorsLabels.FINANCIAL.TOTAL_TAX_REFUND,
      value: Math.round(props.indicators.TOTAL_TAX_REFUND) % 100,
      timeSeries:[{period:"2024-01",value:5},{period:"2024-02",value:5},{period:"2024-03",value:5},{period:"2024-04",value:5},{period:"2024-05",value:5}],
      fill: "#17B26A",
    },
    {
      id:"DONAT_PERC",
      name:indicatorsLabels.FINANCIAL.DONAT_PERC,
      value:Math.round(props.indicators.DONAT_PERC) % 100,
      timeSeries:[{period:"2024-01",value:5},{period:"2024-02",value:5},{period:"2024-03",value:5},{period:"2024-04",value:5},{period:"2024-05",value:5}],
      fill:"#800020"
    },
  ]

  const barchartData = [
    {
      name: "2024-01",
      EFFECIENT_RESOURCE_MGMT: 55,
      PLATFORM_REV_PERC: 22,
      PRGMS_PRJKS_REV: 36,
      TOTAL_TAX_REFUND: 12,
      DONAT_PERC: 60
    },
    {
      name: "2024-02",
      EFFECIENT_RESOURCE_MGMT: 51,
      PLATFORM_REV_PERC: 28,
      PRGMS_PRJKS_REV: 44,
      TOTAL_TAX_REFUND: 22,
      DONAT_PERC: 80
    },
    {
      name: "2024-03",
      EFFECIENT_RESOURCE_MGMT: 58,
      PLATFORM_REV_PERC: 32,
      PRGMS_PRJKS_REV: 48,
      TOTAL_TAX_REFUND: 25,
      DONAT_PERC: 75
    },
    {
      name: "2024-04",
      EFFECIENT_RESOURCE_MGMT: 62,
      PLATFORM_REV_PERC: 35,
      PRGMS_PRJKS_REV: 52,
      TOTAL_TAX_REFUND: 28,
      DONAT_PERC: 70
    },
    {
      name: "2024-05",
      EFFECIENT_RESOURCE_MGMT: 65,
      PLATFORM_REV_PERC: 38,
      PRGMS_PRJKS_REV: 55,
      TOTAL_TAX_REFUND: 30,
      DONAT_PERC: 65
    },
    {
      name: "2024-06",
      EFFECIENT_RESOURCE_MGMT: 70,
      PLATFORM_REV_PERC: 42,
      PRGMS_PRJKS_REV: 58,
      TOTAL_TAX_REFUND: 35,
      DONAT_PERC: 85
    },
    {
      name: "2024-07",
      EFFECIENT_RESOURCE_MGMT: 72,
      PLATFORM_REV_PERC: 45,
      PRGMS_PRJKS_REV: 62,
      TOTAL_TAX_REFUND: 38,
      DONAT_PERC: 90
    },
    {
      name: "2024-08",
      EFFECIENT_RESOURCE_MGMT: 68,
      PLATFORM_REV_PERC: 40,
      PRGMS_PRJKS_REV: 58,
      TOTAL_TAX_REFUND: 32,
      DONAT_PERC: 82
    },
    {
      name: "2024-09",
      EFFECIENT_RESOURCE_MGMT: 75,
      PLATFORM_REV_PERC: 48,
      PRGMS_PRJKS_REV: 65,
      TOTAL_TAX_REFUND: 42,
      DONAT_PERC: 88
    },
    {
      name: "2024-10",
      EFFECIENT_RESOURCE_MGMT: 78,
      PLATFORM_REV_PERC: 52,
      PRGMS_PRJKS_REV: 68,
      TOTAL_TAX_REFUND: 45,
      DONAT_PERC: 92
    },
    {
      name: "2024-11",
      EFFECIENT_RESOURCE_MGMT: 82,
      PLATFORM_REV_PERC: 55,
      PRGMS_PRJKS_REV: 72,
      TOTAL_TAX_REFUND: 48,
      DONAT_PERC: 95
    },
    {
      name: "2024-12",
      EFFECIENT_RESOURCE_MGMT: 85,
      PLATFORM_REV_PERC: 58,
      PRGMS_PRJKS_REV: 75,
      TOTAL_TAX_REFUND: 50,
      DONAT_PERC: 98
    }
  ]


 



  return (
    <section>
      <div className="flex flex-wrap gap-5 my-5 w-full justify-between rounded-lg bg-[#13161B] p-1">
        <h5 className="w-full">{"الأداء المالي"}</h5>
      </div>

      <div className="flex  flex-wrap gap-5 my-5 w-full rounded-lg p-5">
        {finPerfCards.map((card: string) => (
          <div className="border p-1 flex flex-col gap-1 rounded-lg">
            <p className="text-[#94979C] text-xl">
              {/*  @ts-ignore  */}
              {indicatorsLabels.FINANCIAL[card]}
            </p>
            <div className="flex gap-3">
            <h5 className={
              `text-2xl font-bold ${finValueThemes[card].gradient} 
              ${finValueThemes[card].text}`}>{Number(props.indicators[card]).toFixed(1)}{finSymbols[card]??"%"}</h5>
              <div className="border p-1 flex justify-center items-center gap-1 text-xs rounded-lg"> {"آخر ثلاث شهور"}<TrendingUp className="w-4 text-green-600"/> </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="w-full mt-4 rounded-lg p-1 bg-[#13161B]">
        <h5 className="">{"تنمية الموارد المالية"}</h5>
        </div>
        <div className=" flex flex-col-reverse gap-2 justify-between items-center mt-8">
          <div className="flex w-full flex-wrap gap-x-8 p-2 rounded-lg border-2 max-h-80 ">
            {rawData.map((card) => (
              <div className="flex justify-center items-center gap-1" key={card.id}>
                <div className="flex items-center my-4 gap-x-4">
                  <div
                    style={{ background: card.fill }}
                    className="rounded-full h-3 w-3"
                  />
                  <h6 className="text-[#94979C]">{card.name}</h6>
                </div>

                <h6 className="text-white">{Number(card.value).toFixed(1)}%</h6>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={400} className="border-2 rounded-lg">
          <BarChart
            width={500}
            height={500}
            data={barchartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="EFFECIENT_RESOURCE_MGMT" fill="#EE46BC" activeBar={<Rectangle fill="#EE46BC" stroke="blue" />} />
          <Bar dataKey="PLATFORM_REV_PERC" fill="#F79009" activeBar={<Rectangle fill="#F79009" stroke="purple" />} />
          <Bar dataKey="PRGMS_PRJKS_REV" fill="#1F51FF" activeBar={<Rectangle fill="#1F51FF" stroke="purple" />} />
          <Bar dataKey="TOTAL_TAX_REFUND" fill="#17B26A" activeBar={<Rectangle fill="#17B26A" stroke="purple" />} />
          <Bar dataKey="DONAT_PERC" fill="#800020" activeBar={<Rectangle fill="#800020" stroke="purple" />} />

          </BarChart>

          </ResponsiveContainer>
          {/* <ResponsiveContainer width={"30%"} height={300}>
            <RadialBarChart
              className="w-full flex"
              innerRadius="90%"
              outerRadius="60%"
              data={devfinIndsCards}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                //@ts-ignore
                minAngle={0}
                label={{ fill: "#22262F", position: "insideStart" }}
                background
                clockWise={true}
                dataKey="value"
                domain={[0, 100]}
              />

              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer> */}
        </div>
      </div>
    </section>
  );

  {
  }
};

export default FinancialDashboard;
