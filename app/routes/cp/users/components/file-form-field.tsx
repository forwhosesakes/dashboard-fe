import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { UseFormGetFieldState, UseFormRegister } from "react-hook-form";
import { Button } from "~/components/ui/button";
import type { TField, TFormDataInput } from "~/types/users.types";
import UploadIcon from "~/assets/icons/upload.svg?react";
import RemoveIcon from "~/assets/icons/remove.svg?react";
import PDFIcon from "~/assets/icons/pdf.svg?react";
import WordIcon from "~/assets/icons/word.svg?react";
import ExcelIcon from "~/assets/icons/word.svg?react";
import ImageIcon from "~/assets/icons/jpeg.svg?react";


import { USER_MGMT } from "../glossary";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: TField;
  register: UseFormRegister<TFormDataInput>;
  getFieldState: UseFormGetFieldState<TFormDataInput>;
}
const FileFormField = ({ field, getFieldState, register, ...rest }: IProps) => {
    
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const fieldState = getFieldState(field.label);
  const error = fieldState.isTouched ? fieldState.error?.message : "";
  console.log('fild', fieldState);


  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {};
      reader.readAsArrayBuffer(file);
    });
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  const removeFileFromSelection = (file: any) => {
    setSelectedFiles(selectedFiles.filter((f) => file.path !== f.path));
  };

  const uploadMaterial = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    // fetcher.submit(formData, {
    //   method: "POST",
    //   encType: "multipart/form-data",
    // })
  };

  return (
   <> <div className="flex my-6 ">
      <div className="max-w-72  min-w-72 flex-[1_0_0]">
        <label  className=""> *{USER_MGMT.FORM_FIELDS[field.label]}</label>

        {field.description && (
          <p className="text-primary-800 my-1 text-xs"> {field.description}</p>
        )}

        <p className="text-red-800 my-1 text-xs"> {error}</p>
      </div>
<div className="file-stuff  mx-auto text-center   w-2/3">
      <div
        className="rounded-lg bg-white border cursor-pointer p-5 border-[#E9EAEB]  hover:border-secondary-600 transition-colors "
        {...getRootProps()}
      >
        <input {...register(field.label)}  {...getInputProps()} />
        <div className="border-2 flex justify-center items-center border-gray-100 shadow-custom p-1 w-12 h-12 mx-auto rounded-lg">
          <UploadIcon />
        </div>
        {isDragActive ? (
          <p>أفلت الملفات هنا</p>
        ) : (
          <p className="text-sm mt-4">
            <span className="ml-1 text-secondary"> قم بالضغط للتحميل</span> أو
            بالسحب والإفلات{" "}
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
                <div>
                    {field.type==="FILE"? <PDFIcon/>:<ImageIcon/>}
                </div>
                <div className="flex flex-col  text-right justify-start w-full">
                <span className="">{file.relativePath.split("/")[1]?.split(".")[0]}</span>
                <span className="">{file.size} بايت</span>
                </div>
       

                <Button
                  onClick={() => removeFileFromSelection(file)}
                  className="absolute top-1 left-2 w-fit  bg-transparent hover:bg-gray-100  px-2"
                  loading={false}
                  variant={"ghost"}
                >
                  <RemoveIcon/>
                </Button>
           
              </li>



            ))}
          </ul>
          {error && <span className="text-red-800 my-1 text-xs">{error}</span>}
        </div>
      )}
    </div>
   
    </div>

    <hr className="my-4"/>
    </>
  );
};

export default FileFormField;
