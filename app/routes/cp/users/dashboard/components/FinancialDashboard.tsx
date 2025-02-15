import {
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { indicatorsLabels } from "../constants/glossary";
interface IProps {
  indicators: any;
}
const FinancialDashboard = (props: IProps) => {
  const finPerfCards = [
    "ABL_COVER_OBLIG",
    "ADMIN_EXPENSES",
    "PRGRMS_EXPENSES",
    "FINANCIAL_SUSTAIN",
    "DONAT_MONEY_RAISING",
  ];

  const devfinIndsCards = [
    {
      id:"DIVERSITY_INCOME_RESOURCES",
      name: indicatorsLabels.FINANCIAL.DIVERSITY_INCOME_RESOURCES,
      value: Math.round(props.indicators.DIVERSITY_INCOME_RESOURCES) % 100,
      fill: "#F79009",
    },
    {
      id:"EFFECIENT_RESOURCE_MGMT",
      name: indicatorsLabels.FINANCIAL.EFFECIENT_RESOURCE_MGMT,
      value: Math.round(props.indicators.EFFECIENT_RESOURCE_MGMT) % 100,
      fill: "#EE46BC",
    },
    {
      id:"TOTAL_TAX_REFUND",
      name: indicatorsLabels.FINANCIAL.TOTAL_TAX_REFUND,
      value: Math.round(props.indicators.TOTAL_TAX_REFUND) % 100,
      fill: "#17B26A",
    },
  ];
  

  return (
    <section>
      <div className="flex flex-wrap gap-5 my-5 w-full justify-between rounded-lg bg-[#13161B] p-5">
        <h5 className="w-full">{"الأداء المالي"}</h5>
        {finPerfCards.map((card: string) => (
          <div>
            <p className="text-[#94979C]">
              {/*  @ts-ignore  */}
              {indicatorsLabels.FINANCIAL[card]}
            </p>

            <h6>{Number(props.indicators[card]).toFixed(2)}</h6>
          </div>
        ))}
      </div>

      <div>
        <h5 className="mt-4">{"تنمية الموارد المالية"}</h5>
        <div className=" flex justify-between items-center">
          <div className="flex gap-x-8">
            {devfinIndsCards.map((card)=><div  key={card.id}> 
              <div className="flex my-4 gap-x-4">
              <div style={{background:card.fill}}  className="rounded-full h-4 w-4"/>
              <h6 className="text-[#94979C]">{card.name}</h6>
              </div>
    
              <h3 className="text-white">{Number(card.value).toFixed(2)}%</h3>

        
            </div>)}
          </div>
        <ResponsiveContainer width={"30%"} height={300}>
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
          
          </ResponsiveContainer>
   
        </div>
      </div>
    </section>
  );

  {
  }
};

export default FinancialDashboard;
