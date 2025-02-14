const COMPLIANCE_ADHERENCE_PRACTICES_QUESTIONS = {
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
            weight: 1,
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
          { label: "لم يتم التعديل عليها.", weight: 1 },
          { label: " تم التعديل عليها.", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "FOLLOWED_BYLAWS_MODIFICATION_PROCEDURES",
        options: [
          { label: "لم يتم اتباع الإجراءات.", weight: 0 },
          { label: " تم اتباع الإجراءات بشكل متكامل.  .", weight: 1 },
        ],
        isDependantOnPrev: true,
      },
    ],
  },
  Q4: {
    weight: 2,
    questions: [
      {
        label: "MEMBERSHIP_OPEN_TO_PUBLIC",
        options: [
          { label: "لا٫ باب العضوية مقفل.", weight: 0 },
          { label: "نعم", weight: 0, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
    ],
  },
  Q5: {
    weight: 3,
    questions: [
      {
        label: "HAS_UPDATED_MEMBERS_REGISTRY",
        options: [
          { label: "لا يوجد.", weight: 0.5 },
          { label: "يوجد سجل بشكل جزئي.", weight: 0.5 },
          { label: "يوجد سجل متكامل ومُحدث.", weight: 1 },
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
          { label: "لم يتم انتخاب مجلساً أو عضواً جديداً.", weight: 1 },
          { label: "نعم تم الانتخاب", weight: 0.5, moveToNext: true },
        ],
        isDependantOnPrev: false,
      },
      {
        label: "PREVIOUS_BOARD_CLEARED_IN_FIRST_MEETING_AFTER_CHANGE",
        options: [
          { label: "لم يتم إبراء الذمة.", weight: 1 },
          { label: "تم إبراء الذمة. ", weight: 0.5 },
        ],
        isDependantOnPrev: false,
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
        label: "GENERAL_ASSEMBLY_REVIEWED_AUDITOR_REPORT",
        options: [
          { label: "لم يتم مناقشة التقرير.", weight: 0 },
          { label: "تمت المناقشة من غير الاعتماد.", weight: 1 },
          { label: "تمت المناقشة والاعتماد.", weight: 2 },
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
        label: "GENERAL_ASSEMBLY_DISCUSSED_NEW_YEAR_PLAN",
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
        isDependantOnPrev: false,
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
      {
        label: "HAS_APPROVED_BENEFICIARY_RELATIONS_POLICY",
        options: [
          { label: "لا توجد سياسة.", weight: 0 },
          { label: "توجد بشكل متكامل.", weight: 0.2 },
        ],
        isDependantOnPrev: false,
      },
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
        label: "BOARD_MET_FOUR_TIMES_IN_PREVIOUS_YEAR",
        options: [
          { label: "لم يتم الاجتماع أبدًا.", weight: 0 },
          { label: "تم الاجتماع أقل من 4 مرات.", weight: 1 },
          { label: "تم الاجتماع 4 مرات أو أكثر.", weight: 2 },
        ],
        isDependantOnPrev: false,
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
          { label:  "لا يوجد.", weight: 1 },
          { label: "نعم", weight: 0,moveToNext: true},
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
           { label: "يوجد .", weight: 0 ,moveToNext: true},
 
         ],
         isDependantOnPrev: false,
       },

       {
         label: "HAS_CENTER_APPROVAL_2",
         options: [
           { label: "لا يوجد.", weight: 0 },
           { label: "توجد موافقة.", weight: 1},
 
         ],
         isDependantOnPrev: true,
       },
       {
         label: "BOARD_MEMBER_EXCEEDED_TWO_CONSECUTIVE_TERMS",
         options: [
           { label: "لا يوجد.", weight: 1 },
           { label: "يوجد .", weight: 0 ,moveToNext: true},
 
         ],
         isDependantOnPrev: false,
       },
       {
         label: "HAS_CENTER_APPROVAL_3",
         options: [
           { label: "لا يوجد.", weight: 0 },
           { label: "توجد موافقة.", weight: 1},
 
         ],
         isDependantOnPrev: true,
       },
       {
         label: "BOARD_MEMBER_FROM_JUDICIARY",
         options: [
           { label: "لا يوجد.", weight: 0 },
           { label: "يوجد .", weight: 1},
 
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
         { label: "يتم تقديم البرامج بشكل متكامل.", weight: 2},

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
        { label: " تم تعيينه بقرار من المجلس.", weight: 0,moveToNext: true },
      ],
      isDependantOnPrev: false,
    },

    {
      label: "EXECUTIVE_DIRECTOR_RESPONSIBILITIES_DEFINED_IN_APPOINTMENT",
      options: [
        { label: "لم يتم توضيح صلاحياته، ومسؤولياته، وحقوقه والتزاماته.", weight: 0 },
        { label: "تم توضيح صلاحياته، ومسؤولياته وحقوقه والتزاماته.", weight: 1 },
      ],
      isDependantOnPrev: false,
    },

    {
      label: "EXECUTIVE_DIRECTOR_APPOINTMENT_DETAILS_SENT_TO_CENTER",
      options: [
        { label: "لم يتم الإرسال.", weight: 0 },
        { label: "تم إرسال نسخة من قرار التعيين ومسوغات الراتب وصورة من هويته الوطنية وبيانات التواصل معه.", weight: 1 },
      ],
      isDependantOnPrev: false,
    },
    {
      label: "HAS_SAUDI_ACCOUNTANT",
      options: [
        { label: "لا يوجد.", weight: 0 },
        { label: "يوجد محاسب سعودي الجنسية.", weight: 2},
      ],
      isDependantOnPrev: false,
    },

    {
      label: "ACCOUNTANT_APPOINTMENT_DETAILS_SENT_TO_CENTER",
      options: [
        { label: "لم يتم الإرسال.", weight: 0 },
        { label: "تم إرسال نسخة من قرار التعيين ومسوغات الراتب وصورة من هويته الوطنية وبيانات التواصل معه.", weight: 0.5},
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
         { label: "نعم .", weight: 0 ,moveToNext: true},


       ],
       isDependantOnPrev: false,
     },

     {
      label: "ELECTION_COMMITTEE_FORMED_IN_PREVIOUS_ASSEMBLY",
      options: [
        { label: "لم يتم تشكيل لجنة انتخابات في الاجتماع العمومي الذي يسبق اجتماع الترشيح.", weight: 0.5 },
        { label: "نعم .", weight: 0 ,moveToNext: true},


      ],
      isDependantOnPrev: true,
    },
    {
      label: "ELECTION_COMMITTEE_HAS_TWO_NONCANDIDATE_MEMBERS",
      options: [
        { label: "الأعضاء ليسوا كذلك.", weight: 0 },
        { label: "الأعضاء اثنين كحد أدنى من أعضاء الجمعية العمومية وغير مرشحين لعضوية المجلس الجديد.", weight: 0.5},


      ],
      isDependantOnPrev: true,
    },
    {
      label: "BOARD_INVITED_ELIGIBLE_CANDIDATES_WITHIN_TIMEFRAME",
      options: [
        { label: "لم يتم ذلك.", weight: 0 },
        { label: "تم الدعوة وفق ما هو محّدد.", weight: 0.5},


      ],
      isDependantOnPrev: false,
    },
    {
      label: "NOMINATIONS_CLOSED_AND_SUBMITTED_TO_CENTER_ON_TIME",
      options: [
        { label: "لم يتم ذلك.", weight: 0 },
        { label: "تم الإقفال ورفع الأسماء وفق ما هو محّدد.", weight: 0.5},


      ],
      isDependantOnPrev: false,
    },


    {
      label: "CANDIDATE_LIST_DISPLAYED_FIFTEEN_DAYS_BEFORE_TERM_END",
      options: [
        { label: "لم يتم عرض الأسماء.", weight: 0 },
        { label: "تم عرض الأسماء.", weight: 0.5},


      ],
      isDependantOnPrev: false,
    },
    {
      label: "NEW_BOARD_MEMBERS_SUBMITTED_TO_CENTER_WITHIN_FIFTEEN_DAYS",
      options: [
        { label: "لم يتم الرفع خلال الفترة المحّددة.", weight: 0 },
        { label: "تم الرفع خلال الفترة المحّددة.", weight: 0.5},


      ],
      isDependantOnPrev: false,
    },

    

   
   
   
   ]}
};
