import { Progress } from "~/components/ui/progress";
import { indicatorsLabels } from "../constants/glossary";
import ChartPositive from "~/assets/icons/chart-positive.svg?react";
import ChartNegative from "~/assets/icons/chart-negative.svg?react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,

} from "recharts";
import CircularProgressBar from "~/components/ui/circular-progress";

export default function OperationalIndicator({
  indicators,
}: {
  indicators: Record<string, number>;
}) {

  const barInds = [
     {
          value: Number(indicators.DOCS_ARCHIV).toFixed(2),
          name: indicatorsLabels.OPERATIONAL.DOCS_ARCHIV,
          fill: "url(#paint0_linear_857_15912)",
        },
        {
          value: Number(indicators.QLY_SPEED_PROC_EXEC).toFixed(2),
          name: indicatorsLabels.OPERATIONAL.QLY_SPEED_PROC_EXEC,
          fill: "url(#paint0_linear_857_15892)",
        },
  ]
  return (
    <>
      <div className="h-full w-full  gap-8 flex flex-col">

  
        <div className="w-full  flex gap-3">
          <div className=" p-5 flex flex-col w-3/5  rounded-lg">
            <h5 className="mb-4"> تنفيذ الخطة التشغيلية</h5>
            <div className="flex flex-col justify-between p-2 gap-4">
              <div className="relative flex flex-col p-5 border bg-[#13161B] border-[#5C626D] rounded-lg min-w-64 h-44 gap-5 shadow-custom">
                <h6 className="text-[16px]">
                  {indicatorsLabels.OPERATIONAL["PGRM_PRJKS_EXEC_PERC"]}
                </h6>
                <h4 className="text-">
                  {Number(indicators["PGRM_PRJKS_EXEC_PERC"]).toFixed(2) + "%"}
                </h4>
                <Progress
                  className="[&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-yellow-400 w-full h-2.5 bg-gray-700"
                  value={Math.round(indicators["PGRM_PRJKS_EXEC_PERC"])}
                />
              </div>
              <div className="relative flex flex-col p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64 h-44 gap-5 shadow-custom">
                <h6 className="text-[16px]">
                  {indicatorsLabels.OPERATIONAL["OPS_GOALS_ACH_PERC"]}
                </h6>
                <h4 className="text-">
                  {Number(indicators["OPS_GOALS_ACH_PERC"]).toFixed(2) + "%"}
                </h4>
                <Progress
                  className="[&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-yellow-400 w-full h-2.5 bg-gray-700"
                  value={Math.round(indicators["OPS_GOALS_ACH_PERC"])}
                />
              </div>
            </div>
          </div>
          <div className="w-2/5 p-5 rounded-lg flex flex-col h-44">
            <h5 className="mb-4"> إدارة البرامج و المشاريع</h5>
            <div className="flex flex-col justify-between p-2 gap-4">
              <div>
                <div className="relative flex  p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64  gap-5 shadow-custom">
                  <div>
                    <h6 className=" text-nowrap text-[16px]">
                      {indicatorsLabels.OPERATIONAL["EFFIC_PRJKS_EXEC"]}
                    </h6>
                    <h4 className="text-">
                      {Number(indicators["EFFIC_PRJKS_EXEC"]).toFixed(2) + "%"}
                    </h4>
                  </div>

                  <CircularProgressBar
                    gradientStart="#EF7BE3" // green-500
                    gradientEnd="#FF5A5A" // green-600
                    gradientId={"EFFIC_PRJKS_EXEC"}
                    size="md"
                    progress={Number(indicators["EFFIC_PRJKS_EXEC"])}
                  />
                </div>
              </div>

              <div className="relative flex  p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64  gap-5 shadow-custom">
                <div>
                  <h6 className="text-[16px] text-nowrap">
                    {indicatorsLabels.OPERATIONAL["EFFITV_PRJKS_PGRM"]}
                  </h6>
                  <h4 className="text-">
                    {Number(indicators["EFFITV_PRJKS_PGRM"]).toFixed(2) + "%"}
                  </h4>
                </div>

                <CircularProgressBar
                  gradientStart="#1882FF" // green-500
                  gradientEnd="#36EBCA" // green-600
                  size="md"
                  gradientId={"EFFITV_PRJKS_PGRM"}
                  progress={Number(indicators["EFFITV_PRJKS_PGRM"])}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="my-5">إدارة التطوع</h5>

          <div className="flex  gap-8">
            <div className="flex flex-col  p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64  gap-5 shadow-custom">
          
                <h6 className=" text-nowrap text-[16px]">
                  {indicatorsLabels.OPERATIONAL["VOLUN_GROWTH_RATE_QUAR"]}
                </h6>
                <h4 className="text-">
                  {Number(indicators["VOLUN_GROWTH_RATE_QUAR"]).toFixed(2) +
                    "%"}
                </h4>
                {Number(indicators["VOLUN_GROWTH_RATE_QUAR"]) < 0 ? (
                  <ChartNegative />
                ) : (
                  <ChartPositive />
                )}
             
            </div>
          <div className="flex flex-col  p-5 bg-[#13161B] border border-[#5C626D] rounded-lg min-w-64  gap-5 shadow-custom">
        
              <h6 className=" text-nowrap text-[16px]">
                {indicatorsLabels.OPERATIONAL["VOLUN_SUST_PERC"]}
              </h6>
              <h4 className="text-">
                {Number(indicators["VOLUN_SUST_PERC"]).toFixed(2) + "%"}
              </h4>
              {Number(indicators["VOLUN_SUST_PERC"]) < 0 ? (
                <ChartNegative />
              ) : (
                <ChartPositive />
              )}
        
          </div>
        </div>
        </div>




        <div className="rounded-lg p-8 flex-wrap gap-5  bg-[#13161B]  h-[550px] w-full my-5">
          <h5 className="my-5">كفاءة العمليات الداخلية</h5>


              <ResponsiveContainer width="100%" height="80%">
                      <BarChart
                        width={800}
                        height={400}
                        data={barInds}
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
                            x1="19.4768"
                            y1="144"
                            x2="19.4768"
                            y2="90"
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
          
                        <Bar barSize={20} dataKey="value" width={5} radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
