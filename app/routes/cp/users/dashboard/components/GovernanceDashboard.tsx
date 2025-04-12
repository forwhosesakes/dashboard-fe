import { useSidebarStore } from "~/lib/store/sidebar-store";
import { cn } from "~/lib/tw-merge";
import TestingIcon from "~/assets/icons/Layer_1.webp";
import UnderConstructionCard from "~/components/ui/under-construction";
import { isNumeric } from "~/lib/utils/indicators";
import GradientText from "~/components/gardient-text";
import { Progress } from "~/components/ui/progress";
import CircularProgressBar from "~/components/ui/circular-progress";
import { governanceLabels, indicatorsLabels } from "../constants/glossary";


interface IProps {
  indicators: any;
  role: string;
  logoUrl: string;
  isFullscreen: boolean;
}


const getNumericVal = (val:any)=>{
   return  isNumeric(val)?parseFloat( Number(val ).toFixed(2)):0
}

const GovernanceDashboard = (props: IProps) => {
  const { isExpanded } = useSidebarStore();
//   console.log("indicators", props.indicators);

  let {
    COMPLIANCE_ADHERENCE_INDICATORS,
    FINANCIAL_SAFETY_INDICATORS,
    TRANSPARENCY_DISCLOSURE_INDICATORS,
  } = props.indicators.governance;
  try {
    COMPLIANCE_ADHERENCE_INDICATORS = JSON.parse(
      COMPLIANCE_ADHERENCE_INDICATORS
    );
    FINANCIAL_SAFETY_INDICATORS = JSON.parse(FINANCIAL_SAFETY_INDICATORS);
    TRANSPARENCY_DISCLOSURE_INDICATORS = JSON.parse(
      TRANSPARENCY_DISCLOSURE_INDICATORS
    );
  } catch (e) {
    console.log("error parsing governance indicators", e);
  }

  const complianceAdherenceIndicators = [
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .BASIC_BYLAWS_OF_THE_ASSOCIATION,
      value: getNumericVal(

          COMPLIANCE_ADHERENCE_INDICATORS?.BASIC_BYLAWS_OF_THE_ASSOCIATION
    
      ),
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      label: governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS.GENERAL_ASSEMBLY,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.GENERAL_ASSEMBLY
      ),
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .BOARD_OF_DIRECTORSRetryY,
      value: getNumericVal(
      
          COMPLIANCE_ADHERENCE_INDICATORS?.BOARD_OF_DIRECTORSRetryY
 
      ),
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS.BRANCHES_AND_OFFICES,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.BRANCHES_AND_OFFICES
      ),
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },
    {
      label: governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS.REPORTS,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.REPORTS
      ),
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .REGULATIONS_IN_FORCE_IN_THE_KINGDOM,
      value: getNumericVal(
    
          COMPLIANCE_ADHERENCE_INDICATORS?.REGULATIONS_IN_FORCE_IN_THE_KINGDOM
    
      ),
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .ACTIVITIES_EVENTS_AND_CONTRACTS,
      value: getNumericVal(
    
          COMPLIANCE_ADHERENCE_INDICATORS?.ACTIVITIES_EVENTS_AND_CONTRACTS
 
      ),
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .REVENUES_EXPENSES_AND_OWNERSHIP,
      value: getNumericVal(
  
          COMPLIANCE_ADHERENCE_INDICATORS?.REVENUES_EXPENSES_AND_OWNERSHIP

      ),
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS.DOCUMENTS_AND_RECORDS,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.DOCUMENTS_AND_RECORDS
      ),
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .FORMATION_OF_COMMITTEES,
      value: getNumericVal(
      
          COMPLIANCE_ADHERENCE_INDICATORS?.FORMATION_OF_COMMITTEES
  
      ),
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
  ];

  const transparencyDisclosure = [
    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .REGULATIONS_AND_BYLAWS,
      value: getNumericVal(
   
          TRANSPARENCY_DISCLOSURE_INDICATORS?.REGULATIONS_AND_BYLAWS

      ),
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .INFORMATION_OF_THOSE_IN_CHARGE_OF_THE_ASSOCIATION,
      value: getNumericVal(
   
          TRANSPARENCY_DISCLOSURE_INDICATORS?.INFORMATION_OF_THOSE_IN_CHARGE_OF_THE_ASSOCIATION
    
      ),
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .ASSOCIATION_INFORMATION,
      value: getNumericVal(
     
          TRANSPARENCY_DISCLOSURE_INDICATORS?.ASSOCIATION_INFORMATION
 
      ),
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .OBJECTIVES_AND_PROGRAMS_OF_THE_ASSOCIATION,
      value: getNumericVal(
      
          TRANSPARENCY_DISCLOSURE_INDICATORS?.OBJECTIVES_AND_PROGRAMS_OF_THE_ASSOCIATION

      ),
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .FINANCIAL_STATEMENTS,
      value: getNumericVal(
  
          TRANSPARENCY_DISCLOSURE_INDICATORS?.FINANCIAL_STATEMENTS
 
      ),
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS.DISCLOSURE_FORM,
      value: getNumericVal(
        TRANSPARENCY_DISCLOSURE_INDICATORS?.DISCLOSURE_FORM
      ),
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
  ];

  const financialSafetyIndicators = [
    {
      label:
        governanceLabels.FINANCIAL_SAFETY_INDICATORS
          .ORGANIZATIONAL_STRUCTURE,
      value: getNumericVal(
  
            FINANCIAL_SAFETY_INDICATORS?.ORGANIZATIONAL_STRUCTURE
       
      ),
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },

    {
      label:
        governanceLabels.FINANCIAL_SAFETY_INDICATORS
          .ACTIVATION_OF_POLICIES_AND_PROCEDURES,
      value: getNumericVal(
    
            FINANCIAL_SAFETY_INDICATORS?.ACTIVATION_OF_POLICIES_AND_PROCEDURES
       
      ),
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

    {
      label:
        governanceLabels.FINANCIAL_SAFETY_INDICATORS
          .RECORDS_AND_DOCUMENTS,
      value: getNumericVal(

            FINANCIAL_SAFETY_INDICATORS?.RECORDS_AND_DOCUMENTS
       
      ),
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },

    {
      label:
        governanceLabels.FINANCIAL_SAFETY_INDICATORS
          .REPORTS,
      value: getNumericVal(
        FINANCIAL_SAFETY_INDICATORS?.REPORTS
      ),
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },

    {
      label:
        governanceLabels.FINANCIAL_SAFETY_INDICATORS
          .FINANCIAL_AND_ACCOUNTING_PROCEDURES,
      value: getNumericVal(
        FINANCIAL_SAFETY_INDICATORS?.FINANCIAL_AND_ACCOUNTING_PROCEDURES

      ),
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

   
  ];



  const financialInds = [
    {
        label:indicatorsLabels.FINANCIAL.FINANCIAL_SUSTAIN,

        value: getNumericVal( props.indicators?.financial?.FINANCIAL_SUSTAIN),
               
    
          
          gradientStart: "#1882FF",
          gradientEnd: "#36EBCA",
    },



    {
        label:indicatorsLabels.FINANCIAL.ADMIN_EXPENSES,

        value: getNumericVal(
                props.indicators?.financial?.ADMIN_EXPENSES
            
          ),
          gradientStart: "#EF7BE3",
          gradientEnd: "#FF5A5A",
    },


    {
        label:indicatorsLabels.FINANCIAL.DONAT_MONEY_RAISING,

        value: getNumericVal(
            props.indicators?.financial?.DONAT_MONEY_RAISING

          ),
          gradientStart: "#36F097",
          gradientEnd: "#36F083",
    },



    {
        label:indicatorsLabels.FINANCIAL.ABL_COVER_OBLIG,

        value: getNumericVal(
                props.indicators?.financial?.ABL_COVER_OBLIG
            
          ),
          gradientStart: "#FBE947",
          gradientEnd: "#58D764",
    },

    {
        label:indicatorsLabels.FINANCIAL.PRGRMS_EXPENSES,

        value: getNumericVal(
            
                props.indicators?.financial?.PRGRMS_EXPENSES
          
          ),
          gradientStart: "#1882FF",
          gradientEnd: "#36EBCA",
    },

  ]


  const financialPerf =  getNumericVal (props.indicators.financial[0]?.FINANCIAL_PERF) 
  const complianceAdherenceTotal = getNumericVal(props.indicators.governance.COMPLIANCE_ADHERENCE_PRACTICES_TOTAL) 
  const transparencyTotal = getNumericVal(props.indicators.governance.TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL)
  const financialSafetyTotal = getNumericVal(props.indicators.governance.FINANCIAL_SAFETY_PRACTICES_TOTAL)


  const total = 0.2*financialPerf + 0.2*transparencyTotal +  0.2*financialSafetyTotal + 0.4* complianceAdherenceTotal
  return (
    <section
      className={cn(
        " pt-12 w-full flex flex-col ",

        "gap-8 xl:pl-16 xl:pr-24 2xl:pr-32"
      )}
    >
      {(props.role !== "admin" || props.isFullscreen) && (
        <div className="w-full  md:w-3/5 flex items-center ">
          <div className="ml-auto">
            <img
              src={props.logoUrl ?? TestingIcon}
              className="w-60 "
              alt="organization icon"
            />
          </div>
          <p className="font-bold text-white  text-2xl md:text-3xl lg:text-4xl  text-nowrap">
            لوحــــــــة الحوكمة
          </p>
        </div>
      )}

      <div className="flex w-full flex-col gap-4 h-full">
        {/* first row */}

        <div className="w-fit">
          <p className="text-base font-bold mb-2">الحوكمة العامة</p>

          <GradientText
            className="text-4xl"
            text={`${Number(total).toFixed(2)}%`}
            gradientStart={"#FF5A5A"}
            gradientEnd={"#EF7BE3"}
          />

          <Progress
            className=" w-full h-2.5 bg-gray-700"
            gradientStart={"#FF5A5A"}
            gradientEnd={"#EF7BE3"}
            value={Math.ceil(Number(33))}
            indicatorClassName={""}
          />
        </div>
        {/* second row */}

        <div
          className={cn("flex ", isExpanded ? "xl:gap-3 2xl:gap-4" : "gap-4")}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center items-center px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <div className={cn("relative w-1/2 ")}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
                <p>معيـار الامتثال</p>
                <GradientText
                  text={
                    complianceAdherenceTotal+ "%"
                  }
                  className="text-4xl"
                  gradientStart="#EF7BE3"
                  gradientEnd="#FF5A5A"
                />
              </div>

              <CircularProgressBar
                gradientId="1"
                progress={complianceAdherenceTotal}
                gradientStart="#EF7BE3"
                gradientEnd="#FF5A5A"
                trackColor="#373A41"
                showProgress={false}
              />
            </div>
            <div className="flex flex-wrap gap-12">
              {complianceAdherenceIndicators.map((item) => (
                <div className="flex gap-4 items-center">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: item.gradientStart }}
                  />
                  <p className="font-bold">{item.label}</p>
                  <GradientText
                    className="text-xl"
                    text={item.value.toString() }
                    gradientEnd={item.gradientEnd}
                    gradientStart={item.gradientStart}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* third row */}

        <div className="flex gap-8 justify-around">
          {/* first column  */}
          <div className="flex flex-col  gap-4 md:gap-6 w-full justify-center items-center px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <div className={cn("relative  w-full ")}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
               <p className="my-2 font-bold">
               معيـار الشفافية

               </p>
                <GradientText
                  text={
                    transparencyTotal + "%"
                  }
                  className="text-5xl"
                   gradientStart="#1882FF"
                gradientEnd="#36EBCA"
                />
              </div>

              <CircularProgressBar
                gradientId="3"
                progress={transparencyTotal}
                size="lg"
                gradientStart="#1882FF"
                gradientEnd="#36EBCA"
                trackColor="#373A41"
                showProgress={false}
              />
            </div>
            <div>
              {transparencyDisclosure.map((item) => (
                <div className="flex my-4 justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: item.gradientStart }}
                    />
                    <p className="font-bold">{item.label}</p>
                  </div>

                  <GradientText
                    className="text-xl"
                    text={item.value.toString()}
                    gradientEnd={item.gradientEnd}
                    gradientStart={item.gradientStart}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* second column  */}

          <div className="flex flex-col  gap-4 md:gap-6 w-full justify-center items-center px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <div className={cn("relative  w-full ")}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
               <p className="my-2 font-bold">
معيـار التنظيم المالي
               </p>
                <GradientText
                  text={
                   financialSafetyTotal     + "%"
                  }
                  className="text-5xl"
                  gradientStart="#FBE947"
                  gradientEnd="#58D764"
                />
              </div>

              <CircularProgressBar
                gradientId="2"
                progress={financialSafetyTotal}
                size="lg"
               
                gradientStart="#FBE947"
                gradientEnd="#58D764"
                trackColor="#373A41"
                showProgress={false}
              />
            </div>
            <div>
              {financialSafetyIndicators.map((item) => (
                <div className="flex my-4 justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: item.gradientStart }}
                    />
                    <p className="font-bold">{item.label}</p>
                  </div>

                  <GradientText
                    className="text-xl"
                    text={(item.value).toString()}
                    gradientEnd={item.gradientEnd}
                    gradientStart={item.gradientStart}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* third column  */}

          <div className="flex flex-col  gap-4 md:gap-6 w-full justify-center items-center px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <div className={cn("relative  w-full ")}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
               <p className="my-2 font-bold">
الأداء المالي
               </p>
                <GradientText
                  text={
                    financialPerf + "%"
                  }
                  className="text-5xl"
                   gradientStart= "#36F097"
                gradientEnd= "#36F083"
                />
              </div>

              <CircularProgressBar
                gradientId="4"
                progress={financialPerf}
                size="lg"
                gradientStart= "#36F097"
                gradientEnd= "#36F083"
                trackColor="#373A41"
                showProgress={false}
              />
            </div>
            <div>
              {financialInds.map((item) => (
                <div className="flex my-4 justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: item.gradientStart }}
                    />
                    <p className="font-bold">{item.label}</p>
                  </div>

                  <GradientText
                    className="text-xl"
                    text={(item.value).toString()}
                    gradientEnd={item.gradientEnd}
                    gradientStart={item.gradientStart}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceDashboard;
