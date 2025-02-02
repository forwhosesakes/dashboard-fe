import { Legend, PolarAngleAxis, RadialBar, RadialBarChart, Tooltip } from "recharts"

const FinancialDashboard = ()=>{




    return <>financial 
    
    
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
                    x: 1,
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
                <PolarAngleAxis dataKey={"value"} domain={[0, 100]} />
                <RadialBar
                  //@ts-ignore
                  minAngle={0}
                  label={{ fill: "#666", position: "insideStart" }}
                  background
                  clockWise={true}
                  dataKey="value"
                  domain={[0, 100]}
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
    </>
}

export default FinancialDashboard