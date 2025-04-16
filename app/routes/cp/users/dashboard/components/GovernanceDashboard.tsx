import { useSidebarStore } from "~/lib/store/sidebar-store";
import { cn } from "~/lib/tw-merge";
import TestingIcon from "~/assets/icons/Layer_1.webp";
import { getNumericVal } from "~/lib/utils/indicators";
import GradientText from "~/components/gardient-text";
import { Progress } from "~/components/ui/progress";
import CircularProgressBar from "~/components/ui/circular-progress";
import { governanceLabels, indicatorsLabels } from "../constants/glossary";
import SemiCircleProgressBar from "~/components/ui/half-circular-progress";

interface IProps {
  indicators: any;
  role: string;
  logoUrl: string;
  isFullscreen: boolean;
}

const GovernanceDashboard = (props: IProps) => {
  const { isExpanded } = useSidebarStore();

  let {
    COMPLIANCE_ADHERENCE_INDICATORS,
    FINANCIAL_SAFETY_INDICATORS,
    TRANSPARENCY_DISCLOSURE_INDICATORS,
  } = props.indicators?.governance;
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
      )/6*100,
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      label: governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS.GENERAL_ASSEMBLY,
      value: getNumericVal(COMPLIANCE_ADHERENCE_INDICATORS?.GENERAL_ASSEMBLY)/26*100,
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .BOARD_OF_DIRECTORSRetryY,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.BOARD_OF_DIRECTORSRetryY
      )/31.75*100,
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS.BRANCHES_AND_OFFICES,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.BRANCHES_AND_OFFICES
      )/3*100,
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },
    {
      label: governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS.REPORTS,
      value: getNumericVal(COMPLIANCE_ADHERENCE_INDICATORS?.REPORTS)/6.50*100,
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .REGULATIONS_IN_FORCE_IN_THE_KINGDOM,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.REGULATIONS_IN_FORCE_IN_THE_KINGDOM
      )/8*100,
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .ACTIVITIES_EVENTS_AND_CONTRACTS,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.ACTIVITIES_EVENTS_AND_CONTRACTS
      )/4.5*100,
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .REVENUES_EXPENSES_AND_OWNERSHIP,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.REVENUES_EXPENSES_AND_OWNERSHIP
      )/7.5*100,
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS.DOCUMENTS_AND_RECORDS,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.DOCUMENTS_AND_RECORDS
      )/2.75*100,
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
    {
      label:
        governanceLabels.COMPLIANCE_ADHERENCE_INDICATORS
          .FORMATION_OF_COMMITTEES,
      value: getNumericVal(
        COMPLIANCE_ADHERENCE_INDICATORS?.FORMATION_OF_COMMITTEES
      )/4*100,
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
      )/25*100,
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .INFORMATION_OF_THOSE_IN_CHARGE_OF_THE_ASSOCIATION,
      value: getNumericVal(
        TRANSPARENCY_DISCLOSURE_INDICATORS?.INFORMATION_OF_THOSE_IN_CHARGE_OF_THE_ASSOCIATION
      )/16*100,
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .ASSOCIATION_INFORMATION,
      value: getNumericVal(
        TRANSPARENCY_DISCLOSURE_INDICATORS?.ASSOCIATION_INFORMATION
      )/13*100,
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .OBJECTIVES_AND_PROGRAMS_OF_THE_ASSOCIATION,
      value: getNumericVal(
        TRANSPARENCY_DISCLOSURE_INDICATORS?.OBJECTIVES_AND_PROGRAMS_OF_THE_ASSOCIATION
      )/22*100,
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS
          .FINANCIAL_STATEMENTS,
      value: getNumericVal(
        TRANSPARENCY_DISCLOSURE_INDICATORS?.FINANCIAL_STATEMENTS
      )/13*100,
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

    {
      label:
        governanceLabels.TRANSPARENCY_DISCLOSURE_INDICATORS.DISCLOSURE_FORM,
      value: getNumericVal(TRANSPARENCY_DISCLOSURE_INDICATORS?.DISCLOSURE_FORM)/11*100,
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },
  ];

  const financialSafetyIndicators = [
    {
      label:
        governanceLabels.FINANCIAL_SAFETY_INDICATORS.ORGANIZATIONAL_STRUCTURE,
      value: getNumericVal(
        FINANCIAL_SAFETY_INDICATORS?.ORGANIZATIONAL_STRUCTURE
      )/22*100,
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },

    {
      label:
        governanceLabels.FINANCIAL_SAFETY_INDICATORS
          .ACTIVATION_OF_POLICIES_AND_PROCEDURES,
      value: getNumericVal(
        FINANCIAL_SAFETY_INDICATORS?.ACTIVATION_OF_POLICIES_AND_PROCEDURES
      )/45*100,
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

    {
      label: governanceLabels.FINANCIAL_SAFETY_INDICATORS.RECORDS_AND_DOCUMENTS,
      value: getNumericVal(FINANCIAL_SAFETY_INDICATORS?.RECORDS_AND_DOCUMENTS)/6*100,
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },

    {
      label: governanceLabels.FINANCIAL_SAFETY_INDICATORS.REPORTS,
      value: getNumericVal(FINANCIAL_SAFETY_INDICATORS?.REPORTS)/5*100,
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },

    {
      label:
        governanceLabels.FINANCIAL_SAFETY_INDICATORS
          .FINANCIAL_AND_ACCOUNTING_PROCEDURES,
      value: getNumericVal(
        FINANCIAL_SAFETY_INDICATORS?.FINANCIAL_AND_ACCOUNTING_PROCEDURES
      )/22*100,
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },
  ];

  const financialInds = [
    {
      label: governanceLabels.FINANCIAL_PERFORMANCE.FINANCIAL_SUSTAIN,

      value: getNumericVal(props.indicators?.financial[0]?.FINANCIAL_SUSTAIN),

      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },

    {
      label:governanceLabels.FINANCIAL_PERFORMANCE.ADMIN_EXPENSES,

      value: getNumericVal(props.indicators?.financial[0]?.ADMIN_EXPENSES),
      gradientStart: "#EF7BE3",
      gradientEnd: "#FF5A5A",
    },

    {
      label: governanceLabels.FINANCIAL_PERFORMANCE.DONAT_MONEY_RAISING,

      value: getNumericVal(props.indicators?.financial[0]?.DONAT_MONEY_RAISING),
      gradientStart: "#36F097",
      gradientEnd: "#36F083",
    },

    {
      label: governanceLabels.FINANCIAL_PERFORMANCE.ABL_COVER_OBLIG,

      value: getNumericVal(props.indicators?.financial[0]?.ABL_COVER_OBLIG),
      gradientStart: "#FBE947",
      gradientEnd: "#58D764",
    },

    {
      label: governanceLabels.FINANCIAL_PERFORMANCE.PRGRMS_EXPENSES,

      value: getNumericVal(props.indicators?.financial[0]?.PRGRMS_EXPENSES),
      gradientStart: "#1882FF",
      gradientEnd: "#36EBCA",
    },
  ];

  const financialPerf = getNumericVal(
    props.indicators.financial[0]?.FINANCIAL_PERF
  );
  const complianceAdherenceTotal = getNumericVal(
    props.indicators?.governance?.COMPLIANCE_ADHERENCE_PRACTICES_TOTAL
  );
  const transparencyTotal = getNumericVal(
    props.indicators?.governance?.TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL
  );
  const financialSafetyTotal = getNumericVal(
    props.indicators?.governance?.FINANCIAL_SAFETY_PRACTICES_TOTAL
  );

  const total =
    0.2 * financialPerf +
    0.2 * transparencyTotal +
    0.2 * financialSafetyTotal +
    0.4 * complianceAdherenceTotal;
  return (
    <section
      className={cn(
        " w-full flex flex-col ",

        "gap-8 xl:pl-16 xl:pr-24 2xl:pr-32"
      )}
    >
      {(props.role !== "admin" || props.isFullscreen) && (
        <div className="w-full flex items-center">
          <div className="flex-1"></div>
          <div className="max-w-[141px]">
            <img
              src={props.logoUrl ?? TestingIcon}
              className="w-full h-auto object-contain max-h-[48px]"
              alt="organization icon"
            />
          </div>
        </div>
      )}

      <div className="flex w-full flex-col gap-4 h-full">
        {/* first row */}

        <div className="w-full">
          <div className="flex gap-4 items-center">

<GradientText
  className="text-3xl mb-2"
  text={`نتيجة الحوكمة العامة        ${"  "}   ${Number(total).toFixed(2)}%`}
  gradientStart={"#FBE947"}
  gradientEnd={"#58D764"}
/>
          </div>
          

          <Progress
            className=" w-full h-2.5 bg-gray-700"
            gradientStart={"#FBE947"}
            gradientEnd={"#58D764"}
            value={Math.ceil(Number(total))}
            indicatorClassName={""}
          />
        </div>
        {/* second row */}

        <div
          className={cn("flex ", isExpanded ? "xl:gap-3 2xl:gap-4" : "gap-4")}
        >
          <div className="flex flex-col my-1  md:flex-row gap-4 md:gap-6 w-full  justify-center items-center px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <div className={cn("relative    w-3/5 ")}>
              <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
                <div className="flex flex-col items-center justify-center">
                  <p> الامتثال و الالتزام</p>
                  <GradientText
                    text={complianceAdherenceTotal + "%"}
                    className="text-4xl"
                    gradientStart="#EF7BE3"
                    gradientEnd="#FF5A5A"
                  />
                </div>
              </div>

              <CircularProgressBar
                gradientId="1"
                size="lg"
                progress={complianceAdherenceTotal}
                gradientStart="#EF7BE3"
                gradientEnd="#FF5A5A"
                trackColor="#373A41"
                showProgress={false}
              />
            </div>
            <div className="flex flex-wrap gap-8">
              {complianceAdherenceIndicators.map((item,i) => (
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">{item.label}</p>
                  <SemiCircleProgressBar
                    size="sm"
                    gradientId={i.toString()}
                    progress={item.value}
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
          <div className="flex flex-col  gap-4 md:gap-6 w-full items-center ">
            {/* finperf  */}
            <div className="flex justify-between px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)] w-full">

            <div className="flex justify-center gap-8 flex-wrap">
                {financialInds.map((item,i) => (
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">{item.label}</p>
                    <SemiCircleProgressBar
                      size="sm"
                      gradientId={i.toString()}
                      progress={item.value}
                      gradientEnd={item.gradientEnd}
                      gradientStart={item.gradientStart}
                    />
                  </div>
                ))}
              </div>

              <div className={cn("relative  w-80 ")}>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
                  <div className="flex flex-col items-center justify-center">
                    <p className="my-2 font-bold"> الأداء المالي</p>
                    <GradientText
                      text={financialPerf + "%"}
                      className="text-4xl"
                      gradientStart="#00AE84"
                      gradientEnd="#58D764"
                    />
                  </div>
                </div>

                <CircularProgressBar
                  gradientId="2"
                  progress={financialPerf}
                  size="lg"
                  gradientStart="#00AE84"
                  gradientEnd="#58D764"
                  trackColor="#373A41"
                  showProgress={false}
                />
              </div>

             
            </div>


       {/* transparency  */}
            <div className="flex justify-between px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)] w-full">

<div className="flex justify-center gap-4 flex-wrap">
    {transparencyDisclosure.map((item,i) => (
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold">{item.label}</p>
        <SemiCircleProgressBar
          size="sm"
          gradientId={i.toString()}
          progress={item.value}
          gradientEnd={item.gradientEnd}
          gradientStart={item.gradientStart}
        />
      </div>
    ))}
  </div>

  <div className={cn("relative my-1 w-80 ")}>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
      <div className="flex flex-col items-center justify-center">
        <p className="my-2 font-bold">  الشفافية والإفصاح</p>
        <GradientText
          text={transparencyTotal + "%"}
          className="text-5xl"
          gradientStart="#FBE947"
          gradientEnd="#58D764"
        />
      </div>
    </div>

    <CircularProgressBar
      gradientId="28"
      progress={financialSafetyTotal}
      size="lg"
      gradientStart="#FBE947"
      gradientEnd="#58D764"
      trackColor="#373A41"
      showProgress={false}
    />
  </div>

 
</div>
          </div>

          {/* third column  */}

          <div className="flex flex-col w-2/5 gap-4 md:gap-6  justify-center items-center px-4 py-3 border-2 rounded-xl border-[#9C9C9C] shadow-[0px_1px_2px_0px_rgba(255,255,255,0.00)]">
            <div className={cn("relative  w-full ")}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
                <div className="flex flex-col items-center justify-center">
                  <p className="my-2 font-bold">التنظيم المالي</p>
                  <GradientText
                    text={financialSafetyTotal + "%"}
                    className="text-4xl"
                    gradientStart="#1882FF"
                    gradientEnd="#36EBCA"
                  />
                </div>
              </div>
              <CircularProgressBar
                gradientId="49"
                progress={financialSafetyTotal}
                size="md"
                gradientStart="#1882FF"
                gradientEnd="#36EBCA"
                trackColor="#373A41"
                showProgress={false}
              />
            </div>
            <div className="flex  gap-x-4 justify-center flex-wrap">
              {financialSafetyIndicators.map((item,i) => (
                <div className="flex flex-col mt-4 justify-between items-center">
                  <p className="font-bold ">{item.label}</p>
                  <SemiCircleProgressBar
                    size="sm"
                    gradientId={i.toString()}
                    progress={item.value}
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
