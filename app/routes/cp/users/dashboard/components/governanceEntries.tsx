import type { TGovernanceEntries } from "~/types/dashboard.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useEffect, useReducer, useState, type Key } from "react";
import { GOVERANCE_TABS, governanceLabels } from "../constants/glossary";
import {
  COMPLIANCE_ADHERENCE_PRACTICES_INDICATORS,
  COMPLIANCE_ADHERENCE_PRACTICES_QUESTIONS,
  FINANCIAL_SAFETY_PRACTICES_INDICATORS,
  FINANCIAL_SAFETY_PRACTICES_QUESTIONS,
  TRANSPARENCY_DISCLOSURE_PRACTICES_INDICATORS,
  TRANSPARENCY_DISCLOSURE_PRACTICES_QUESTIONS,
} from "../constants/governance";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { dashboardApi } from "~/lib/api/dashboard";
import { toasts } from "~/lib/utils/toast";
import { useLoaderData } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons for collapse/expand

const TABS_QUESTIONS = {
  COMPLIANCE_ADHERENCE_PRACTICES: {
    questions: COMPLIANCE_ADHERENCE_PRACTICES_QUESTIONS,
    indicators: COMPLIANCE_ADHERENCE_PRACTICES_INDICATORS,
  },
  FINANCIAL_SAFETY_PRACTICES: {
    questions: FINANCIAL_SAFETY_PRACTICES_QUESTIONS,
    indicators: FINANCIAL_SAFETY_PRACTICES_INDICATORS,
  },
  TRANSPARENCY_DISCLOSURE_PRACTICES: {
    questions: TRANSPARENCY_DISCLOSURE_PRACTICES_QUESTIONS,
    indicators: TRANSPARENCY_DISCLOSURE_PRACTICES_INDICATORS,
  },
};

