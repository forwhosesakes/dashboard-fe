import {
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";

import { USER_MGMT } from "./glossary";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  StepsEnum,
  type LoaderData,
  type TFormDataInput,
  type TOrganization,
} from "~/types/users.types";
import { STEPS } from "./constants/steps";
import Stepper from "~/components/ui/stepper/stepper";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormDataSchema } from "./constants/client-schema";
import { APIError } from "~/lib/utils/error";
import { OrganizationsAPI } from "~/services/org";
import { createToastHeaders } from "~/lib/toast.server";
import { FILE_FIELDS } from "./constants/client-shared";
import LoadingOverlay from "~/components/loading-overlay";
import { Breadcrumbs } from "~/components/app-breadcrumbs";
import { sanitizeArabicFilenames } from "~/lib/sanitize-filename";
import { authClient } from "~/lib/auth-client";


const initialValues = {
  // Text fields
  name: "",
  phoneNumber: "",
  email: "",
  type: "technical" as "technical" | "waqfi", // Default to one of the enum values
  category: "none",
  licenseNumber: "",
  website: "",
  address: "",
  city: "الرياض",
  neighbor: "",
  street: "",
  map: "",
  repName: "",
  repPhoneNumber: "",
  repEmail: "",

  // File arrays - initialize as empty arrays
  logo: [],
  officialDocs: [],
  operationalPlanImage: [],
  repSpeach: [],
  licenseImage: [],
  contractImage: [],
  additionalDocs: [],
  // Indicator settings - initialize with false or 0
  financialIndicatorsSetting: 30,
  operationalIndicatorsSetting: 30,
  corporateIndicatorsSetting: 40,
  generalndicatorsSetting: 100,
  governanceIndicatorsSetting:true,
    allDashboardsSetting:true
};

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const serverUrl = context.cloudflare.env.BASE_URL;

  const { id } = params;
  // Validate ID parameter
  if (!id || isNaN(Number(id))) {
    return Response.json(
      {
        status: "warn" as const,
        message: "CREATE_MODE",
      },
      { status: 200 }
    );
  }
    const cookieHeader = request.headers.get("Cookie");
    
    const res = await authClient(serverUrl).getSession({
      fetchOptions: {
        headers: {
          Cookie: cookieHeader || "",
        },
      },
    });
    const user = res.data?.user

    if(user?.subRole!=="admin"){
      return redirect("/cp/users")
    }

  try {
    // Call the API
    const response = await OrganizationsAPI.getById(Number(id), serverUrl);

    // Check for API-level errors
    if (response.status !== "success") {
      throw new Error(response.message);
    }

    const responseData = response.data as TOrganization;
    if (responseData) {
      FILE_FIELDS.forEach((field: any) => {
        try {
          // @ts-ignore
          const val = JSON.parse(responseData[field]) ?? [];
          if (Array.isArray(val)) {
            // @ts-ignore
            responseData[field] = val;
          } else {
            // @ts-ignore

            responseData[field] = [val];
          }
        } catch (e) {
          // @ts-ignore
          responseData[field] = [responseData[field]];
          console.log("Error in parsing json:", e);
        }
      });

      // Return successful response
      return Response.json({
        status: "success" as const,
        data: response.data,
      });
    }
  } catch (error) {
    // Handle different types of errors
    if (error instanceof APIError) {
      return Response.json(
        {
          status: "error" as const,
          message: error.response.message || "API Error",
        },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    console.error("Unexpected error in organizations loader:", error);
    return Response.json(
      {
        status: "error" as const,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function action({ request, context }: ActionFunctionArgs) {
  const uploadHandler = async (props: FileUpload) => {
    // const key = `${Date.now()}-${createId()}.${filename.split(".")[1]}`;
    if (props.fieldName) {
      const key = `${Date.now()}-${sanitizeArabicFilenames(props.name?.split(".")[0])}.${props.name?.split(".").pop()}`;
      const buffer = await props.arrayBuffer();
      const x = await context.cloudflare.env.KEDAN_DASHBOARD_BUCKET.put(
        key,
        buffer,
        {
          httpMetadata: {
            contentType,
          },
        }
      );
      return key;
    }
  };
  const contentType = request.headers.get("Content-Type") || "";
  let id=null

  // Handle multipart form data (file uploads)
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await parseFormData(request, uploadHandler as any);

       id = formData.get("id")

     

      // convert the form data into json, stringify the fields with arrays
      //  call the post org servive to create/update the org

      let orgObject: any = {};

      for (const [key, value] of formData.entries()) {
        if (FILE_FIELDS.includes(key)) {
          orgObject[key] = JSON.stringify(formData.getAll(key));
        } else if (key === "generalndicatorsSetting") {
          orgObject[key] = value == "true" ? 100 : 0;
        } else if (
          [
            "corporateIndicatorsSetting",
            "operationalIndicatorsSetting",
            "financialIndicatorsSetting",
          ].includes(key)
        ) {
          orgObject[key] = value == "false" ? 0 : value;
        } else orgObject[key] = value;
      }

      const res = await OrganizationsAPI.createUpdate(
        orgObject,
        context.cloudflare.env.BASE_URL
      );
      let err=""
      if (res.status!=="success") {
        // Handle specific error cases
        if (res.error?.code === 'USER_ALREADY_EXISTS') {
            // Show appropriate error message to user
         err="البريد الالكتروني للمستخدم مسجل مسبقًا"
        }
        return Response.json(
          { success: false },
          {
            headers: await createToastHeaders(
              {
                description: err,
                title: !!id?"حدث خطأ أثناء تحديث الجمعية": "حدث خطأ أثناء إضافة الجمعية",
                type: "error",
              },
              context.cloudflare.env.SESSION_SECRET
            ),
          }
        );
      
    }

      return Response.json(
        { success: true, data: res },
        {
          headers: await createToastHeaders(
            {
              description: "",
              title: !!id? "تم تحديث الجمعية بنجاح": "تمت إضافة الجمعية بنجاح",
              type: "success",
            },
            context.cloudflare.env.SESSION_SECRET
          ),
        }
      );
    } catch (error) {
      // console.error("Upload failed:", error);
      return Response.json(
        { status: "false" },
        {
          headers: await createToastHeaders(
            {
              description: "",
              title: !!id?"حدث خطأ أثناء تحديث الجمعية": "حدث خطأ أثناء إضافة الجمعية",
              type: "error",
            },
            context.cloudflare.env.SESSION_SECRET
          ),
        }
      );
    }
  }
}

const CreateEditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetcher = useFetcher();



  const loaderData = useLoaderData() as unknown as LoaderData;

  const formHook = useForm<TFormDataInput>({
    mode: "all",
    //@ts-ignore
    defaultValues:
      loaderData.status === "success"
        ? (loaderData.data as unknown as TFormDataInput)
        : initialValues,
    resolver: zodResolver(clientFormDataSchema),
  });
  const [formSteps, setFormSteps] = useState(STEPS);

  useEffect(() => {}, [formHook.formState]);

  useEffect(() => {
    document.title = id?"تعديل بيانات الجمعية":"إنشاء جمعية جديدة";
  }, []);

  const onSubmit = (data: TFormDataInput) => {
    let formData = new FormData();

    Object.keys(data)
      .filter((key) => !FILE_FIELDS.includes(key))
      .forEach((key) =>
        formData.append(key, data[key as keyof TFormDataInput].toString())
      );

    FILE_FIELDS.forEach((field: string) => {
      const dataFiles = data[
        field as keyof TFormDataInput
      ] as unknown as File[];
      dataFiles.forEach((df) => {
        formData.append(field, df);
      });
    });
    if (id) {
      formData.append("id", id);
    }

    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });

    //Todo: upload all the files and reteive their url in r2 storage
    // uploadFiles(files as {file:File, field:string}[])
  };
  const isThisFormSectionValid = async (formSection: StepsEnum) => {
    const results = await Promise.all(
      STEPS[formSection].fields.map(async (field) => {
        const isValid = await formHook.trigger(field.label);
        return isValid && !formHook.formState.errors[field.label];
      })
    );
    return results.every((result) => result);
  };
  const onStepChange = async (
    prevStep: StepsEnum,
    currentStep: null | StepsEnum
  ) => {
    const statusForNextStep = (await isThisFormSectionValid(prevStep))
      ? "DONE"
      : "IDLE";

    setFormSteps((prev) => {
      let newst = {
        ...prev,
        [prevStep]: { ...prev[prevStep], status: statusForNextStep },
      };
      if (currentStep)
        newst[currentStep] = { ...newst[currentStep], status: "CURRENT" };

      return newst;
    });
  };

  return (
    <section className="w-full p-12 ">
      {fetcher.state !== "idle" && (
        <LoadingOverlay message={id? "جاري تحديث الجمعية":"جاري إضافة الجمعية"} />
      )}
      <h5>{id ? USER_MGMT.EDIT_CLIENT : USER_MGMT.CREATE_CLIENT}</h5>

      <div className="mt-3">
      <Breadcrumbs items={[
        {label:"الرئيسية",href:"/"},
        {label:"الجمعيات", href:"/cp/users"},
        {label:id ? USER_MGMT.EDIT_CLIENT : USER_MGMT.CREATE_CLIENT}
      ]}/>
      </div>
      <form onSubmit={formHook.handleSubmit(onSubmit)}>
        <Stepper<UseFormReturn<TFormDataInput, any, undefined>>
          onComplete={() => {
            // console.log("completed");
            navigate("/cp/users")
          }}
          completeDisable={!formHook.formState.isValid}
          steps={formSteps}
          additionalProps={formHook}
          cancelStepper={() => navigate("/cp/users")}
          onStepChange={onStepChange}
          disabledSteps={!!id&&[StepsEnum.SETTINGS_ENTRIES]}     
        />
      </form>
    </section>
  );
};

export default CreateEditClient;
