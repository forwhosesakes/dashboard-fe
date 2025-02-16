import type { TGovernanceEntries } from "~/types/dashboard.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useReducer, useState } from "react";
import { GOVERANCE_TABS, governanceLabels } from "../constants/glossary";
import { COMPLIANCE_ADHERENCE_PRACTICES_QUESTIONS } from "../constants/governance";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { dashboardApi } from "~/lib/api/dashboard";
import { toasts } from "~/lib/utils/toast";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";


const GovernanceEntries = () => {
  const tabs: TGovernanceEntries[] = [
    "COMPLIANCE_ADHERENCE_PRACTICES",
    "FINANCIAL_SAFETY_PRACTICES",
    "TRANSPARENCY_DISCLOSURE_PRACTICES",
  ];
  const {baseUrl, id } = useLoaderData();
  const [govTab, setGovTab] = useState<TGovernanceEntries>(
    "COMPLIANCE_ADHERENCE_PRACTICES"
  );
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isFormMode, triggerFormMode] = useReducer((st) => !st, false);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleResponse = (sectionId: any, questionLabel: any, value: any) => {
    setResponses((prev: any) => ({
      ...prev,
      [questionLabel]: value,
    }));
  };

  const shouldShowQuestion = (
    question: any,
    sectionQuestions: any[],
    index: number
  ) => {
    if (index === 0) return true;
    if (!question.isDependantOnPrev) return true;

    const previousQuestion = sectionQuestions[index - 1];
    const previousResponse = responses[previousQuestion.label];
    console.log("previousResponse:::", previousResponse);

    return (
      previousResponse &&
      previousQuestion.options[Number(previousResponse.split("-").pop())]
        ?.moveToNext
    );
  };

  const handleTabChange = (value: string) => {
    setGovTab(value as TGovernanceEntries);
  };
// Function to check if a question should be answered
const shouldQuestionBeAnswered = (question: any, sectionQuestions: any[], i: number) => {
  if (i === 0) return true;
  if (!question.isDependantOnPrev) return true;
  
  const previousQuestion = sectionQuestions[i - 1];
  const previousResponse = responses[previousQuestion.label];
  
  if (!previousResponse) return false;
  
  const [value, index] = previousResponse.split('-');
  return previousQuestion.options[parseInt(index)]?.moveToNext;
};

// Function to get all required question labels
const getRequiredQuestions = () => {
  const required = new Set<string>();
  
  Object.values(COMPLIANCE_ADHERENCE_PRACTICES_QUESTIONS).forEach(section => {
    section.questions.forEach((question, index) => {
      if (shouldQuestionBeAnswered(question, section.questions, index)) {
        required.add(question.label);
      }
    });
  });
  
  return required;
};

// Check if all required questions are answered
const hasUnansweredQuestions = () => {
  const requiredQuestions = getRequiredQuestions();
  return Array.from(requiredQuestions).some(label => !responses[label]);
};
    


  const handleSubmit = async () => {
    console.log("responses submitted:::", responses)
    if (hasUnansweredQuestions()) {
      setShowValidation(true);
      toasts.error({
        message: "خطأ في تعبئة النموذج",
        description: "يرجى الإجابة على جميع الأسئلة المطلوبة"
      });
      return;
    }
    setIsLoading(true);
    try {
      // Transform responses to just the weight values
      const transformedResponses = Object.entries(responses).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: Number(value.split("-")[0]),
        }),
        {}
      );
      if (id)
        await dashboardApi(baseUrl).saveGovernanceEntries(
          id,
          govTab,
          transformedResponses
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

  return (
    <>


      <div className="flex mb-8 gap-x-2 text-gray-500">
      <Switch dir="ltr" checked={!!isFormMode} onCheckedChange={triggerFormMode} />{"اظهار استبيانات الحوكمة"}
        </div>
     {isFormMode&&  <Tabs
        defaultValue={govTab}
        dir="rtl"
        className="w-full mb-4"
        onValueChange={handleTabChange}
      >
     
        <TabsList className="w-full justify-start bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger value={tab}>{GOVERANCE_TABS[tab]}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={govTab}>
         <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            {Object.entries(COMPLIANCE_ADHERENCE_PRACTICES_QUESTIONS).map(
              ([sectionId, section], i) => (
                <div key={sectionId} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg text-secondary-900 font-semibold">
                      القسم {i + 1}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      (الدرجة: {section.weight})
                    </span>
                  </div>
                  <Separator />

                  {section.questions.map(
                    (question, qIndex) =>
                      shouldShowQuestion(
                        question,
                        section.questions,
                        qIndex
                      ) && (
                        <div
                          key={question.label}
                          className="p-4 border rounded-lg"
                        >
                          <p className="text-sm font-medium mb-4">
                            {qIndex + 1}.{" "}
                            {
                              //@ts-ignore
                              governanceLabels.COMPLIANCE_ADHERENCE_PRACTICES[
                                question.label
                              ]
                            }
                          </p>
                          <RadioGroup
                            dir="rtl"
                            onValueChange={(value) =>
                              handleResponse(sectionId, question.label, value)
                            }
                            value={responses[question.label]}
                            className="space-y-2"
                          >
                            {question.options.map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  dir="rtl"
                                  value={`${option.weight.toString()}-${index}`}
                                  id={`${question.label}-${index}`}
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
              )
            )}

            <Button
              onClick={handleSubmit}
              className="w-full mt-6"
              
              variant={"secondary"}
            >
              رفع الاستبيان
            </Button>
          </div>
        </TabsContent>
      </Tabs>}
    </>
  );
};

export default GovernanceEntries;
