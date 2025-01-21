import {
  Link,
  NavLink,
  useLoaderData,
  useNavigate,
  useParams,
  type LoaderFunctionArgs,
} from "react-router";
import { APIError } from "~/lib/utils/error";
import { OrganizationsAPI } from "~/services/org";
import type { LoaderData, TOrganization } from "~/types/users.types";
import { STEPS } from "./constants/steps";
import { USER_MGMT } from "./glossary";
import { FILE_FIELDS } from "./constants/client-shared";
import { Button } from "~/components/ui/button";
import DownloadIcon from "~/assets/icons/upload.svg?react";
import PDFIcon from "~/assets/icons/pdf.svg?react";
import ImageIcon from "~/assets/icons/jpeg.svg?react";

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const serverUrl = context.cloudflare.env.BASE_URL;
  const object: R2Objects = await (
    context.cloudflare as any
  ).env.KEDAN_DASHBOARD_BUCKET.list();

  const { id } = params;
  // Validate ID parameter
  if (!id || isNaN(Number(id))) {
    return Response.json(
      {
        status: "error" as const,
        message: "Invalid organization ID",
      },
      { status: 400 }
    );
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
       
          }
          else {
          // @ts-ignore

            responseData[field] = [val];
          }

        } catch (e) {
          // @ts-ignore
          responseData[field] = [responseData[field]];
          console.log("Error in parsing json:", e);
        }
      });
    }

    // Return successful response
    return Response.json({
      status: "success" as const,
      data: response.data,
    });
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

const ViewClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>() as unknown as LoaderData;
  return (
    <section className="w-full py-4">
      {loaderData.status === "success" ? (
        <>
          <div className="flex justify-between p-5">
            <h5>{loaderData.data.name}</h5>
            <div className="flex gap-x-4">
              <NavLink to={"dashboard"}>
                <Button variant={"secondary"}>{" عرض لوحة المعلومات"}</Button>
              </NavLink>
              <NavLink to={`/cp/users/org/create-edit/${id}`}>
                <Button variant={"outline"}>{"تعديل البيانات"}</Button>
              </NavLink>
            </div>
          </div>
          {/* Main Entries */}
          <div className="p-5">
            <h6>{STEPS.MAIN_ENTRIES.title}</h6>
            <p>{STEPS.MAIN_ENTRIES.description}</p>
            <hr className="my-4" />

            <div className="p-5">
              {STEPS.MAIN_ENTRIES.fields.map((field) => (
                <div className="w-4/5 flex  items-start content-start gap-x-8 gap-y-4 self-stretch flex-wrap  my-2 ">
                  <label className="max-w-72  min-w-52 flex-[1_0_0]">
                    *{USER_MGMT.FORM_FIELDS[field.label]}
                  </label>
                  <p>{loaderData.data[field.label]}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Location Entries */}
          <div className="p-5">
            <h6>{STEPS.LOCATION_ENTRIES.title}</h6>
            <p>{STEPS.LOCATION_ENTRIES.description}</p>
            <hr className="my-4" />
            <div className="p-5">
              {STEPS.LOCATION_ENTRIES.fields.map((field) => (
                <div className="w-4/5 flex  items-start content-start gap-x-8 gap-y-4 self-stretch flex-wrap  my-2 ">
                  <label className="max-w-72  min-w-52 flex-[1_0_0]">
                    *{USER_MGMT.FORM_FIELDS[field.label]}
                  </label>
                  <p>{loaderData.data[field.label]}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Rep Entries */}
          <div className="p-5">
            <h6>{STEPS.REP_ENTRIES.title}</h6>
            <p>{STEPS.REP_ENTRIES.description}</p>
            <hr className="my-4" />
            <div className="p-5">
              {STEPS.REP_ENTRIES.fields.map((field) => (
                <div className="w-4/5 flex  items-start content-start gap-x-8 gap-y-4 self-stretch flex-wrap  my-2 ">
                  <label className="max-w-72  min-w-52 flex-[1_0_0]">
                    *{USER_MGMT.FORM_FIELDS[field.label]}
                  </label>
                  <p>{loaderData.data[field.label]}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Attachments Entries */}
          <div className="p-5">
            <h6>{STEPS.ATTACHMENTS_ENTRIES.title}</h6>
            <p>{STEPS.ATTACHMENTS_ENTRIES.description}</p>
            <hr className="my-4" />
            <div className="p-5">
              {STEPS.ATTACHMENTS_ENTRIES.fields.map((field) => (
                <div className="w-4/5 flex  items-start content-start gap-x-8 gap-y-4 self-stretch flex-wrap  my-2 ">
                  <label className="max-w-72  min-w-52 flex-[1_0_0]">
                    *{USER_MGMT.FORM_FIELDS[field.label]}
                  </label>

                  <div className="">
                    <ul>
                      {/* {JSON.stringify(loaderData.data[field.label])} */}
                      {Array.isArray(loaderData.data[field.label]) ? (
                        (loaderData.data[field.label] as string[]).map(
                          (file, i) => (
                            <li
                              key={i}
                              className="relative flex gap-x-2  p-4 w-full mb-2 rounded-lg border border-[#E9EAEB] bg-white hover:border-secondary-600"
                            >
                              <div>
                                {file.split(".")[1] === "pdf" ? (
                                  <PDFIcon height={24} width={24} />
                                ) : (
                                  <ImageIcon height={24} width={24} />
                                )}
                              </div>
                              <div className="flex flex-col  ml-6 text-right justify-start w-full">
                                <span className="text-sm">
                                  {file.split(".")[0]}
                                </span>
                              </div>

                              <Link
                                className="ml-2 p-2 hover:bg-gray-100 rounded-md transition-all"
                                to={`/download/${file}`}
                                reloadDocument
                                download={file}
                              >
                                <Button
                                  className="absolute top-1 left-2 w-fit  bg-transparent hover:bg-gray-100  px-2"
                                  loading={false}
                                  variant={"ghost"}
                                >
                                  <DownloadIcon stroke="#00AE84" />
                                </Button>
                              </Link>
                            </li>
                          )
                        )
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>error</>
      )}
    </section>
  );
};

export default ViewClient;