const GovernanceEntries = () => {
  const tabs: TGovernanceEntries[] = [
    "COMPLIANCE_ADHERENCE_PRACTICES",
    "FINANCIAL_SAFETY_PRACTICES",
    "TRANSPARENCY_DISCLOSURE_PRACTICES",
  ];


  const indicatorsLabelMap = {
    COMPLIANCE_ADHERENCE_PRACTICES:"COMPLIANCE_ADHERENCE_INDICATORS",
    FINANCIAL_SAFETY_PRACTICES:"FINANCIAL_SAFETY_INDICATORS",
    TRANSPARENCY_DISCLOSURE_PRACTICES:"TRANSPARENCY_DISCLOSURE_INDICATORS"
  }
  const { baseUrl, id } = useLoaderData();
  const [govTab, setGovTab] = useState<TGovernanceEntries>(
    "COMPLIANCE_ADHERENCE_PRACTICES"
  );
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isFormMode, triggerFormMode] = useReducer((st) => !st, false);
  const [isLoading, setIsLoading] = useState(false);

  const [expandedIndicators, setExpandedIndicators] = useState<
    Record<number, boolean>
  >({});
  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});
  const [total, setTotal] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [indicators, setIndicators] = useState({});

  useEffect(() => {
    setTotal(getGeneralTotalForOneTab());
  }, [responses]);

  const toggleIndicator = (index: number) => {
    setExpandedIndicators((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleQuestion = (questionKey: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionKey]: !prev[questionKey],
    }));
  };

  const handleResponse = (sectionId: any, questionLabel: any, value: any) => {
    setResponses((prev: any) => ({
      ...prev,
      [questionLabel]: value,
    }));
  };

  const resetTabResponses = () => {
    setResponses({});
    setFormKey((prevKey) => prevKey + 1);
  };

  const resetAnswer = (label: string) => {
    setResponses((prev) => {
      const newData = { ...prev };
      delete newData[label];
      return newData;
    });
    setFormKey((prevKey) => prevKey + 1);
  };

  const shouldShowQuestion = (
    question: any,
    sectionQuestions: any[],
    index: number
  ): boolean => {
    if (index === 0) return true;
    if (!question.isDependantOnPrev) return true;

    const previousQuestion = sectionQuestions[index - 1];
    const previousResponse = responses[previousQuestion.label];

    const shouldshowPrev = previousQuestion.isDependantOnPrev
      ? shouldShowQuestion(previousQuestion, sectionQuestions, index - 1)
      : true;
    return (
      previousResponse &&
      previousQuestion.options[Number(previousResponse.split("-").pop())]
        ?.moveToNext &&
      shouldshowPrev
    );
  };

  const handleTabChange = (value: string) => {
    setGovTab(value as TGovernanceEntries);
  };

  const countEvaluatedPracticesForOneIndicator = (indicatorIndex: number) => {
    const practices =
      TABS_QUESTIONS[govTab].indicators[indicatorIndex].questions; // e.g ["Q1","Q2","Q3"]
    const [evaluatedPractices, total] = practices.reduce(
      (acc, practice) => {
        // @ts-ignore
        const practiceQuestions =   TABS_QUESTIONS[govTab].questions[practice].questions;
        const ansCount = Array.from(practiceQuestions).filter(
          (q: any) => responses[q.label]
        ).length;

        return [ansCount + acc[0], practiceQuestions.length + acc[1]];
      },
      [0, 0]
    );

    return `تم تقييم ${evaluatedPractices} من أصل ${total}`;
  };

  const subTotalForOneIndicator = (indicatorIndex: number) => {
    const practices =
      TABS_QUESTIONS[govTab].indicators[indicatorIndex].questions; // e.g ["Q1","Q2","Q3"]
    const total = practices.reduce((acc, practice, index) => {
      return acc + getSubtotalForPractice(practice, index);
    }, 0);

    return total;
  };

  const fullTotalForOneIndicator = (indicatorIndex: number) => {
    const practices =
      TABS_QUESTIONS[govTab].indicators[indicatorIndex].questions; // e.g ["Q1","Q2","Q3"]
    const total = practices.reduce((acc, practice) => {
      //@ts-ignore
      return acc + TABS_QUESTIONS[govTab].questions[practice].weight;
    }, 0);

    return total;
  };

  const getSubtotalForPractice = (practice: string, qIndex: number) => {
    const questions =
      TABS_QUESTIONS[govTab].questions[practice as "Q1"].questions;
    const total = questions.reduce((acc: number, q: any, i: number) => {
      const isQuestionVisible = !!shouldShowQuestion(
        q,
        TABS_QUESTIONS[govTab].questions[practice as "Q1"].questions,
        i
      );

      //@ts-ignore
      if ((responses[q.label] || responses[q.label] === 0) && isQuestionVisible)
        return acc + Number(responses[q.label].split("-")[0]);
      return acc;
    }, 0);

    return total;
  };

  const getGeneralTotalForOneTab = () => {
    let inds: any = {};
    const tot = TABS_QUESTIONS[govTab].indicators.reduce(
      (acc: number, val: any, index: number) => {
        let sum = subTotalForOneIndicator(index);
        //@ts-ignore
        inds[Object.keys(governanceLabels[indicatorsLabelMap[govTab]] )[index].toString()] = sum;
        return acc + sum;
      },
      0
    );
    setIndicators(inds);
    return tot;
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Transform responses to just the weight values
      const transformedResponses = Object.entries(responses).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {}
      );
      if (id)
        await dashboardApi(baseUrl).saveGovernanceEntries(
          id,
          govTab,
          transformedResponses,
          indicators,
          total
        );
      else throw new Error("no is for orginization");

      toasts.success({
        message: "تم حفظ البيانات بنجاح",
      });
    } catch (error) {
      console.error("Error saving entries:", error);
      toasts.error({
        message: "خطأ في حفظ البيانات",
        description: "حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setResponses({});
    dashboardApi(baseUrl)
      .getGovernanceEntries(id, govTab)
      .then((res) => {
        if (res) {
          const { records, total } = res;
          if (records) {
            setTotal(total);

            setResponses(JSON.parse(records));
          }
        }
      })
      .catch(() => {
        setResponses({});
      });
  }, [govTab]);

  return (
    <>
      <div className="flex justify-between mb-8 px-6 gap-x-2 text-gray-500">
        <div className="flex  gap-x-2 ">
          <Switch
            dir="ltr"
            checked={!!isFormMode}
            onCheckedChange={triggerFormMode}
          />
          {"اظهار استبيانات الحوكمة "}
        </div>

        {!!isFormMode && (
          <Button
            className="w-fit"
            onClick={resetTabResponses}
            variant={"destructive"}
          >
            إعادة تعيين الاستبيان
          </Button>
        )}
      </div>
      {isFormMode && (
        <Tabs
          defaultValue={govTab}
          dir="rtl"
          className="w-full mb-4"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full justify-start bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger value={tab} key={tab}>
                {GOVERANCE_TABS[tab]}
                {govTab === tab && ` (${total})`}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={govTab}>
            <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
              {TABS_QUESTIONS[govTab].indicators.map((indicator, index) => (
                <div
                  key={`indicator-${index}`}
                  className="mb-6 border rounded-lg overflow-hidden shadow-sm"
                >
                  <div
                    className="p-4 bg-secondary-600/10 flex justify-between items-center cursor-pointer hover:bg-secondary-600/20 transition-colors"
                    onClick={() => toggleIndicator(index)}
                  >
                    <h6 className="text-secondary-800 font-semibold">
                      {indicator.label}
                    </h6>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col justify-center items-end">
                        <span className="text-gray-600 text-xs">
                          {countEvaluatedPracticesForOneIndicator(index)}
                        </span>
                        <span className="text-secondary-700 font-semibold text-xs">{`الدرجة: ${subTotalForOneIndicator(
                          index
                        )} من أصل ${fullTotalForOneIndicator(index)}`}</span>
                      </div>
                      {expandedIndicators[index] ? (
                        <ChevronUp className="h-4 w-4 text-secondary-700" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-secondary-700" />
                      )}
                    </div>
                  </div>

                  {expandedIndicators[index] &&
                    indicator.questions.map((question, i) => (
                      <div
                        key={question}
                        className={`p-4 border-t ${i > 0 ? "mt-4" : ""}`}
                      >
                        <div
                          className="flex justify-between items-center my-2 gap-2 cursor-pointer"
                          onClick={() => toggleQuestion(question)}
                        >
                          <div className="flex gap-2 items-center">
                            <h2 className="text-lg text-secondary-900 font-semibold">
                              الممارسة {question.slice(1)}
                            </h2>
                            <span className="text-sm text-muted-foreground">
                              {/* @ts-ignore */}( الدرجة :{"  "}
                              {getSubtotalForPractice(question, i).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2})}{" "}
                              {/* @ts-ignore */}
                              من اصل{" "}        {     TABS_QUESTIONS[govTab].questions[question]
                                  .weight
                              }
                              )
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={"outline"}
                              className="w-fit"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubmit();
                              }}
                            >
                              حفظ
                            </Button>
                            {expandedQuestions[question] ? (
                              <ChevronUp className="h-4 w-4 text-secondary-700" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-secondary-700" />
                            )}
                          </div>
                        </div>

                        {expandedQuestions[question] && (
                          <>
                            <Separator className="my-2" />
                            <div className="space-y-4">
                              {/* @ts-ignore */}
                              {TABS_QUESTIONS[govTab].questions[
                                question
                              ].questions.map(
                                (
                                  q: { label: Key | any; options: any[] },
                                  qIndex: number
                                ) =>
                                  shouldShowQuestion(
                                    q,
                                    TABS_QUESTIONS[govTab].questions[
                                      question as "Q1"
                                    ].questions,
                                    qIndex
                                  ) && (
                                    <div
                                      key={`${q.label}-${formKey}`}
                                      className="p-4 border rounded-lg"
                                    >
                                      <div className="flex justify-between">
                                        <p className="text-sm font-medium mb-4">
                                          {qIndex + 1}.{" "}
                                          {
                                            //@ts-ignore
                                            governanceLabels[govTab][q.label]
                                          }
                                        </p>
                                        <Button
                                          className="w-fit"
                                          onClick={() => resetAnswer(q.label)}
                                          variant={"outline"}
                                        >
                                          مسح الإجابة
                                        </Button>
                                      </div>

                                      <RadioGroup
                                        dir="rtl"
                                        onValueChange={(value) =>
                                          handleResponse(
                                            question,
                                            q.label,
                                            value
                                          )
                                        }
                                        value={responses[q.label]}
                                        className="space-y-2"
                                      >
                                        {q.options.map((option, index) => (
                                          <div
                                            key={`${q.label}-${index}`}
                                            className="flex items-center space-x-2"
                                          >
                                            <RadioGroupItem
                                              dir="rtl"
                                              value={`${option.weight.toString()}-${index}`}
                                              id={`${q.label}-${index}-${formKey}`}
                                            />
                                            <p>{option.label}</p>
                                            <span className="text-xs text-gray-400">
                                              {" "}
                                              (الدرجة: {option.weight})
                                            </span>
                                          </div>
                                        ))}
                                      </RadioGroup>
                                    </div>
                                  )
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              ))}

              <Button
                onClick={handleSubmit}
                className="w-full mt-6"
                variant={"secondary"}
                disabled={isLoading}
              >
                {isLoading ? "جاري الرفع..." : "رفع الاستبيان"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

export default GovernanceEntries;
