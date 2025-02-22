import { z } from "zod";

export const clientFormDataSchema = z.object({
  name: z.string({
    required_error: "الاسم مطلوب"
  })
    .min(3, "يجب أن يحتوي الاسم على 3 أحرف على الأقل"),
    phoneNumber: z.string({
      required_error: "رقم الجوال مطلوب"
    })
      .regex(/^[\d+]+$/, "يجب أن يحتوي رقم الجوال على أرقام فقط")
      .min(10, "يجب أن يتكون رقم الجوال من 10 أرقام على الأقل"),
  email: z.string({
    required_error: "البريد الإلكتروني مطلوب"
  })
    .email("يرجى إدخال بريد إلكتروني صحيح")
    .toLowerCase(),
    type: z.enum(["technical", "waqfi"], {
      required_error: "يجب اختيار تصنيف الجمعية",
    }),
  
    category: z.string({
      required_error: "تخصص الجمعية مطلوب"
    })
      .min(3, "يجب أن يحتوي تخصص الجمعية على 3 أحرف على الأقل")
      .max(50, "يجب أن لا يتجاوز تخصص الجمعية 50 حرف"),

  licenseNumber: z.string().min(1, "يرجى إدخال رقم الرخصة"),
website: z.string() .optional(),
  address: z.string().min(1, "يرجى إدخال الموقع"),
  city: z.string().min(1, "يرجى إدخال المدينة"),
  neighbor: z.string().min(1, "يرجى إدخال الحي"),
  street: z.string().min(1,  "يرجى إدخال الشارع"),
  map: z.string().optional(),
  repName: z.string().min(1,  "يرجى إدخال اسم الممثل"),
  repPhoneNumber: z.string().min(1,  "يرجى إدخال رقم جوال الممثل"),
  repEmail: z.string({
    required_error: "البريد الإلكتروني للممثل مطلوب"
  })
    .email("يرجى إدخال بريد إلكتروني صحيح للممثل")
    .toLowerCase(),
  // File validations
  logo: z.array(
    z.union([
      z.instanceof(File, {
        message: "الشعار مطلوب"
      }).refine(
        file => file.size <= 5 * 1024 * 1024, 
        "يجب أن لا يتجاوز حجم الشعار 5 ميجابايت"
      ).refine(
        file => ['image/jpeg', 'image/png'].includes(file.type),
        "يجب أن يكون الشعار بصيغة JPG أو PNG"
      ),
      z.string()
    ])
  ).length(1, "يجب رفع شعار واحد فقط"),
 
  officialDocs: z.array(
    z.union([
      z.instanceof(File, {
        message: "المستندات الرسمية مطلوبة"
      }).refine(
        file => file.size <= 10 * 1024 * 1024,
        "يجب أن لا يتجاوز حجم المستند 10 ميجابايت"
      ).refine(
        file => ['application/pdf','image/jpeg', 'image/png'].includes(file.type),
        "يجب أن تكون المستندات بصيغة PDFأو PNG أو JPEG"
      ),
      z.string()
    ])
  ).optional(),

  operationalPlanImage: z.array(
    z.union([
      z.instanceof(File, {
        message: "الخطة التشغيلية مطلوبة"
      }).refine(
        file => ['application/pdf','image/jpeg', 'image/png'].includes(file.type),
        "يجب أن تكون المستندات بصيغة PDFأو PNG أو JPEG"
      ),
      z.string()
    ])  ).optional(),

  repSpeach: z.array(
    z.union([
      z.instanceof(File, {
        message: "خطاب الممثل مطلوب"
      }).refine(
        file => ['application/pdf','image/jpeg', 'image/png'].includes(file.type),
        "يجب أن تكون المستندات بصيغة PDFأو PNG أو JPEG"
      ),
      z.string()
    ])
  ).optional(),
  licenseImage: z.array(
    z.union([
      z.instanceof(File, {
        message: "صورة الرخصة مطلوبة"
      }).refine(
        file => ['application/pdf','image/jpeg', 'image/png'].includes(file.type),
        "يجب أن تكون المستندات بصيغة PDFأو PNG أو JPEG"
      ),
      z.string()
    ])
  ).optional(),

  contractImage: z.array(
    z.union([
      z.instanceof(File, {
        message: "صورة العقد مطلوبة"
      }).refine(
        file => ['application/pdf','image/jpeg', 'image/png'].includes(file.type),
        "يجب أن تكون المستندات بصيغة PDFأو PNG أو JPEG"
      ),
      z.string()
    ])
  ).optional(),

  additionalDocs: z.array(
    z.union([
      z.instanceof(File).refine(
        file => file.size <= 10 * 1024 * 1024,
        "يجب أن لا يتجاوز حجم المستند 10 ميجابايت"
      ).refine(
        file => ['application/pdf','image/jpeg', 'image/png'].includes(file.type),
        "يجب أن تكون المستندات بصيغة PDFأو PNG أو JPEG"
      ),
      z.string()
    ])
  ).optional(),
  
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

});

export type TFormDataSchema = z.infer<typeof clientFormDataSchema>;