import { z } from "zod";

export const clientFormDataSchema = z.object({
  name: z.string().min(5, "يرجى إدخال الاسم "),
  phoneNumber: z.string().min(1, "يرجى إدخال الرقم"),
  email: z.string().email("يرجى إدخال البريد الالكتروني  "),
  type: z.enum(["technical", "waqfi"], {
    required_error: "يجب أن يكون تصنيف الجمعية إما تقنيًا أو وقفيًا",

  }),
  category: z.string().min(3, "يرجى إدخال تخصص الحمعية "),
  licenseNumber: z.string().min(1, "يرجى إدخال رقم الرخصة"),
  website: z.string().url("يرجى إدخال الرابط  "),
  address: z.string().min(1, "يرجى إدخال الموقع"),
  city: z.string().min(1, "يرجى إدخال المدينة"),
  neighbor: z.string().min(1, "يرجى إدخال الحي"),
  street: z.string().min(1,  "يرجى إدخال الشارع"),
  map: z.string().min(1,  "يرجى إدخال الخريطة"),
  repName: z.string().min(1,  "يرجى إدخال اسم الممثل"),
  repPhoneNumber: z.string().min(1,  "يرجى إدخال رقم جوال الممثل"),
  repEmail: z.string().email( "يرجى إدخال بريد الكتروني صحيح للممثل"),
  
  // File validations
  logo: z.array(z.instanceof(File, { message:  "يرجى رفع صورة للشعار"})).length(1, "يسمح برفع صورة واحدة فقط"),
  officialDocs: z.array(z.instanceof(File, { message: "يرجى رفع نسخ من المستندات الرسمية " })),
  operationalPlanImage: z.array(z.instanceof(File, { message: "يرجى رفع نسخ من المستندات المطلوبة " })),
  repSpeach: z.array(z.instanceof(File, { message: "يرجى رفع نسخ من المستندات المطلوبة " })),
  licenseImage: z.array(z.instanceof(File, { message: "يرجى رفع نسخ من المستندات المطلوبة " })),
  contractImage: z.array(z.instanceof(File, { message: "يرجى رفع نسخ من المستندات المطلوبة " })),
  additionalDocs: z.array(z.instanceof(File, { message: "يرجى رفع نسخ من المستندات المطلوبة " })),
  
  // Indicators settings
  financialIndicatorsSetting: z.union([
    z.number().min(0, "Financial indicators setting must be a positive number"),
    z.literal(false)
  ]),
  operationalIndicatorsSetting: z.union([
    z.number().min(0, "Operational indicators setting must be a positive number"),
    z.literal(false)
  ]),
  corporateIndicatorsSetting: z.union([
    z.number().min(0, "Corporate indicators setting must be a positive number"),
    z.literal(false)
  ]),
  generalndicatorsSetting: z.union([
    z.number().min(0, "General indicators setting must be a positive number"),
    z.boolean()
  ]),
});

export type TFormDataSchema = z.infer<typeof clientFormDataSchema>;