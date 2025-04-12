
import type { TSteps } from "~/types/users.types";
import MainEntries from "../client-form-steps/main-entries";
import LocationEntries from "../client-form-steps/location-entries";
import RepEntries from "../client-form-steps/rep-entries";
import AttachmentsEntries from "../client-form-steps/attachments-entries";
import SettingsEntries from "../client-form-steps/settings-entries";


export const REGIONS =[
    "الرياض",
    "مكة المكرمة",
    "المدينة المنورة",
    "جدة",
    "أبها",
    "الدوادمي",
    "حائل",
    "الخفجي",
    "الباحة",
    "بريدة",
    "عنيزة",
    "تبوك",
    "جازان",
    "الدمام",
    "سكاكا",
    "عرعر",
    "نجران" ,
    "الطائف",
    "خميس مشيط",
    "الهفوف",
    "حفر الباطن",
    "الجبيل",
    "ينبع",
    "الرس",
    "بيشة",
    "القطيف",
    "الباحة",
    "الخبر"
    

]

export const STEPS: TSteps = {
  MAIN_ENTRIES: {
      fields: [
          { label: "name", type: "TEXT", placeholder: "اسم الجمعية" },
          { label: "phoneNumber", type: "TEXT",placeholder:"+966 (555) 000-0000" },
          { label: "email", type: "EMAIL",placeholder:"Kmsalms@gmail.com" },
          { label: "type", type: "DROPDOWN",placeholder:"اختر تصنيف الجمعية", options:["technical","waqfi"] },
        //   { label: "category", type: "DROPDOWN",placeholder:"اختر تخصص الجمعية" , options:["mosques","orphans", "none"]},

          { label: "licenseNumber", type: "TEXT",placeholder:"رقم الترخيص" },
          { label: "website", type: "TEXT" ,placeholder:"www.untitledui.com"},
      ],
      title: "بيانات الجمعية",
      description: "بيانات الجمعية الأساسية",
      component: MainEntries,
      status: "CURRENT"
  },
  LOCATION_ENTRIES: {
      fields: [
          { label: "address", type: "TEXT" ,placeholder:"العنوان الوطني"},
          { label: "city", type: "DROPDOWN" ,placeholder:"اختار المدينة", options:REGIONS},
        //   { label: "neighbor", type: "TEXT" ,placeholder:"الحي"},
        //   { label: "street", type: "TEXT" ,placeholder:"الشارع"},
        //   { label: "map", type: "TEXT",placeholder:"خارطة الجمعية" },
      ],
      title: "موقع الجمعية",
      description: "البيانات الديموغرافية  ",
      component: LocationEntries,
      status: "IDLE"
  },
  REP_ENTRIES: {
      fields: [
          {
              label: "repName",
              type: "TEXT",
              placeholder:"اسم الممثل"
          },
          {
              label: "repPhoneNumber",
              type: "TEXT",
              placeholder:"+966 (555) 000-0000"
          },
          {
              label: "repEmail",
              type: "TEXT",
              placeholder:"Kmsalms@gmail.com"
          },
      ],
      title: "ممثل الجمعية",
      description: "بيانات ممثل الجمعية ",
      component: RepEntries,
      status: "IDLE"
  },
  ATTACHMENTS_ENTRIES: {
      fields: [
          {
              label: "logo",
              description:"سيتم عرض هذا في ملف الجمعية الشخصي.",
            
              type: "IMAGE"
          },
          {
              label: "officialDocs",
              description:"شارك بعض المقتطفات من عملك.",
              type: "FILE"
          },
          {
              label: "operationalPlanImage",
              type: "FILE"
          },
          {
              label: "repSpeach",
              type: "FILE"
          },
          {
              label: "contractImage",
              type: "FILE"
          },
          {
              label: "additionalDocs",
              type: "FILE"
          },
      ],
      title: "الشعار والمستندات",
      description: "المستندات الرسمية ",
      component: AttachmentsEntries,
      status: "IDLE"
  },
  SETTINGS_ENTRIES: {
      fields: [
          {
              label: "allDashboardsSetting",
              type: "TOGGLE_SLIDER"
          },
          {
              label: "governanceIndicatorsSetting",
              type: "TOGGLE_SLIDER"
          },
    
       
      ],
      title: "الصلاحيات والخصائص",
      description: "تخصيص لوحة التحكم",
      component: SettingsEntries,
      status: "IDLE"
  },
};
