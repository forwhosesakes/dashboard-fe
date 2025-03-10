import { indicatorsLabels } from "../constants/glossary";
import SemiCircleProgressBar from "~/components/ui/half-circular-progress";
import SaudiArabiaSvg from "~/assets/images/saudi-arabia.svg?react";

import PulseLocationSvg from "~/assets/images/pulse-location.svg?react";
import UnderConstructionCard from "~/components/ui/under-construction";

interface IProps {
  indicators: any;
  category:string
}
const GeneralDashboard = ({ indicators }: IProps) => {
  const cards = [
    // {
    //   label: "GENERAL_PERFORMANCE",
    //   value: indicators.GENERAL_PERFORMANCE,
    //   gradientStart: "#725CFA",
    //   gradientEnd: "#EF7BE3",
    // },
    {
        label: "GOVERANCE",
        value: indicators.GOVERANCE,
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


  const progressCards  = [
    {
        label: "GENERAL_PERFORMANCE",
        value: indicators.GENERAL_PERFORMANCE,
    
      },
  ]

  return (
    <section className="max-h-[95vh] overflow-hidden">
      <div className="flex flex-wrap gap-4">
        {cards.filter((c)=>c.value).map((card) => (
          <div className="flex flex-col p-5 items-center justify-center rounded-md border border-[#22262F]">
            <h6>
              {
                // @ts-ignore
                indicatorsLabels.GENERAL[card.label]
              }
            </h6>
           
            {
               indicators[card.label]==null || indicators[card.label] == "NaN"?<UnderConstructionCard/>:
              <SemiCircleProgressBar
              size={"md"}
              progress={Math.round(Number(indicators[card.label]))}
              gradientStart={card.gradientStart}
              gradientEnd={card.gradientEnd}
            />}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-between mt-4 px-8 ">
        <div>
            <h5>خارطة الخفجي</h5>
        </div>
        <div className="w-3/5  relative">
        {[
          "bottom-32 right-20",
          "bottom-32 right-32",
          "bottom-44 right-40",
          "bottom-64 right-40",
          "bottom-80 right-44",
        ].map((el) => (
          <PulseLocationSvg
            width={32}
            height={32}
            className={el + " absolute "}
          />
        ))}
        <SaudiArabiaSvg  className="w-2/5" />

        </div>
        
 

      </div>
    </section>
  );
};

export default GeneralDashboard;
