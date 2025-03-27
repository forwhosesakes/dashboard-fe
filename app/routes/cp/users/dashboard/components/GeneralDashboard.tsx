import { indicatorsLabels } from "../constants/glossary";
import UnderConstructionCard from "~/components/ui/under-construction";
import { useSidebarStore } from "~/lib/store/sidebar-store";
import { cn } from "~/lib/tw-merge";
import TestingIcon from "~/assets/icons/Layer_1.webp";
import CircularProgressBar from "~/components/ui/circular-progress";
import SemiCircleProgress from "~/components/ui/semi-circle-progress";
import SRIcon from "~/assets/icons/SR.svg";
import { Progress } from "~/components/ui/progress";
import RatingsGraph from "~/components/ratings-graph";
import { isNumeric } from "~/lib/utils/indicators";

interface IProps {
  indicators: any;
  category: string;
  role: string;
  logoUrl: string;
  isFullscreen:boolean;
}
const GeneralDashboard = ({ indicators, role, logoUrl, isFullscreen }: IProps) => {
    const satisInds = [
      {
        id: "BENEF_SATIS_MEASURMENT",
        percentage: Math.ceil(indicators.BENEF_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.BENEF_SATIS_MEASURMENT,
      },
      {
        id: "EMP_SATIS_MEASURMENT",
        percentage: Math.ceil(indicators.EMP_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.EMP_SATIS_MEASURMENT,
      },
      {
        id: "PARTENERS_SATIS_MEASURMENT",
        percentage: Math.ceil(indicators.PARTENERS_SATIS_MEASURMENT),

        label: indicatorsLabels.CORPORATE.PARTENERS_SATIS_MEASURMENT,
      },
      {
        id: "VOLUN_SATIS_MEASURMENT",
        percentage: Math.ceil(indicators.VOLUN_SATIS_MEASURMENT),

        label: indicatorsLabels.CORPORATE.VOLUN_SATIS_MEASURMENT,
      },
      {
        id: "DONATORS_SATIS_MEASURMENT",
        percentage: Math.ceil(indicators.DONATORS_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.DONATORS_SATIS_MEASURMENT,
      },
      {
        id: "ADMIN_ORG_SATIS_MEASURMENT",
        percentage: Math.ceil(indicators.ADMIN_ORG_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.ADMIN_ORG_SATIS_MEASURMENT,
      },
      {
        id: "COMMUNITY_SATIS_MEASURMENT",
        percentage: Math.ceil(indicators.COMMUNITY_SATIS_MEASURMENT),
        label: indicatorsLabels.CORPORATE.COMMUNITY_SATIS_MEASURMENT,
      },
    ];

  const { isExpanded } = useSidebarStore();

  return (
    <section
    id="parent"
      className={cn(
        "flex flex-col  gap-7 pt-12 pb-20 2xl:px-[80px] justify-center items-center",
        isExpanded ? "xl:px-[25px]" : "xl:px-[50px]"
      )}
    >
      {(role !== "admin" || isFullscreen) &&
         (
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-[180px] w-full">
              <img
                src={logoUrl ?? TestingIcon}
                className="w-full h-auto object-contain"
                alt="organization icon"
              />
            </div>
            <div className="flex-1 text-center font-bold text-4xl">
              لوحة الأداء العام
            </div>
          </div>
        )}

      {/* section has everything except the chart */}
      <div id="first-child" className="flex gap-7 w-full">
        {/* right side */}
        <div className={cn("flex flex-col gap-7", isExpanded ? "w-10/12" : "w-full")}>
          {/* right-side first row */}
          <div className="flex gap-11 justify-between">
            <div className="flex w-full flex-col justify-between gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#FBE947] after:to-[#58D764]">
              <p className="font-bold text-base 2xl:text-lg"> متوسط نسبة رضا أصحاب المصلحة </p>

              {isNumeric(indicators["AVG_SATIS_MEASURMENT"]) ? (
                   <p className="font-bold text-5xl bg-gradient-to-r from-[#FBE947] to-[#58D764] bg-clip-text text-transparent">
                   {Math.ceil(indicators.AVG_SATIS_MEASURMENT)}%
                  </p>
              ) : (
                <UnderConstructionCard />
              )}

              
            </div>

            <div className="flex flex-col justify-between w-full gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#1882FF] after:to-[#36EBCA]">
              <p className="font-bold text-base 2xl:text-lg"> {indicatorsLabels.GENERAL.COMPLIANCE_ADHERENCE_PRACTICES_TOTAL} </p>

              {isNumeric(indicators["COMPLIANCE_ADHERENCE_PRACTICES_TOTAL"]) ? (
                    <p className="font-bold text-5xl bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
                    {Math.ceil(indicators.COMPLIANCE_ADHERENCE_PRACTICES_TOTAL)}%
      
                    </p>
              ) : (
                <UnderConstructionCard />
              )}

              
            </div>

            <div className="flex flex-col justify-between w-full gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#EF7BE3] after:to-[#FF5A5A]">

   <p className="font-bold text-base 2xl:text-lg">
   {indicatorsLabels.GENERAL.FINANCIAL_SAFETY_PRACTICES_TOTAL}
              </p>
              {isNumeric(indicators["FINANCIAL_SAFETY_PRACTICES_TOTAL"]) ? (
                    <p className="font-bold text-5xl bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">
                    {Math.ceil(indicators.FINANCIAL_SAFETY_PRACTICES_TOTAL)}%
                   
                    </p>
              ) : (
                <UnderConstructionCard />
              )}

             
            </div>

            <div className="flex flex-col justify-between w-full gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#1882FF] after:to-[#36EBCA]">
            <p className="font-bold text-base 2xl:text-lg">
   {indicatorsLabels.GENERAL.TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL}
              </p>
              {isNumeric(indicators["TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL"]) ? (
                   <p className="font-bold text-5xl bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
                   {Math.ceil(indicators.TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL)}%
     
                   </p>
              ) : (
                <UnderConstructionCard />
              )}

             
            </div>

            <div className="flex flex-col justify-between w-full gap-3 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#FBE947] after:to-[#58D764]">
              <p className="font-bold text-base 2xl:text-lg">  {indicatorsLabels.GENERAL.RETURNS_FROM_TARGET}</p>

              {isNumeric(indicators["RETURNS_FROM_TARGET"]) ? (
                  <p className="font-bold text-5xl bg-gradient-to-r from-[#FBE947] to-[#58D764] bg-clip-text text-transparent">
                  {Math.ceil(indicators.RETURNS_FROM_TARGET)}%
    
                  </p>
              ) : (
                <UnderConstructionCard />
              )}

             
            </div>

          
          </div>

          {/* right-side second row */}
          <div className="flex gap-6 w-full">
            <div className="flex border-2 border-[#9C9C9C] rounded-xl w-1/2 gap-6 py-3 px-4 items-center justify-center">
              {/* <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div> */}

              <div className="flex flex-col gap-6 max-w-[176px] text-start min-w-[132px]">
                <p className="font-bold text-base 2xl:text-lg">الأداء المالي الكلي</p>
                  
                {isNumeric(indicators["FINANCIAL_PERF"]) ? (
                <p className="text-5xl font-bold text-[#D9B456]">
                  {Math.ceil(Number(indicators.FINANCIAL_PERF))}%
                </p>
              ) : (
                <UnderConstructionCard />
              )}
              


              </div>

              <div>
                <CircularProgressBar
                  gradientId="1"
                  progress={Math.ceil(indicators.FINANCIAL_PERF)}
                  size="sm"
                  gradientStart="#D9B456"
                  gradientEnd="#D9B456"
                  trackColor="#373A41"
                  textFillColor="fill-transparent"
                />
              </div>
            </div>

            <div className="flex border-2 border-[#9C9C9C] rounded-xl w-1/2 gap-6 py-3 px-4 items-center justify-center">
              {/* <div className="flex h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div> */}

              <div className="flex flex-col gap-6 text-start max-w-[176px] min-w-[132px]">
                <p className="font-bold text-base 2xl:text-lg">
الحوكمة
                </p>
                {isNumeric(indicators["GOVERENCE"]) ? (
                <p className="text-5xl font-bold text-[#FF0080]">
                  {Math.ceil(Number(indicators.GOVERENCE))}%
                </p>
              ) : (
                <UnderConstructionCard />
              )}
                

              </div>

              <div>
                <CircularProgressBar
                  gradientId="2"
                  progress={Math.ceil(indicators.GOVERENCE)}
                  size="sm"
                  gradientStart="#FF0080"
                  gradientEnd="#FF0080"
                  trackColor="#373A41"
                  textFillColor="fill-transparent"
                />
              </div>
            </div>
          </div>

          {/* right-side third row */}
          <div className="flex gap-4 w-full">
            {/* <div className=" flex flex-col min-w-[232px] items-center justify-center gap-2 p-5 border-2 border-[#9C9C9C] rounded-xl">
              <div className="flex w-fit h-fit self-end justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div>
              <p className="text-base 2xl:text-lg font-bold">
                المصاريف الإدارية والعمومية والحوكمة
              </p>

              <div>
                <SemiCircleProgress
                  percentage={80}
                  size={180}
                  useGradient={true}
                  gradientId="3"
                  gradientStart="#EF7BE3"
                  gradientEnd="#FF5A5A"
                  textSize="4xl"
                />
              </div>
            </div> */}

            <div className=" flex flex-col w-full min-w-[232px] items-center justify-between gap-2 p-5 pb-6 border-2 border-[#9C9C9C] rounded-xl">
              {/* <div className="flex w-fit h-fit self-end justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div> */}
              <p className="text-base 2xl:text-lg font-bold">
              نسبة الالتزام بالميزانية
              </p>
              {isNumeric(indicators["BUDGET_COMMIT_PERC"]) ? (
                  <SemiCircleProgress
                  percentage={Math.ceil(indicators.BUDGET_COMMIT_PERC)}
                  size={180}
                  useGradient={true}
                  gradientId="4"
                  gradientStart="#1882FF"
                  gradientEnd="#36EBCA"
                  textSize="4xl"
                />
              ) : (
                <UnderConstructionCard />
              )}
              <div>
              
              </div>
            </div>

            <div className=" flex flex-col w-full min-w-[232px] items-center justify-between gap-2 p-5 pb-6 border-2 border-[#9C9C9C] rounded-xl">
              {/* <div className="flex w-fit h-fit self-end justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div> */}
              <p className="text-base 2xl:text-lg font-bold">
نسبة تنفيذ البرامج والمشاريع
              </p>
         
              <div>
              {isNumeric(indicators["PGRM_PRJKS_EXEC_PERC"]) ? (
                  <SemiCircleProgress
                  percentage={Math.ceil(indicators.PGRM_PRJKS_EXEC_PERC)}
                  size={180}
                  useGradient={true}
                  gradientId="4"
                  gradientStart="#1882FF"
                  gradientEnd="#36EBCA"
                  textSize="4xl"
                />
              ) : (
                <UnderConstructionCard />
              )}
              </div>
            </div>

            <div className="flex flex-col w-full justify-center items-center gap-6 p-5 border-2 border-[#9C9C9C] rounded-xl">
              <div className="flex justify-center">
                <img src={SRIcon} alt="" />
              </div>
              <div className="text-center">
              {isNumeric(indicators["FUND_RAISING_TO_TOTAL_DONAT"]) ? (
                    <p className="font-bold text-5xl">{Math.ceil(indicators.ECONOMIC_RETURN_OF_VOLUNTEERING)}</p>
              ) : (
                <UnderConstructionCard />
              )}
                <p className="font-bold"> العائد الاقتصادي للتطوع     </p>
              </div>
              <Progress
                value={indicators.ECONOMIC_RETURN_OF_VOLUNTEERING}
                className="bg-[#373A41]"
                indicatorClassName="bg-accent"
              />

              {/* <div className="flex h-fit w-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
                آخر ثلاث شهور{" "}
                <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
              </div> */}
            </div>
          </div>
        </div>

        {/* left side */}
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            {/* <div className="flex self-end h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div> */}
            <p className="text-base text-center 2xl:text-lg font-bold"> عدد المستفيدين </p>

            {isNumeric(indicators["VOLUN_SUST_PERC"]) ? (
                     <p className="font-bold text-center text-5xl text-[#F7E706]">{Math.ceil(indicators.NO_RESPONSES_SATIS_FORM)}</p>
              ) : (
                <UnderConstructionCard />
              )}


           
          </div>

          <div className="flex flex-col gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            {/* <div className="flex self-end h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div> */}
            <p className="text-base text-center 2xl:text-lg font-bold">  عدد المتطوعين   </p>

            {isNumeric(indicators["VOLUN_GROWTH_RATE_QUAR"]) ? (
                    <p className="font-bold text-center text-5xl bg-gradient-to-r from-[#EF7BE3] to-[#FF5A5A] bg-clip-text text-transparent">
                    {Math.ceil(indicators.NO_RESPOSES_VOL_SATIS_FORM)}
                    </p>
              ) : (
                <UnderConstructionCard />
              )}

            
          </div>

          <div className="flex flex-col gap-4 p-5 border-2 border-[#9C9C9C] rounded-xl">
            {/* <div className="flex self-end h-fit justify-center items-center text-[#CECFD2] py-[2px] gap-1 pl-[6px] pr-2 bg-[#0C0E12] border rounded-lg text-sm">
              آخر ثلاث شهور{" "}
              <ArrowUpRight className="text-accent font-bold w-4 h-4 min-w-4 min-h-4" />
            </div> */}
            <p className="text-base text-center 2xl:text-lg font-bold"> نسبة الوصول للفئة المستهدفة </p>

            {isNumeric(indicators["REACH_TARGET_AUD_PERC"]) ? (
                     <p className="font-bold text-center  text-5xl bg-gradient-to-r from-[#1882FF] to-[#36EBCA] bg-clip-text text-transparent">
                     {Math.ceil(indicators.REACH_TARGET_AUD_PERC)}%
                     
                     </p>
              ) : (
                <UnderConstructionCard />
              )}
           
          </div>
        </div>
      </div>

      <div id="second-child" className="w-full">
          <RatingsGraph ratings={satisInds} />
        </div>
    </section>
  );
};

export default GeneralDashboard;
