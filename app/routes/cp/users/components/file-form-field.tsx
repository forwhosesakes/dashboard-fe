import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  type Control,
  type UseFormGetFieldState,
} from "react-hook-form";
import { Button } from "~/components/ui/button";
import type { TField, TFormDataInput } from "~/types/users.types";
import UploadIcon from "~/assets/icons/upload.svg?react";
import RemoveIcon from "~/assets/icons/remove.svg?react";
import PDFIcon from "~/assets/icons/pdf.svg?react";
import DownloadIcon from "~/assets/icons/upload.svg?react";
import ImageIcon from "~/assets/icons/jpeg.svg?react";

import { USER_MGMT } from "../glossary";
import { Link } from "react-router";
import { formatFileSize } from "~/lib/format-file-size";
import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: TField;
  control: Control<TFormDataInput>;
  error:string,
  getFieldState: UseFormGetFieldState<TFormDataInput>;
}
const FileFormField = ({ field, getFieldState,error, control, ...rest }: IProps) => {

  return (
    <>
      {" "}
      <div className="flex my-6 ">
        <div className="max-w-72  min-w-72 flex-[1_0_0]">
          <label className=""> *{USER_MGMT.FORM_FIELDS[field.label]}</label>

          {field.description && (
            <p className="text-primary-800 my-1 text-xs">
              {" "}
              {field.description}
            </p>
          )}
        </div>
        <div className="file-stuff  mx-auto text-center   w-2/3">
          <Controller
            name={field.label}
            control={control}
            render={({ field: { onChange, value }, fieldState }) => {
              const [selectedFiles, setSelectedFiles] = useState(
                (value as unknown as any[]) ?? []
              );


              const onDrop = useCallback(
                (acceptedFiles: any[]) => {
                  // Do something with the files
                  acceptedFiles.forEach((file) => {
                    const reader = new FileReader();
                    reader.onabort = () =>
                      console.log("file reading was aborted");
                    reader.onerror = () =>
                      console.log("file reading has failed");
                    reader.onload = () => {};
                    reader.readAsArrayBuffer(file);
                  });
                  setSelectedFiles((prev) => {
                    onChange([...prev, ...acceptedFiles]);
                    return [...prev, ...acceptedFiles];
                  });
                },
                [onChange, value]
              );
              const { getRootProps, getInputProps, isDragActive } = useDropzone(
                {
                  onDrop,
                  accept: {
                    "application/pdf": [".pdf"],
                    "image/*": [".png", ".jpg", ".jpeg"],
                  },
                }
              );

              const removeFileFromSelection = (file: any) => {
                setSelectedFiles((prev) => {
                  onChange(selectedFiles.filter((f) => file.path !== f.path));
                  return selectedFiles.filter((f) => file.path !== f.path);
                });
              };

              return (
                <>
                  {" "}
                  <div
                    className="rounded-lg  bg-white border cursor-pointer p-5 border-[#E9EAEB]  hover:border-secondary-600 transition-colors "
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className="border-2 flex justify-center items-center border-gray-100 shadow-custom p-1 w-12 h-12 mx-auto rounded-lg">
                      <UploadIcon />
                    </div>
                    {isDragActive ? (
                      <p>أفلت الملفات هنا</p>
                    ) : (
                      <p className="text-sm mt-4">
                        <span className="ml-1 text-secondary">
                          {" "}
                          قم بالضغط للتحميل
                        </span>{" "}
                        أو بالسحب والإفلات{" "}
                      </p>
                    )}
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-6  ">
                      <ul>
                        {selectedFiles.map((file, i) => (
                          <li
                            key={i}
                            className="relative flex gap-x-8  p-4 w-full my-2  rounded-lg border border-[#E9EAEB] bg-white hover:border-secondary-600"
                          >
                            {file instanceof File ? (
                              <>
                                <div>
                                  {field.type === "FILE" ? (
                                    <PDFIcon />
                                  ) : (
                                    <ImageIcon />
                                  )}
                                </div>
                                <div className="flex flex-col  text-right justify-start w-full">
                                  <span className="">
                                  
                                    {
                                        /* @ts-ignore */
                                      file.relativePath
                                        .split("/")[1]
                                        ?.split(".")[0]
                                    }
                                  </span>
                                  <span className="">{formatFileSize(file.size)}</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  {(file as string).split(".")[1] === "pdf" ? (
                                    <PDFIcon />
                                  ) : (
                                    <ImageIcon />
                                  )}
                                </div>
                                <div className="flex flex-col  text-right justify-start w-full">
                                  <span className="">
                                    {/* @ts-ignore */}
                                    {file.split(".")[0]}
                                  </span>
                                </div>
                              </>
                            )}
                            <div className="absolute top-1 left-2 flex gap-x-1">
                              <Button
                              type="button"
                                onClick={(e) => {e.preventDefault(); removeFileFromSelection(file)}}
                                className="p-1  w-fit  bg-transparent hover:bg-gray-100 "
                                loading={false}
                                variant={"ghost"}
                              >
                                <RemoveIcon />
                              </Button>

                           {typeof file ==="string"&&   <Link
                                className=" hover:bg-gray-100 p-1 flex items-center rounded-md transition-all"
                                to={`/download/${file}`}
                                reloadDocument
                                download={file}
                              >
                               
                                  <DownloadIcon stroke="#00AE84" />
                                
                              </Link>}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {error && (
                        <span className="text-red-800 my-1 text-xs">
                          {error}
                        </span>
                      )}
                    </div>
                  )}
                  <hr className="my-4" />
                </>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FileFormField;