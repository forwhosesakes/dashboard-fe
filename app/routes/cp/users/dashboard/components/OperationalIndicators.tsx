import { indicatorsLabels } from "../constants/glossary";
import ChartPositive from "~/assets/icons/chart-positive.svg?react";
import ChartNegative from "~/assets/icons/chart-negative.svg?react";
import LongChartNegative from "~/assets/icons/longNegativeChart.svg?react";

import CircularProgressBar from "~/components/ui/circular-progress";
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";


export default function OperationalIndicator({
  indicators,
}: {
  indicators: any;
}) {
  console.log("indicators::",indicators);
  
  // const barInds = [
  //   {
  //     value: Number(indicators.DOCS_ARCHIV).toFixed(2),
  //     name: indicatorsLabels.OPERATIONAL.DOCS_ARCHIV,
  //     fill: "url(#paint0_linear_857_15912)",
  //   },
  //   {
  //     value: Number(indicators.QLY_SPEED_PROC_EXEC).toFixed(2),
  //     name: indicatorsLabels.OPERATIONAL.QLY_SPEED_PROC_EXEC,
  //     fill: "url(#paint0_linear_857_15892)",
  //   },
  // ];

  // const areaChartData = [
  //   {
  //     name: "01",
  //     OPS_GOALS_ACH_PERC: Math.round(Number(indicators["OPS_GOALS_ACH_PERC"])),
  //     PGRM_PRJKS_EXEC_PERC: Math.round(
  //       Number(indicators["PGRM_PRJKS_EXEC_PERC"])
  //     ),
  //   },
  //   {
  //     name: "02",
  //     OPS_GOALS_ACH_PERC:
  //       Math.round(Number(indicators["OPS_GOALS_ACH_PERC"])) + 50,
  //     PGRM_PRJKS_EXEC_PERC:
  //       Math.round(Number(indicators["PGRM_PRJKS_EXEC_PERC"])) + 12,
  //   },
  //   {
  //     name: "03",
  //     OPS_GOALS_ACH_PERC:
  //       Math.round(Number(indicators["OPS_GOALS_ACH_PERC"])) - 50,
  //     PGRM_PRJKS_EXEC_PERC:
  //       Math.round(Number(indicators["PGRM_PRJKS_EXEC_PERC"])) - 12,
  //   },
  //   {
  //     name: "04",
  //     OPS_GOALS_ACH_PERC:
  //       Math.round(Number(indicators["OPS_GOALS_ACH_PERC"])) - 15,
  //     PGRM_PRJKS_EXEC_PERC:
  //       Math.round(Number(indicators["PGRM_PRJKS_EXEC_PERC"])) - 29,
  //   },

  //   {
  //     name: "05",
  //     OPS_GOALS_ACH_PERC:
  //       Math.round(Number(indicators["OPS_GOALS_ACH_PERC"])) + 40,
  //     PGRM_PRJKS_EXEC_PERC:
  //       Math.round(Number(indicators["PGRM_PRJKS_EXEC_PERC"])) - 10,
  //   },
  //   {
  //     name: "06",
  //     OPS_GOALS_ACH_PERC:
  //       Math.round(Number(indicators["OPS_GOALS_ACH_PERC"])) + 10,
  //     PGRM_PRJKS_EXEC_PERC:
  //       Math.round(Number(indicators["PGRM_PRJKS_EXEC_PERC"])) - 20,
  //   },
  // ];



  const approvedExpQuar=[
    {
      id:"APPROVED_ACTIVITY_EXPENSES",
      color:"#0088FE", 
      value:Math.round(Number(indicators.children?.APPROVED_ACTIVITY_EXPENSES.value)/Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)*100),



    },
    {
      id:"APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES",
      color:"#725CFA", 
      value:Math.round(Number(indicators.children?.APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES.value)/Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)*100),

   
      


    },  {
      id:"APPROVED_SERVICE_EXPENSES",
      color:"#36EBCA", 
      value:Math.round(Number(indicators.children?.APPROVED_SERVICE_EXPENSES.value)/Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)*100),

      


    },  {
      id:"APPROVED_SALARY_EXPENSES",
      color:"#EE46BC", 
      value:Math.round(Number(indicators.children?.APPROVED_SALARY_EXPENSES.value)/Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)*100),

      


    },  {
      id:"APPROVED_MISCELLANEOUS_EXPENSES",
      color:"#FF8042", 
      value:Math.round(Number(indicators.children?.APPROVED_MISCELLANEOUS_EXPENSES.value)/Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)*100),

      


    },  {
      id:"APPROVED_MARKETING_EXPENSES",
      color:"#FFBB28", 
      value:Math.round(Number(indicators.children?.APPROVED_MARKETING_EXPENSES.value)/Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)*100),

      


    },  {
      id:"APPROVED_OTHER_EXPENSES",
      color:"#00C49F", 
      value:Math.round(Number(indicators.children?.APPROVED_OTHER_EXPENSES.value)/Number(indicators.children?.APPROVED_AMOUNTS_QUARTERLY.value)*100),

      


    },
  ]

  const expQuar=[
    {
      id:"ACTIVITY_EXPENSES",
      color:"#0088FE", 
      value:Math.round(Number(indicators.children?.ACTIVITY_EXPENSES.value)/Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)*100),




    },
    {
      id:"ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES",
      color:"#725CFA", 
      value:Math.round(Number(indicators.children?.ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES.value)/Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)*100),

      


    },  {
      id:"SERVICE_EXPENSES",
      color:"#36EBCA", 
      value:Math.round(Number(indicators.children?.SERVICE_EXPENSES.value)/Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)*100),



    },  {
      id:"SALARY_EXPENSES",
      color:"#EE46BC", 
      value:Math.round(Number(indicators.children?.SALARY_EXPENSES.value)/Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)*100),

      


    },  {
      id:"MISCELLANEOUS_EXPENSES",
      color:"#FF8042", 
      value:Math.round(Number(indicators.children?.MISCELLANEOUS_EXPENSES.value)/Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)*100),

      


    },  {
      id:"OTHER_EXPENSES",
      color:"#FFBB28", 
      value:Math.round(Number(indicators.children?.OTHER_EXPENSES.value)/Number(indicators.children?.DISBURSED_AMOUNTS_QUARTERLY.value)*100),

      


    }
  ]


  

  const Bullet = ({ backgroundColor, size }:any) => {
    return (
      <div
        className="CirecleBullet"
        style={{
          backgroundColor,
          width: size,
          height: size
        }}
      ></div>
    );
  };
  const CustomizedLegend = (props:any) => {
    const { payload } = props;
    console.log("props in CustomizedLegend", props);
    
    return (
      <ul className="flex gap-x-4 flex-wrap w-3/5 LegendList">
        {payload.map((entry:any, index:number) => (
          <li key={`item-${index}`}>
            <div className="BulletLabel">
              <Bullet backgroundColor={entry.payload.fill} size="8px" />
              <div className="BulletLabelText">{indicatorsLabels.OPERATIONAL[entry.payload.id as keyof typeof indicatorsLabels.OPERATIONAL]}</div>
            </div>
            <div style={{ marginLeft: "20px" }}>{entry.payload.value}%</div>
          </li>
        ))}
      </ul>
    );
  };
  
  const CustomLabel = ({ viewBox, labelText, value }:any) => {
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
    <section className="px-28">
        <div className=" flex gap-16 h-full w-full">
      

        <div className="w-full [&_recharts-legend-wrapper]:bottom-[12px] h-[350px]">
        <div className="rounded-lg w-full bg-[#13161B] p-1.5">
            <h4 className="w-full text-xl xl:text-2xl">
              {"المبالغ المصروفة"}
            </h4>
          </div>
          <ResponsiveContainer width="100%" height="100%">
          <PieChart
            width={500}
            height={400}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
          <Pie
            data={expQuar}
            dataKey="value"
            cx={100}
            cy={100}
            innerRadius={80}
            outerRadius={100}
          >
            {expQuar.map((entry, index) => (
              <Cell
              
                key={`cell-${index}`}
                fill={entry.color}
              />
            ))}
            {/* <Label
              content={<CustomLabel labelText="ICPs" value={15} />}
              position="center"
            /> */}
          </Pie>
          <Legend wrapperStyle={{bottom:"auto", top: '3rem'}} content={<CustomizedLegend  />} />
        </PieChart>
      
          </ResponsiveContainer>
        </div>


        <div className="w-full [&_recharts-legend-wrapper]:bottom-[12px] h-[350px]">
        <div className="rounded-lg w-full bg-[#13161B] p-1.5">
            <h4 className="w-full text-xl xl:text-2xl">
            {"المبالغ المعتمدة"}

            </h4>
          </div>
          <ResponsiveContainer width="100%" height="100%">
          <PieChart
            width={500}
            height={400}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
          <Pie
            data={approvedExpQuar}
            dataKey="value"
            cx={100}
            cy={100}
            innerRadius={80}
            outerRadius={100}
          >
            {approvedExpQuar.map((entry, index) => (
              <Cell
              
                key={`cell-${index}`}
                fill={entry.color}
              />
            ))}
            {/* <Label
              content={<CustomLabel labelText="ICPs" value={15} />}
              position="center"
            /> */}
          </Pie>
          <Legend wrapperStyle={{bottom:"auto", top: '3rem'}} content={<CustomizedLegend  />} />
        </PieChart>
      
          </ResponsiveContainer>
        </div>
      </div>
      {/* إدارة البرامج والمشاريع + إدارة التطوع */}
      <div className="flex mb-5 w-full gap-16">
        {/* إدارة البرامج والمشاريع */}
        <div className="flex flex-col w-4/12">
          <div className="rounded-lg bg-[#13161B] p-2">
            <h4 className="w-full text-xl xl:text-3xl">
            {"  نسبة الوصول للفئة المستهدفة	"}
            </h4>
          </div>
          <div className="flex justify-center p-1 gap-12 mb-10 text-center items-center ">
            <div className="w-fit">
              <CircularProgressBar
                gradientStart="#1882FF" // green-500
                gradientEnd="#36EBCA" // green-600
                gradientId={"REACH_TARGET_AUD_PERC"}
                size="md"
                progress={Math.round(Number(indicators["REACH_TARGET_AUD_PERC"]))}
                textFillColor="fill-white"
                trackColor="#22262F"
              />
            </div>
          </div>
        </div>

        {/* إدارة التطوع */}
        <div className="flex flex-col w-8/12">
          <div className="rounded-lg bg-[#13161B] p-2">
            <h4 className="w-full text-xl xl:text-3xl">{"إدارة التطوع"}</h4>
          </div>

          <div className="w-full flex gap-2 flex-col h-full ">
            <div className="flex w-full my-5 gap-7 justify-between">
              <div className="flex flex-col w-full border-2 border-[#13161B] rounded-lg min-w-64 gap-5 shadow-custom">
                <div className="bg-[#13161B] p-1.5">
                  <h6 className="text-xl">{"نسبة استدامة المتطوعين"}</h6>
                </div>
                <div className="p-5">
                  <h4 className="text-">
                    {Number(indicators["VOLUN_SUST_PERC"]).toFixed(2) + "%"}
                  </h4>
                  {Number(indicators["VOLUN_SUST_PERC"]) < 0 ? (
                    <ChartNegative  className="w-full h-auto"/>
                  ) : (
                    <ChartPositive className="w-full h-auto"/>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full border-2 border-[#13161B] rounded-lg min-w-64 gap-5 shadow-custom">
                <div className="bg-[#13161B] p-1.5">
                  <h6 className="text-xl">{"مساهمة المتطوعين في تنفيذ المشاريع  "}</h6>
                </div>
                <div className="p-5">
                  <h6 className=" text-nowrap text-[16px]">
                    {indicatorsLabels.OPERATIONAL["VOLN_CONTR_PRJKS_EXEC"]}
                  </h6>
                  <h4 className="text-">
                    {Number(indicators["VOLN_CONTR_PRJKS_EXEC"]).toFixed(2) + "%"}
                  </h4>
                  {Number(indicators["VOLN_CONTR_PRJKS_EXEC"]) < 0 ? (
                    <ChartNegative className="w-full h-auto"/>
                  ) : (
                    <ChartPositive className="w-full h-auto"/>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex">
              <div className="flex flex-col border-2 border-[#13161B] rounded-lg min-w-64 w-full gap-5 shadow-custom">
                <div className="bg-[#13161B] w-full p-1.5">
                  <h6 className="text-xl">{"معدل النمو الربعي للمتطوعين"}</h6>
                </div>
                <div className="p-5 w-full">
                  <h4 className="text-">
                    {Number(indicators["VOLUN_GROWTH_RATE_QUAR"]).toFixed(2) +
                      "%"}
                  </h4>
                  {Number(indicators["VOLUN_GROWTH_RATE_QUAR"]) < 0 ? (
                    <LongChartNegative className="w-full h-auto"/>
                  ) : (
                    <ChartPositive />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       

      {/* كفاءة العمليات الداخلية */}
      {/* <div className=" flex gap-16 h-full w-full">
        <div className="flex flex-col w-4/12">
          <div className="rounded-lg w-full bg-[#13161B] p-1.5">
            <h4 className="w-full text-xl xl:text-2xl">
              {"كفاءة العمليات الداخلية"}
            </h4>
          </div>
          <div className="h-full w-full flex flex-col gap-3 justify-center">
            <div className="flex gap-2 items-center">
              <div className="bg-gradient-to-t from-green-400 to-green-300 w-[10px] h-[10px] rounded-xs"></div>
              <p className="text-[#94979C] text-xl">تنفيذ البرامج والمشاريع</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-gradient-to-t from-orange-400 to-orange-300 w-[10px] h-[10px] rounded-xs"></div>
              <p className="text-[#94979C] text-xl">تحقيق الأهداف التشغيلية</p>
            </div>
          </div>
        </div>

        <div className="w-8/12 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={areaChartData}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0,100]}  width={35} textAnchor="left" orientation="left"/>
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />

              <Area
                type="linear"
                dataKey="OPS_GOALS_ACH_PERC"
                stroke="#8884d8"
                fill="#ff9b00"
              />
              <Area
                type="linear"
                dataKey="PGRM_PRJKS_EXEC_PERC"
                stroke="#8884d8"
                fill="#00c800"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div> */}
    </section>
    // <>
    //   <div className="h-full w-full  gap-8 flex flex-col">

    //     <div className="w-full flex gap-3">
    //       <div className=" p-5 flex flex-col w-3/5  rounded-lg">
    //         <h5 className="mb-4"> تنفيذ الخطة التشغيلية</h5>
    //         <div className="flex flex-col justify-between p-2 gap-4">
    //           <div className="relative flex flex-col p-5 border bg-[#13161B] border-[#5C626D] rounded-lg min-w-64 h-44 gap-5 shadow-custom">
    //             <h6 className="text-[16px]">
    //               {indicatorsLabels.OPERATIONAL["PGRM_PRJKS_EXEC_PERC"]}
    //             </h6>
    //             <h4 className="text-">
    //               {Number(indicators["PGRM_PRJKS_EXEC_PERC"]).toFixed(2) + "%"}
    //             </h4>
    //             <Progress
    //               className="[&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-yellow-400 w-full h-2.5 bg-gray-700"
    //               value={Math.round(indicators["PGRM_PRJKS_EXEC_PERC"])}
    //             />
    //           </div>
    //           <div className="relative flex flex-col p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64 h-44 gap-5 shadow-custom">
    //             <h6 className="text-[16px]">
    //               {indicatorsLabels.OPERATIONAL["OPS_GOALS_ACH_PERC"]}
    //             </h6>
    //             <h4 className="text-">
    //               {Number(indicators["OPS_GOALS_ACH_PERC"]).toFixed(2) + "%"}
    //             </h4>
    //             <Progress
    //               className="[&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-yellow-400 w-full h-2.5 bg-gray-700"
    //               value={Math.round(indicators["OPS_GOALS_ACH_PERC"])}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-2/5 p-5 rounded-lg flex flex-col h-44">
    //         <h5 className="mb-4"> إدارة البرامج و المشاريع</h5>
    //         <div className="flex flex-col justify-between p-2 gap-4">
    //           <div>
    //             <div className="relative flex  p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64  gap-5 shadow-custom">
    //               <div>
    //                 <h6 className=" text-nowrap text-[16px]">
    //                   {indicatorsLabels.OPERATIONAL["EFFIC_PRJKS_EXEC"]}
    //                 </h6>
    //                 <h4 className="text-">
    //                   {Number(indicators["EFFIC_PRJKS_EXEC"]).toFixed(2) + "%"}
    //                 </h4>
    //               </div>

    //               <CircularProgressBar
    //                 gradientStart="#EF7BE3" // green-500
    //                 gradientEnd="#FF5A5A" // green-600
    //                 gradientId={"EFFIC_PRJKS_EXEC"}
    //                 size="md"
    //                 progress={Number(indicators["EFFIC_PRJKS_EXEC"])}
    //               />
    //             </div>
    //           </div>

    //           <div className="relative flex  p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64  gap-5 shadow-custom">
    //             <div>
    //               <h6 className="text-[16px] text-nowrap">
    //                 {indicatorsLabels.OPERATIONAL["EFFITV_PRJKS_PGRM"]}
    //               </h6>
    //               <h4 className="text-">
    //                 {Number(indicators["EFFITV_PRJKS_PGRM"]).toFixed(2) + "%"}
    //               </h4>
    //             </div>

    //             <CircularProgressBar
    //               gradientStart="#1882FF" // green-500
    //               gradientEnd="#36EBCA" // green-600
    //               size="md"
    //               gradientId={"EFFITV_PRJKS_PGRM"}
    //               progress={Number(indicators["EFFITV_PRJKS_PGRM"])}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div>
    //       <h5 className="my-5">إدارة التطوع</h5>

    //       <div className="flex  gap-8">
    //         <div className="flex flex-col  p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64  gap-5 shadow-custom">

    //             <h6 className=" text-nowrap text-[16px]">
    //               {indicatorsLabels.OPERATIONAL["VOLUN_GROWTH_RATE_QUAR"]}
    //             </h6>
    //             <h4 className="text-">
    //               {Number(indicators["VOLUN_GROWTH_RATE_QUAR"]).toFixed(2) +
    //                 "%"}
    //             </h4>
    //             {Number(indicators["VOLUN_GROWTH_RATE_QUAR"]) < 0 ? (
    //               <ChartNegative />
    //             ) : (
    //               <ChartPositive />
    //             )}

    //         </div>
    //       <div className="flex flex-col  p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64  gap-5 shadow-custom">

    //           <h6 className=" text-nowrap text-[16px]">
    //             {indicatorsLabels.OPERATIONAL["VOLUN_SUST_PERC"]}
    //           </h6>
    //           <h4 className="text-">
    //             {Number(indicators["VOLUN_SUST_PERC"]).toFixed(2) + "%"}
    //           </h4>
    //           {Number(indicators["VOLUN_SUST_PERC"]) < 0 ? (
    //             <ChartNegative />
    //           ) : (
    //             <ChartPositive />
    //           )}

    //       </div>
    //     </div>
    //     </div>

    //     <div className="rounded-lg p-8 flex-wrap gap-5  bg-[#13161B]  h-[550px] w-full my-5">
    //       <h5 className="my-5">كفاءة العمليات الداخلية</h5>

    //           <ResponsiveContainer width="100%" height="80%">
    //                   <BarChart
    //                     width={800}
    //                     height={400}
    //                     data={barInds}
    //                     margin={{
    //                       top: 5,
    //                       right: 30,
    //                       left: 20,
    //                       bottom: 5,
    //                     }}
    //                   >
    //                     <defs>
    //                       <linearGradient
    //                         id="paint0_linear_857_15912"
    //                         x1="19.4768"
    //                         y1="144"
    //                         x2="19.4768"
    //                         y2="90"
    //                         gradientUnits="userSpaceOnUse"
    //                       >
    //                         <stop stop-color="#1882FF" />
    //                         <stop offset="1" stop-color="#36EBCA" />
    //                       </linearGradient>

    //                       <linearGradient
    //                         id="paint0_linear_857_15917"
    //                         x1="32"
    //                         y1="97.2632"
    //                         x2="8.34548"
    //                         y2="97.2632"
    //                         gradientUnits="userSpaceOnUse"
    //                       >
    //                         <stop stop-color="#36F097" />
    //                         <stop offset="1" stop-color="#36F097" stop-opacity="0.2" />
    //                       </linearGradient>

    //                       <linearGradient
    //                         id="paint0_linear_857_15907"
    //                         x1="19.4768"
    //                         y1="144"
    //                         x2="19.4768"
    //                         y2="90"
    //                         gradientUnits="userSpaceOnUse"
    //                       >
    //                         <stop stop-color="#EF7BE3" />
    //                         <stop offset="1" stop-color="#FF5A5A" />
    //                       </linearGradient>

    //                       <linearGradient
    //                         id="paint0_linear_857_15897"
    //                         x1="16.6957"
    //                         y1="88"
    //                         x2="16.6957"
    //                         y2="55"
    //                         gradientUnits="userSpaceOnUse"
    //                       >
    //                         <stop stop-color="#FBE947" />
    //                         <stop offset="1" stop-color="#58D764" />
    //                       </linearGradient>

    //                       <linearGradient
    //                         id="paint0_linear_857_15892"
    //                         x1="0.5"
    //                         y1="123.5"
    //                         x2="32.5"
    //                         y2="123.5"
    //                         gradientUnits="userSpaceOnUse"
    //                       >
    //                         <stop stop-color="#725CFA" />
    //                         <stop offset="1" stop-color="#EF7BE3" />
    //                       </linearGradient>
    //                     </defs>
    //                     <CartesianGrid strokeDasharray="3 3" />
    //                     <XAxis dataKey="name" />
    //                     <YAxis />
    //                     <Tooltip
    //                       label={"القيمة"}
    //                       wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
    //                       formatter={function (total) {
    //                         return `${total}`;
    //                       }}
    //                     />

    //                     <Bar barSize={20} dataKey="value" width={5} radius={[10, 10, 0, 0]} />
    //                   </BarChart>
    //                 </ResponsiveContainer>
    //     </div>
    //   </div>
    // </>
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
