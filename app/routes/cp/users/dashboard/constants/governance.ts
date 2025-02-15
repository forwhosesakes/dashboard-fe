export const COMPLIANCE_ADHERENCE_PRACTICES_QUESTIONS = {
  Q1: {
    weight: 3,

    questions: [
      {
        label: "HAS_APPROVED_BYLAWS_FROM_ASSEMBLY_AND_CENTER",
        options: [
          {
            label: "لا توجد لائحة أساسية معتمدة من الجمعية العمومية والمركز.",

            weight: 0,
          },
          {
            label: "توجد لائحة أساسية معتمدة من الجمعية العمومية والمركز.",
            weight: 3,
          },
        ],
      },
    ],
  },
  Q2: {
    weight: 1,
    questions: [
      {
        label: "BYLAWS_INCLUDE_MEMBERSHIP_TERMS",
        options: [
          { label: "لم تشتمل.", weight: 0 },
          { label: "تشتمل بشكل متكامل.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },
  Q3: {
    weight: 2,
    questions: [
      {
        label: "BYLAWS_MODIFIED_IN_CURRENT_OR_PREVIOUS_YEAR",
        options: [
          { label: "لم يتم التعديل عليها.", weight: 2},
          { label: " تم التعديل عليها.", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "FOLLOWED_BYLAWS_MODIFICATION_PROCEDURES",
        options: [
          { label: "لم يتم اتباع الإجراءات.", weight: 0 },
          { label: " تم اتباع الإجراءات بشكل متكامل.  .", weight: 2 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },
  Q4: {
    weight: 3,
    questions: [
      {
        label: "MEMBERSHIP_OPEN_TO_PUBLIC",
        options: [
          { label: "لا٫ باب العضوية مقفل.", weight: 0 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "GENERAL_ASSEMBLY_MEMBERSHIP_INCREASING",
        options: [
          { label: "لا يوجد تزايد في عدد الأعضاء.", weight: 0 },
          { label: " يوجد تزايد في عدد الأعضاء.", weight: 3 },
        ],
        isDependantOnPrev: true,
      },


      
    ],
  },
  Q5: {
    weight: 3,
    questions: [
      {
        label: "HAS_UPDATED_MEMBERS_REGISTRY",
        options: [
          { label: "لا يوجد.", weight: 0 },
          { label: "يوجد سجل بشكل جزئي.", weight: 1.5 },
          { label: "يوجد سجل متكامل ومُحدث.", weight: 3 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },
  Q6: {
    weight: 15,
    questions: [
      {
        label:
          "ELECTED_NEW_BOARD_OR_EXECUTIVE_MEMBER_IN_CURRENT_OR_PREVIOUS_YEAR",
        options: [
          { label: "لم يتم انتخاب مجلساً أو عضواً جديداً.", weight: 2 },
          { label: "نعم تم الانتخاب", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "PREVIOUS_BOARD_CLEARED_IN_FIRST_MEETING_AFTER_CHANGE",
        options: [
          { label: "لم يتم إبراء الذمة.", weight:0 },
          { label: "تم إبراء الذمة. ", weight: 2 },
        ],
        isDependantOnPrev: true,
      },
      
      {
        label: "GENERAL_ASSEMBLY_MET_IN_CURRENT_YEAR",
        options: [
          { label: "لم يتم الاجتماع.", weight: 0 },
          { label: "تم الاجتماع.", weight: 2 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "GENERAL_ASSEMBLY_REVIEWED_AUDITOR_REPORT",
        options: [
          { label: "لم يتم مناقشة التقرير.", weight: 0 },
          { label: "تمت المناقشة من غير الاعتماد.", weight: 1 },
          { label: "تم الاجتماع.", weight: 2 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "GENERAL_ASSEMBLY_APPROVED_NEW_BUDGET",
        options: [
          { label: "لم يتم إقرار الميزانية.", weight: 0 },
          { label: "تم إقرار الميزانية.", weight: 3 },
        ],
        isDependantOnPrev: false,
      },
    
   
 
      
      {
        label: "GENERAL_ASSEMBLY_DISCUSSED_NEW_YEAR_PLAN",
        options: [
          { label: "لم يتم مناقشة الخطة.", weight: 0 },
          { label: "تم مناقشة الخطة.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "SUBMITTED_MEETING_MINUTES_TO_CENTER_WITHIN_FIFTEEN_DAYS",
        options: [
          { label: "لم يتم إرسال نسخة من المحاضر.", weight: 0 },
          {
            label: "تم إرسال نسخة من المحاضر لكن بعد 15 يوماً من الاجتماع.",
            weight: 0.5,
          },
          {
            label: "تم إرسال نسخة من المحاضر خلال 15 يوماً من الاجتماع.",
            weight: 1,
          },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_CURRENT_OPERATIONAL_PLAN",
        options: [
          { label: "لا توجد خطة تشغيلية.", weight: 0 },
          { label: " توجد خطة تشغيلية.", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "OPERATIONAL_PLAN_APPROVED_BY_ASSEMBLY",
        options: [
          { label: "لم يتم اعتمادها من الجمعية العمومية.", weight: 0 },
          { label: " تم اعتمادها من الجمعية العمومية.", weight: 2 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },
  Q7: {
    weight: 5,
    questions: [
      {
        label: "EXTRAORDINARY_GENERAL_ASSEMBLY_MET_IN_CURRENT_OR_PREVIOUS_YEAR",
        options: [
          { label: "لم يتم الاجتماع.", weight: 2 },
          { label: " تم الاجتماع", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "MEETINGS_HELD_BASED_ON_VALID_REQUEST",
        options: [
          { label: "لم يتم الاجتماع وفق ما هو محدد.", weight: 0 },
          { label: "تم الاجتماع وفق ما هو محّدد.", weight: 2 },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "EXTRAORDINARY_ASSEMBLY_DISCUSSED_WITHIN_JURISDICTION",
        options: [
          {
            label:
              "ليس كل ما تم مناقشته ضمن اختصاصات الجمعية العمومية غير العادية.",
            weight: 0,
          },
          {
            label:
              "كل ما تم مناقشته ضمن اختصاصات الجمعية العمومية غير العادّية. .",
            weight: 1,
          },
        ],
        isDependantOnPrev: false,
      },

      {
        label:
          "SUBMITTED_EXTRAORDINARY_MEETING_MINUTES_TO_CENTER_WITHIN_FIFTEEN_DAYS",
        options: [
          { label: "لم يتم إرسال نسخة من المحاضر.", weight: 0 },

          {
            label: "تم إرسال نسخة من المحاضر لكن بعد 15 يومًا من الاجتماع.",
            weight: 0.5,
          },
          {
            label: "تم إرسال نسخة من المحاضر خلال 15 يومًا من الاجتماع.",
            weight: 1,
          },
        ],
      },
      {
        label: "DECISIONS_MADE_DURING_MEETING",
        options: [
          { label: "لم يتم اتخاذ قرارات.", weight: 1 },
          { label: "تم اتخاذ قرارات", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,

      },
      {
        label: "OBTAINED_CENTER_APPROVAL_FOR_DECISIONS",
        options: [
          { label: "لم يتم أخذ الموافقة.", weight: 0 },
          { label: "تم أخذ الموافقة.", weight: 1 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },

  Q8: {
    weight: 3,
    questions: [
      {
        label: "HAS_INTERNAL_AUDITOR_FOR_POLICIES",
        options: [
          { label: "لا يوجد.", weight: 0 },
          { label: " نعم ", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "AUDITOR_APPOINTED_BY_BOARD",
        options: [
          { label: "لم يتم تكليفه أو تعيينه من مجلس الإدارة.", weight: 0 },
          { label: "تم تكليفه أو تعيينه من مجلس الإدارة.", weight: 1 },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "HAS_INTERNAL_CONTROL_SYSTEM_FOR_SPENDING_AND_COMPLIANCE",
        options: [
          { label: "لا يوجد نظام رقابة.", weight: 0 },
          { label: " يوجد نظام رقابة.", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "INTERNAL_CONTROL_SYSTEM_APPROVED_BY_BOARD",
        options: [
          { label: "لم يتم اعتماده من مجلس الإدارة.", weight: 0 },
          { label: "تم اعتماده من مجلس الإدارة.", weight: 1 },
        ],
        isDependantOnPrev: true,

      },

      {
        label: "BOARD_OVERSEES_ASSEMBLY_AND_AUDITOR_DECISIONS",
        options: [
          { label: "لا يشرف على ذلك.", weight: 0 },
          { label: "يشرف على ذلك.", weight: 1 },
        ],
      },
    ],
  },
  Q9: {
    weight: 7.75,
    questions: [
      {
        label: "HAS_APPROVED_CONFLICT_OF_INTEREST_POLICY",
        options: [
          { label: "لا توجد سياسة.", weight: 0 },
          { label: " توجد بشكل متكامل. ", weight: 0.25 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_RELATED_PARTY_TRANSACTIONS_BETWEEN_MEMBERS",
        options: [
          { label: "يوجد توجد علاقة تعاقدية.", weight: 0 },
          { label: "لا توجد علاقة تعاقدية.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_APPROVED_WHISTLEBLOWER_PROTECTION_POLICY",
        options: [
          { label: "لا توجد سياسة.", weight: 0 },
          { label: "توجد بشكل متكامل.", weight: 0.2 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_APPROVED_DATA_PRIVACY_POLICY",
        options: [
          { label: "لا توجد سياسة.", weight: 0 },
          { label: "توجد بشكل متكامل.", weight: 0.2 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_APPROVED_DOCUMENT_RETENTION_POLICY",
        options: [
          { label: "لا توجد سياسة.", weight: 0 },
          { label: "توجد بشكل متكامل.", weight: 0.2 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_APPROVED_DONATION_POLICY",
        options: [
          { label: "لا توجد سياسة.", weight: 0 },
          { label: "توجد بشكل متكامل.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_APPROVED_BENEFICIARY_RELATIONS_POLICY",
        options: [
          { label: "لا توجد سياسة.", weight: 0 },
          { label: "توجد بشكل متكامل.", weight: 0.2 },
        ],
        isDependantOnPrev: false,
      },
      // {
      //   label: "HAS_APPROVED_BENEFICIARY_RELATIONS_POLICY",
      //   options: [
      //     { label: "لا توجد سياسة.", weight: 0 },
      //     { label: "توجد بشكل متكامل.", weight: 0.2 },
      //   ],
      //   isDependantOnPrev: false,
      // },
      {
        label: "BENEFICIARY_NEEDS_ASSESSED",
        options: [
          { label: "لم يتم دراسة احتياج المستفيدين.", weight: 0 },
          {
            label: " تمت دراسة احتياج المستفيدين.",
            weight: 0,
            moveToNext: true,
          },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "AID_DISTRIBUTED_FAIRLY_TO_BENEFICIARIES",
        options: [
          {
            label: "لم يتم توزيع التبرعات بشكل عادل ومنصف بين المستفيدين.",
            weight: 0,
          },
          { label: "نعم ", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "AID_MEETS_ACTUAL_BENEFICIARY_NEEDS",
        options: [
          {
            label: "لا تلبي التبرعات (الخدمات) احتياجات المستفيدين.",
            weight: 0,
          },
          { label: "نعم ", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: true,
      },

      {
        label: "AID_DISTRIBUTION_PROPERLY_DOCUMENTED",
        options: [
          { label: "لم يتم تسجيل وتوثيق توزيع التبرعات والخدمات.", weight: 0 },
          { label: "نعم ", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "HAS_PERIODIC_AID_DISTRIBUTION_REPORTS",
        options: [
          {
            label:
              "لا يوجد تقارير دورية تفيد بتسليم التبرعات (الخدمات) للمستفيدين.",
            weight: 0,
          },
          {
            label:
              "يوجد تقارير دورية تفيد بتسليم التبرعات (الخدمات) للمستفيدين. ",
            weight: 3,
          },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "HAS_APPROVED_VOLUNTEER_MANAGEMENT_POLICY",
        options: [
          { label: "لا توجد آلية.", weight: 0 },
          { label: "توجد بشكل متكامل.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_APPROVED_HR_POLICY",
        options: [
          { label: "لا توجد لائحة.", weight: 0 },
          { label: "نعم توجد لائحة معتمدة.  .", weight: 1 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q10: {
    weight: 3,
    questions: [
      {
        label: "HAS_APPROVED_BOARD_AUTHORITY_POLICY",
        options: [
          { label: "لا توجد .", weight: 0 },
          { label: "نعم. ", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_DETAILED_AUTHORITY_DELEGATION_LIST",
        options: [
          { label: "  لا توجد .", weight: 0 },
          { label: "لا توجد علاقة تعاقدية.", weight: 2 },
        ],
        isDependantOnPrev: true,
      },

     
    
    ],
  },

  Q11: {
    weight: 3,
    questions: [
      {
        label: "BOARD_MET_FOUR_TIMES_IN_PREVIOUS_YEAR",
        options: [
          { label: "لم يتم الاجتماع أبدًا.", weight: 0 },
          { label: "تم الاجتماع أقل من 4 مرات.", weight: 1 },
          { label: "تم الاجتماع 4 مرات أو أكثر.", weight: 2 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "BOARD_MEETINGS_HELD_QUARTERLY",
        options: [
          { label: "لم تكن بشكل منتظم.", weight: 0 },
          { label: "ُعقدت بشكل منتظم.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },
  Q12: {
    weight: 4,
    questions: [
      {
        label: "BOARD_MEMBER_WORKS_IN_MANAGEMENT",
        options: [
          { label: "لا يوجد.", weight: 1 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_CENTER_APPROVAL_1",
        options: [
          { label: "لا توجد موافقة.", weight: 0 },
          { label: "توجد موافقة.", weight: 1 },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "BOARD_MEMBER_WORKS_IN_SUPERVISORY_AUTHORITY",
        options: [
          { label: "لا يوجد.", weight: 1 },
          { label: "يوجد .", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_CENTER_APPROVAL_2",
        options: [
          { label: "لا يوجد.", weight: 0 },
          { label: "توجد موافقة.", weight: 1 },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "BOARD_MEMBER_EXCEEDED_TWO_CONSECUTIVE_TERMS",
        options: [
          { label: "لا يوجد.", weight: 1 },
          { label: "يوجد .", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_CENTER_APPROVAL_3",
        options: [
          { label: "لا يوجد.", weight: 0 },
          { label: "توجد موافقة.", weight: 1 },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "BOARD_MEMBER_FROM_JUDICIARY",
        options: [
          { label: "لا يوجد.", weight: 0 },
          { label: "يوجد .", weight: 1 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q13: {
    weight: 2,
    questions: [
      {
        label: "BOARD_MEMBERS_RECEIVED_ORIENTATION_PROGRAMS",
        options: [
          { label: "لم يتم تقديم أي برامج.", weight: 0 },
          { label: "يتم تقديم البرامج بشكل جزئي.", weight: 1 },
          { label: "يتم تقديم البرامج بشكل متكامل.", weight: 2 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q14: {
    weight: 6.5,
    questions: [
      {
        label: "BOARD_MET_FOUR_TIMES_IN_PREVIOUS_YEAR",
        options: [
          { label: "لا يوجد مدير تنفيذي.", weight: 0 },
          { label: "متفرغ كامل.", weight: 2 },
          { label: "متفرغ جزئي", weight: 1 },
          { label: "غير متفرغ", weight: 0.4 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "EXECUTIVE_DIRECTOR_APPOINTED_BY_BOARD",
        options: [
          { label: "لم يتم تعيينه بقرار من المجلس.", weight: 0 },
          { label: " تم تعيينه بقرار من المجلس.", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "EXECUTIVE_DIRECTOR_RESPONSIBILITIES_DEFINED_IN_APPOINTMENT",
        options: [
          {
            label: "لم يتم توضيح صلاحياته، ومسؤولياته، وحقوقه والتزاماته.",
            weight: 0,
          },
          {
            label: "تم توضيح صلاحياته، ومسؤولياته وحقوقه والتزاماته.",
            weight: 1,
          },
        ],
        isDependantOnPrev: true,
      },

      {
        label: "EXECUTIVE_DIRECTOR_APPOINTMENT_DETAILS_SENT_TO_CENTER",
        options: [
          { label: "لم يتم الإرسال.", weight: 0 },
          {
            label:
              "تم إرسال نسخة من قرار التعيين ومسوغات الراتب وصورة من هويته الوطنية وبيانات التواصل معه.",
            weight: 1,
          },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_SAUDI_ACCOUNTANT",
        options: [
          { label: "لا يوجد.", weight: 0 },
          { label: "يوجد محاسب سعودي الجنسية.", weight: 2 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "ACCOUNTANT_APPOINTMENT_DETAILS_SENT_TO_CENTER",
        options: [
          { label: "لم يتم الإرسال.", weight: 0 },
          {
            label:
              "تم إرسال نسخة من قرار التعيين ومسوغات الراتب وصورة من هويته الوطنية وبيانات التواصل معه.",
            weight: 0.5,
          },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q15: {
    weight: 2.5,
    questions: [
      {
        label: "BOARD_TERM_ENDING_OR_RECENTLY_ENDED",
        options: [
          { label: "لم تنتِه قريبًا وليست على وشك الانتهاء.", weight: 0.5 },
          { label: "نعم .", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "ELECTION_COMMITTEE_FORMED_IN_PREVIOUS_ASSEMBLY",
        options: [
          {
            label:
              "لم يتم تشكيل لجنة انتخابات في الاجتماع العمومي الذي يسبق اجتماع الترشيح.",
            weight: 0.5,
          },
          { label: "نعم .", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "ELECTION_COMMITTEE_HAS_TWO_NONCANDIDATE_MEMBERS",
        options: [
          { label: "الأعضاء ليسوا كذلك.", weight: 0 },
          {
            label:
              "الأعضاء اثنين كحد أدنى من أعضاء الجمعية العمومية وغير مرشحين لعضوية المجلس الجديد.",
            weight: 0.5,
          },
        ],
        isDependantOnPrev: true,
      },
      {
        label: "BOARD_INVITED_ELIGIBLE_CANDIDATES_WITHIN_TIMEFRAME",
        options: [
          { label: "لم يتم ذلك.", weight: 0 },
          { label: "تم الدعوة وفق ما هو محّدد.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "NOMINATIONS_CLOSED_AND_SUBMITTED_TO_CENTER_ON_TIME",
        options: [
          { label: "لم يتم ذلك.", weight: 0 },
          { label: "تم الإقفال ورفع الأسماء وفق ما هو محّدد.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "CANDIDATE_LIST_DISPLAYED_FIFTEEN_DAYS_BEFORE_TERM_END",
        options: [
          { label: "لم يتم عرض الأسماء.", weight: 0 },
          { label: "تم عرض الأسماء.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "NEW_BOARD_MEMBERS_SUBMITTED_TO_CENTER_WITHIN_FIFTEEN_DAYS",
        options: [
          { label: "لم يتم الرفع خلال الفترة المحّددة.", weight: 0 },
          { label: "تم الرفع خلال الفترة المحّددة.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q16: {
    weight: 3,
    questions: [
      {
        label: "HAS_LOCAL_BRANCHES_AND_OFFICES",
        options: [
          { label: "لا يوجد فروع.", weight: 3 },
          { label: "نعم .", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "BRANCHES_APPROVED_BY_CENTER_AND_SUPERVISOR",
        options: [
          { label: "لا توجد موافقة.", weight: 3 },
          { label: "توجد موافقة من المركز والجهة المشرفة.", weight: 3 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },

  Q17: {
    weight: 6.5,
    questions: [
      {
        label: "HAS_CERTIFIED_EXTERNAL_AUDITOR",
        options: [
          { label: "لا يوجد تعاقد", weight: 0 },
          { label: "يوجد تعاقد بشكل كامل", weight: 2 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_DETAILED_ANNUAL_FINANCIAL_REPORT_APPROVED",
        options: [
          { label: "لا يوجد تقرير مالي سنوي.", weight: 0 },
          { label: "يوجد تقرير مالي سنوي بشكل متكامل.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "FINANCIAL_REPORT_SUBMITTED_TO_CENTER_WITHIN_FOUR_MONTHS",
        options: [
          { label: "لم يتم رفعه للمركز.", weight: 0 },
          { label: "تم رفعه لكن بعد الأربعة أشهر.", weight: 0.25 },
          { label: "تم رفعه خلال الأربعة أشهر.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },
      
    ],
  },

  Q18: {
    weight: 1,
    questions: [
      {
        label: "TERRORISM_FINANCING_RISKS_IDENTIFIED_AND_UNDERSTOOD",
        options: [
          {
            label:
              "لم يتم تحديد وفهم مخاطر جرائم الإرهاب وتمويله وتقييمها وتوثيقها.",
            weight: 0,
          },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "RISK_ASSESSMENT_DECISIONS_AND_RECOMMENDATIONS_IMPLEMENTED",
        options: [
          { label: "لم يتم ذلك.", weight: 0 },
          { label: "تم بشكل جزئي.", weight: 0.5 },
          { label: "تم بشكل متكامل.", weight: 1 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },

  Q19: {
    weight: 1,
    questions: [
      {
        label: "USES_CASH_TRANSACTIONS_FOR_DONATIONS",
        options: [
          { label: "لا تستخدم وسيلة التعاملات النقدية.", weight: 0 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "COMPLIES_WITH_DONATION_HANDLING_REGULATIONS",
        options: [
          { label: "لا تلتزم في الإجراء.", weight: 0 },
          { label: "تلتزم الجمعية في الإجراءات.", weight: 3 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },

  Q20: {
    weight: 2,
    questions: [
      {
        label: "HAS_MONEY_LAUNDERING_SUSPICION_PROCEDURES",
        options: [
          { label: "لا توجد إجراءات واضحة.", weight: 0 },
          { label: "توجد إجراءات واضحة.", weight: 2 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q21: {
    weight: 2,
    questions: [
      {
        label: "HAS_TERRORISM_FINANCING_AWARENESS_PROGRAMS",
        options: [
          { label: "لا توجد برامج توعوية للعاملين في الجمعية.", weight: 0 },
          { label: "توجد برامج بشكل متكامل.", weight: 2 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q22: {
    weight: 4,
    questions: [
      {
        label: "REGISTRATION_CERTIFICATE_VALID",
        options: [
          { label: "شهادة التسجيل منتهية.", weight: 0 },
          { label: "شهادة التسجيل سارية.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "ACTIVITIES_MATCH_CLASSIFICATION",
        options: [
          { label: "الأنشطة غير متطابقة.", weight: 0 },
          { label: "الأنشطة متطابقة", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "PROGRAM_ACTIVITIES_APPROVED_BY_SUPERVISORY_UNIT",
        options: [
          { label: "لم يتم الموافقة", weight: 0 },
          { label: "تمت الموافقة", weight: 1 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "HAS_UNAUTHORIZED_ACTIVITIES_OUTSIDE_BYLAWS",
        options: [
          { label: "لا يوجد تعارض.", weight: 0.5 },

          { label: "يوجد تعارض بشكل متكامل.", weight: 0 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_SERVICE_DELIVERY_TRACKING_DOCUMENTATION",
        options: [
          { label: "لا يوجد توثيق.", weight: 0 },

          { label: "يوجد توثيق بشكل متكامل.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_ACTIVITIES_OUTSIDE_ADMINISTRATIVE_SCOPE",
        options: [
          { label: "لا توجد.", weight: 0.5 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_CENTER_APPROVAL_4",
        options: [
          { label: "لا توجد موافقة.", weight: 0 },
          { label: "توجد موافقة.", weight: 0.5 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },
  Q23: {
    weight: 0.5,
    questions: [
      {
        label: "HAS_INTERNATIONAL_PARTNERSHIPS_OR_AGREEMENTS",
        options: [
          { label: "لا توجد.", weight: 0.5 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_APPROVAL_FOR_INTERNATIONAL_AGREEMENTS",
        options: [
          { label: "لا توجد موافقة من المركز والجهة المختصة.", weight: 0 },
          { label: "نعم توجد موافقة من المركز والجهة المختصة.", weight: 0.5 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },
  Q24: {
    weight: 5,
    questions: [
      {
        label: "CONDUCTS_FUNDRAISING_CAMPAIGNS",
        options: [
          { label: "لا يتم جمع التبرعات.", weight: 0 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_FUNDRAISING_APPROVAL_FROM_CENTER",
        options: [
          { label: "لا توجد موافقة من المركز.", weight: 0 },
          { label: "توجد موافقة من المركز.", weight: 1 },
        ],
        isDependantOnPrev: true,
      },

      {
        label: "HAS_SEPARATE_DONATIONS_ACCOUNT",
        options: [
          { label: "لا يوجد حساب مستقل", weight: 0 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_DONATIONS_REGISTRY",
        options: [
          { label: "لا يوجد سجل خاص بالتبرعات", weight: 0 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: true,
      },

      {
        label: "DONATION_REGISTRY_INCLUDES_REQUIRED_DETAILS",
        options: [
          { label: "لا يحتوي السجل بشكل متكامل على المعلومات", weight: 0 },
          { label: "يحتوي السجل بشكل متكامل على المعلومات", weight: 3 },
        ],
        isDependantOnPrev: true,
      },

      {
        label: "DONATIONS_USED_FOR_UNINTENDED_PURPOSE",
        options: [
          { label: "لم يتم استخدامها في ذلك.", weight: 0.5 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_CENTER_APPROVAL_FOR_DONATION_REPURPOSE",
        options: [
          { label: "لا توجد موافقة من المركز.", weight: 0 },
          { label: " توجد موافقة من المركز.", weight: 0.5 },
        ],
        isDependantOnPrev: true,
      },

   

      {
        label: "SURPLUS_INVESTED_IN_ENDOWMENTS_OR_PROJECTS",
        options: [
          { label: "لم يتم ذلك.", weight: 0.5 },
          { label: " نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "SURPLUS_INVESTMENT_APPROVED_BY_ASSEMBLY",
        options: [
          { label: "لم يتم أخذ موافقة الجمعية العمومية.", weight: 0 },
          { label: "تم أخذ موافقة الجمعية العمومية.", weight: 0.5 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },

  Q25: {
    weight: 0.5,
    questions: [
      {
        label: "RECEIVED_UNSOLICITED_FOREIGN_AID",
        options: [
          { label: "لم يتم تلقي أي إعانات من خارج المملكة.", weight: 0.5 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "NOTIFIED_CENTER_OF_FOREIGN_AID",
        options: [
          { label: "لم يتم إبلاغ المركز.", weight: 0 },
          { label: "تم إبلاغ المركز.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q26: {
    weight: 2,
    questions: [
      {
        label: "HAS_PROPERTY_OR_INVESTMENTS",
        options: [
          { label: "لا توجد.", weight: 2 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "PROPERTY_ACQUISITION_PROPERLY_APPROVED",
        options: [
          { label: "لا توجد موافقة.", weight: 0 },
          { label: "توجد موافقة من الجمعية العمومية.", weight: 2 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },

  Q27: {
    weight: 0.5,
    questions: [
      {
        label: "PROPERTY_ACQUISITION_PROPERLY_APPROVED",
        options: [
          { label: "لا يتم الاحتفاظ بها.", weight: 0 },
          { label: "يتم الاحتفاظ بها بشكل جزئي.", weight: 0.25 },
          { label: "يتم الاحتفاظ بها بشكل متكامل.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q28: {
    weight: 1.25,
    questions: [
      {
        label: "HAS_UPDATED_ASSEMBLY_MEETINGS_REGISTRY",
        options: [
          { label: "لا يوجد سجل للجمعية العمومية.", weight: 0 },
          { label: "يوجد سجل للجمعية العمومية.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "BOARD_MEETING_RECORDS_MAINTAINED",
        options: [
          { label: "لا ُتحفظ السجلات المتعّلقة بمجلس الإدارة.", weight: 0 },
          { label: "تحفظ السجلات المتعّلقة بمجلس الإدارة.", weight: 0.25 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q29: {
    weight: 1,
    questions: [
      {
        label: "MEMBERS_HAVE_MEMBERSHIP_CARDS",
        options: [
          { label: "لا توجد بطاقات عضوية.", weight: 0 },
          { label: "توجد ولكن بشكل جزئي.", weight: 0.25 },
          { label: "توجد بشكل متكامل.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "ALL_MEMBERS_RECEIVED_MEMBERSHIP_CARDS",
        options: [
          { label: "لم يستلم جميع الأعضاء بطاقات عضوية.", weight: 0 },
          { label: "استلم جميع الأعضاء بطاقات العضوية.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },

  Q30: {
    weight: 4,
    questions: [
      {
        label: "HAS_PERMANENT_OR_TEMPORARY_COMMITTEES_WITH_SPECIFIC_TASKS",
        options: [
          { label: "لا توجد.", weight: 0 },
          { label: " نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "COMMITTEES_FORMATION_DECISIONS_EXIST",
        options: [
          { label: "لا توجد قرارات بتكوين هذه اللجان.", weight: 0 },
          { label: "توجد قرارات لكن بشكل جزئي", weight: 0.5 },
          { label: "توجد قرارات بشكل متكامل.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "COMMITTEE_DECISIONS_INCLUDE_COMPLETE_DETAILS",
        options: [
          { label: "لم تشتمل القرارات على ما هو محّدد.", weight: 0 },
          { label: "اشتملت القرارات على ما هو محّدد بشكل جزئي.", weight: 0.5 },
          { label: "اشتملت القرارات على ما هو محّدد بشكل متكامل.", weight: 1 },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "BOARD_MEMBERS_PRESENT_IN_COMMITTEES",
        options: [
          { label: "لا يوجد.", weight: 0 },
          { label: "يوجد.", weight: 0.5 },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "HAS_EXECUTIVE_COMMITTEE",
        options: [
          { label: "لا توجد لجنة تنفيذية.", weight: 0 },
          { label: " نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },

      {
        label: "EXECUTIVE_COMMITTEE_FORMED_WITH_DEFINED_AUTHORITIES",
        options: [
          { label: "لا يوجد قرار بتشكيلها.", weight: 0 },
          { label: "يوجد قرار بتشكيلها.", weight: 0.5 },
        ],
        isDependantOnPrev: true,
      },

      {
        label: "HAS_INTERNAL_AUDIT_COMMITTEE",
        options: [
          { label: "لا توجد.", weight: 1 },
          { label: " نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "FINANCIAL_SUPERVISOR_CHAIRS_AUDIT_COMMITTEE",
        options: [
          { label: "لا يرأس المشرف المالي اللجنة.", weight: 1 },
          { label: "يرأس المشرف المالي اللجنة.", weight: 0 },
        ],
        isDependantOnPrev: false,
      },
    ],
  },
};
