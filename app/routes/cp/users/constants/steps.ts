
import type { TSteps } from "~/types/users.types";
import MainEntries from "../client-form-steps/main-entries";
import LocationEntries from "../client-form-steps/location-entries";
import RepEntries from "../client-form-steps/rep-entries";
import AttachmentsEntries from "../client-form-steps/attachments-entries";
import SettingsEntries from "../client-form-steps/settings-entries";


export const STEPS: TSteps = {
  MAIN_ENTRIES: {
      fields: [
          { label: "name", type: "TEXT", placeholder: "" },
          { label: "phoneNumber", type: "TEXT", },
          { label: "email", type: "EMAIL", },
          { label: "type", type: "TEXT", },
          { label: "licenseNumber", type: "TEXT" },
          { label: "website", type: "TEXT" },
      ],
      title: "بيانات الجمعية",
      description: "بيانات الجمعية الأساسية",
      component: MainEntries,
      status: "IDLE"
  },
  LOCATION_ENTRIES: {
      fields: [
          { label: "address", type: "TEXT" },
          { label: "city", type: "TEXT" },
          { label: "neighbor", type: "TEXT" },
          { label: "street", type: "TEXT" },
          { label: "map", type: "TEXT" },
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
              type: "TEXT"
          },
          {
              label: "repPhoneNumber",
              type: "TEXT"
          },
          {
              label: "repEmail",
              type: "TEXT"
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
              label: "financialIndicatorsSetting",
              type: "TOGGLE_SLIDER"
          },
          {
              label: "operationalIndicatorsSetting",
              type: "TOGGLE_SLIDER"
          },
          {
              label: "corporateIndicatorsSetting",
              type: "TOGGLE_SLIDER"
          },
          {
              label: "generalndicatorsSetting",
              type: "TOGGLE_SLIDER"
          },
      ],
      title: "الصلاحيات والخصائص",
      description: "تخصيص لوحة التحكم",
      component: SettingsEntries,
      status: "IDLE"
  },
};
