import { Progress } from "~/components/ui/progress";
import { OperationalIndicators } from "../constants/glossary";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

export default function OperationalIndicator({
  indicators,
}: {
  indicators: Record<string, number>;
}) {
  return (
    <>
      <div className="h-full w-full border border-red-600 gap-8 flex flex-col">
        <div className="w-full  flex gap-3">
          <div className="border flex flex-col w-1/3  border-white rounded-lg">
            <p className="text-primary-foreground text-xl">كفاءة التنفيذ</p>
            <div className="flex flex-wrap justify-between p-2 gap-4">
              {/* EFFIC_INTERNAL_OPS */}
              <div className="flex flex-col border p-2 rounded-lg w-[48%]">
                <p className="text-primary-foreground text-sm">
                  {OperationalIndicators["EFFIC_INTERNAL_OPS"]}
                </p>
                <h5>{Math.round(indicators["EFFIC_INTERNAL_OPS"])}%</h5>
                <Progress
                  className="[&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-yellow-400 w-full h-2.5 bg-gray-700"
                  value={Math.round(indicators["EFFIC_INTERNAL_OPS"])}
                />
              </div>

              {/* VOLN_MGMT */}
              <div className="flex flex-col border p-2 rounded-lg w-[48%]">
                <p className="text-primary-foreground text-sm">
                  {OperationalIndicators["VOLN_MGMT"]}
                </p>
                <h5>{Math.round(indicators["VOLN_MGMT"])}%</h5>
                <Progress
                  className="[&>div]:bg-gradient-to-r [&>div]:from-green-900 [&>div]:to-green-300 w-full h-2.5 bg-gray-700"
                  value={Math.round(indicators["VOLN_MGMT"])}
                />
              </div>

              {/* OPS_PLAN_EXEC */}
              <div className="flex flex-col border p-2 rounded-lg w-[48%]">
                <p className="text-primary-foreground text-sm">
                  {OperationalIndicators["OPS_PLAN_EXEC"]}
                </p>
                <h5>{Math.round(indicators["OPS_PLAN_EXEC"])}%</h5>
                <Progress
                  className="[&>div]:bg-gradient-to-r [&>div]:from-purple-200 [&>div]:via-pink-400 [&>div]:to-red-400 w-full h-2.5 bg-gray-700"
                  value={Math.round(indicators["OPS_PLAN_EXEC"]) + 80}
                />
              </div>

              {/* PRJKT_PRGM_MGMT */}
              <div className="flex flex-col border p-2 rounded-lg w-[48%]">
                <p className="text-primary-foreground text-sm">
                  {OperationalIndicators["PRJKT_PRGM_MGMT"]}
                </p>
                <h5>{Math.round(indicators["PRJKT_PRGM_MGMT"])}%</h5>
                <Progress
                  className="[&>div]:bg-gradient-to-r [&>div]:from-blue-700 [&>div]:to-blue-300 w-full h-2.5 bg-gray-700"
                  value={Math.round(indicators["PRJKT_PRGM_MGMT"]) + 80}
                />
              </div>
            </div>
          </div>
          <div className="border flex flex-col border-white w-2/3 rounded-lg">
            <RadialBarChart
              width={730}
              height={250}
              innerRadius="90%"
              outerRadius="60%"
              data={[
                {
                  name: "a",
                  value: 80,
                  x:1,
                  fill: "#8884d8",
                },
                {
                  name: "b",
                  value: 77,
                  fill: "#ffc658",
                },
                {
                  name: "c",
                  value: 60,
                  fill: "#83a6ed",
                },
              ]}
              startAngle={90}
              endAngle={450}
            >
                <PolarAngleAxis  dataKey={"value"} domain={[0, 100]} />
              <RadialBar
                minAngle={0}
                label={{ fill: "#666", position: "insideStart" }}
                background
                clockWise={true}
                dataKey="value"
                domain={[0,100]}
              />
              <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
              <Tooltip />
            </RadialBarChart>
          </div>
        </div>
        <div className="w-full border border-white rounded-lg flex flex-col h-44">
            <h6>
                كفاءة التنفيذ
            </h6>

            

        </div>
      </div>
    </>
  );
}
