const dashboardStatusMap = {
  NOT_STARTED: "لم يتم البدء",
  IN_PROGRESS: "قيد التنفيذ",
  COMPLETED: "مكتمل",
};

const tabsNames = {
  FINANCIAL: "مؤشر الأداء المالي",
  OPERATIONAL: "مؤشر الأداء التشغيلي",
  CORPORATE: "مؤشر الأداء المؤسسي",
  GENERAL: "اللوحة العامة",
};

const GOVERANCE_TABS= {
  COMPLIANCE_ADHERENCE_PRACTICES:"معيار الامتثال و الالتزام",
  TRANSPARENCY_DISCLOSURE_PRACTICES:"معيار الشفافية و الإفصاح",
  FINANCIAL_SAFETY_PRACTICES:"معيار السلامة المالية"

}

const entriesLabels = {
  FINANCIAL: {
    TRADED_INVESTMENTS: "الاستثمارات المتداولة",
    UNTRADED_INVESTMENTS: "الاستثمارات الغير المتداولة",
    AWQAF_INVESTMENTS: "الاستثمارات الوقفية",
    AWQAF_FIXED_ASSETS: "الأصول الثابتة الوقفية",
    CASHE_RELATED: "النقدية وما في حكمها",
    CURRENT_LIABILITIES: "الالتزامات المتداولة",
    LIMITED_NET_ASSETS: "صافي أصول المقيدة",
    AWQAF_NET_ASSETS: "صافي أصول الأوقاف النقدية",
    GENERAL_ADMINSTRATIVE_EXPENSES: "المصاريف الإدارية والعمومية",
    GOVERENCE_EXPENSES: "مصاريف الحوكمة",
    PROGRAMS_EXPENSES: "مصاريف البرامج والأنشطة المباشرة",
    ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY: "المصاريف الإدارية المحملة على النشاط",
    AWQAF_DIST_EXPENSES: "مصاريف وتوزيعات عوائد الأوقاف",
    INVESTMENT_EXPENSES: "مصاريف الاستثمارات",
    FUND_RAISING_EXPENSES: "مصاريف جمع الأموال",
    UNRESTRICTED_REVENUE: "الإيرادات الغير مقيدة",
    RESTRICTED_REVENUE: "الإيرادات المقيدة",
    AWQAF_QUARTER_REVENUE: "ريع الأوقاف",
    PROFIT_AWQAF_INVESTMENTS: "أرباح الاستثمارات الوقفية",
    ZAKAT: "الزكاة",
    RESTRICTED_CASH_DONATIONS: "التبرعات النقدية المقيدة",
    RESTRICTED_IN_KIND_DONATIONS: "التبرعات العينية المقيدة",
    RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: "التبرعات بخدمات تطوعية مقيدة",
    GOVERNMENT_GRANT_DONATIONS: "تبرعات منح حكومية",
    UNRESTRICTED_CASH_DONATIONS: "تبرعات نقدية غير مقيدة",
    UNRESTRICTED_IN_KIND_DONATIONS: "تبرعات عينية غير مقيدة",
    UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: "تبرعات بخدمات تطوعية غير مقيدة",
    DONATION_BY_LIABILITY_REDUCTION: "تبرعات بتخفيض التزام",
    TOTAL_TAX_REFUND: "إجمالي المبالغ المستردة من الضريبة",
    PROGRAM_AND_ACTIVITY_REVENUES: "عوائد البرامج والأنشطة",
    RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES: "رسوم برامج وانشطة مخصصة مقيدة",
    GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL: "اجمالي اشتراكات اعضاء الجمعية العمومية",
    TOTAL_EXPENSES: "إجمالي المصاريف",
    TOTAL_SUSTAINABILITY_ASSETS: "اجمالي أصول الاستدامة",
    TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH: "اجمالي صافي الأصول المقيدة ونقدية الاوقاف",
    TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES: "اجمالي المصاريف الإدارة والعمومية والحوكمة",
    ECONOMIC_RETURN_OF_VOLUNTEERING: "العائد الاقتصادي للتطوع",
    TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES: "اجمالي مصاريف البرامج والأنشطة",
    TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES: "اجمالي مصاريف الاستدامة المالية",
    TOTAL_SUSTAINABILITY_RETURNS: "اجمالي عوائد الاستدامة",
    TOTAL_DONATIONS: "اجمالي التبرعات",
          ACTUAL_RETURNS:"العوائد الفعلية",
      EXPECTED_RETURNS:"العوائد المتوقعة",
    IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES:"قيم ونسب هامة تدعم الموارد المالية",
  },
  CORPORATE: {
    TOTAL_ASSIGNED_TASKS_DURING_PERIOD:"اجمالي المهام المسندة خلال الفترة",
    TOTAL_COMPLETED_TASKS_DURING_PERIOD:"عدد المهام المنجزة خلال الفترة",
    TOTAL_WORKING_DAYS:"اجمالي أيام العمل",
    TOTAL_EMPLOYEE_ATTENDANCE_DAYS:"اجمالي أيام الحضور للموظفين",
    TOTAL_FORMS_GRADES:"مجموع درجات عدد الاستبيانات",
    TOTAL_GRADES_VOL_SATIS:"مجموع درجات رضا المتطوعين",
    TOTAL_GRADES_DONAT_STATIS:"مجموع درجات رضا المتبرعين والداعمين",
    TOTAL_DECISIONS_BY_CEO:"اجمالي القرارات من المدير التنفيذي",
    TOTAL_EXECUTED_DECISIONS:"عدد القرارات المنفذة",
    TOTAL_PLANNED_PROGRAMS:"اجمالي البرامج المخطط لها خلال الفترة",
    TOTAL_ACHIEVED_PROGRAMS:"عدد البرامج المحققة خلال الفترة",
    EMP_PERF_EVALUATION_AVG:"نسبة متوسط تقيم اداء الموظفين خلال الفترة",
    BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE:"نسبة تقيم مجلس الإدارة",
    DIRECT_MANAGER_EVALUATION:"تقييم المدير المباشر",
    EMP_TRAINING_INDICATOR:"مؤشر تدريب الموظفين",
    NO_RESPONSES_DONAT_SATIS_FORM:"عدد المتبرعين والداعمين للاستبيان",
    COMPLIANCE_ADHERENCE_PRACTICES: "معيار الامتثال و الالتزام",
    TRANSPARENCY_DISCLOSURE_PRACTICES: "معيار الشفافية و الإفصاح",
    FINANCIAL_SAFETY_PRACTICES: "معيار السلامة المالية",
    NO_SUCCESSFUL_HIRES_POST_EXP:
      "عدد التعيينات الناجحة التي تجاوزت فترة التجربة",
    TOTAL_HIRES: "إجمالي التعيينات",
    PERC_COMMIT_WORK_HOURS: "نسبة الالتزام بالدوام الرسمي",
    NO_EXE_PRACTICES: "عدد التدريبات المنفذة",
    NO_PLANNED_PRACTICES: "عدد التدريبات المخططة",
    NO_COMP_ELEMENTS: "عدد العناصر المكتملة في الخطة",
    TOTAL_ELEMENTS: "إجمالي العناصر",
    NO_TIMELY_REPORTS: "عدد التقارير المنجزة في موعدها",
    NO_REQUIRED_REPORTS: "عدد التقارير المطلوبة",
    NO_GRADES_BENEFITS_SATISF: "مجموع درجات الرضا المستفيدين",
    NO_RESPONSES_SATIS_FORM: "عدد المستجيبين من استبيان رضا المستفيدين",
    TOTAL_GRADES_EMP_SATIS: "مجموع درجات رضا الموظفين",
    NO_RESPONSES_EMP_SATIS: "عدد المستجيبين من استبيان رضا الموظفين",
    TOTAL_GEADES_PARTENERS_SATIS: "مجموع درجات رضا الشركاء والموردين",
    NO_RESPONSES_PARTERS_FORM: "عدد المستجيبين من استبيان الشركاء والموردين",
    TOTAL_RESPONSES_VOL_SATIS: "مجموع درجات رضا المتطوعين",
    TOTAL_GRADES_VOL_STATIS: "مجموع درجات رضا المتطوعين",
    TOTAL_GRADES_DON_STATIS: "مجموع درجات رضا المتبرعين",
    NO_RESPOSES_VOL_SATIS_FORM: "عدد المستجيبين من استبيان رضا المتطوعين",
    NO_RESPONSES_VOL_SATIS_FORM: "عدد المستجيبين من استبيان رضا المتطوعين",
    NO_RESPONSES_DON_SATIS_FORM: "عدد المستجيبين من استبيان رضا المتبرعين",
    TOTAL_SATIS_GRADES_ORG: "مجموع درجات الرضا الجمعية العمومية ومجلس الإدارة",
    NO_ORG_MEMBERS: "العدد الكلي للأعضاء الجمعية العمومية ومجلس الإدارة",
    TOTAL_GRADES_COM: "مجموع درجات رضا المجتمع",
    NO_RESPONSES_COM_SATIS: "عدد المستجيبين من استبيان رضا المجتمع",
    TASKS_ACHIEVED_TIMELY_CEO: "المهام المنجزة في وقتها للمدير التنفيذي",
    TOTAL_PLANNED_TASKS_CEO: "إجمالي المهام المخططة للمدير التنفيذي",
    AVG_EVAL_EMPS: "متوسط تقييم أداء جميع الموظفين",
    AVG_RES_SATIS_FORMS_EMP:
      "متوسط نتائج استبيانات الرضا الموظفين، الشركاء، أصحاب المصلحة",
    EMP_EVAL: "تقييم كل موظف",
    EMP_ACHIEVMENT_PERC: "نسبه إنجاز كل موظف",
    NO_EXEC_DESC: "عدد القرارات المنفذة",
    TOTAL_DESC: "إجمالي القرارات",
    NO_ACHIV_TARGETS: "عدد الأهداف المحققة",
    TOTAL_TARGETS: "إجمالي الأهداف",
  },
  OPERATIONAL: {
    NO_PROGRAMS_EXECUTED:"عدد البرامج المنفذة",
    NO_PROGRAMS_PLANNED:"إجمالي البرامج المخططة",
    APPROVED_BUDGET:"الميزانية الربعية المعتمدة",
    TOTAL_PERIOD_EXPENSES:"المصروفات الفعلية",
    NO_ACTUAL_BENEFICIARIES:"عدد المستفيدين الفعلي",
    PLANNED_TARGET_NUMBER:"العدد المستهدف في الخطة",
    NO_PROGRAMS_WITH_PARTICIPANTS:"عدد المشاريع والبرامج التي شارك فيها متطوعون",
    NO_PROGRAMS_PROJECTS:"إجمالي عدد المشاريع والبرامج",
    NO_VOLUNTEERS_CURRENT_QUARTER:"عدد المتطوعين في الربع الحالي",
    NO_VOLUNTEERS_NEXT_QUARTER:"عدد المتطوعين في الربع السابق",
    NO_VOLUNTEERS_CONT_3:"عدد المتطوعين المستمرين لأكثر من 3 أشهر",
    TOTAL_VOLUNTEERS:"إجمالي عدد المتطوعين",
    DISBURSED_AMOUNTS_QUARTERLY:"المبالغ المصروفة (ربعية)",
    ACTIVITY_EXPENSES:"مصاريف الأنشطة",
    ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES:"مصاريف إدارية محملة على الأنشطة",
    SERVICE_EXPENSES:"مصاريف خدمات",
    SALARY_EXPENSES:"مصاريف الرواتب",
    MISCELLANEOUS_EXPENSES:" نثرية",
    MARKETING_EXPENSES:"مصاريف التسويق",
    OTHER_EXPENSES:"مصاريف أخرى",
    APPROVED_AMOUNTS_QUARTERLY:"المبالغ المعتمدة (ربعية)"	,
    APPROVED_ACTIVITY_EXPENSES:"مصاريف الأنشطة المعتمدة",
    APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES:"مصاريف إدارية محملة على الأنشطة معتمدة",
    APPROVED_SERVICE_EXPENSES:"مصاريف خدمات معتمدة",
    APPROVED_SALARY_EXPENSES:"مصاريف رواتب معتمدة",
    APPROVED_MISCELLANEOUS_EXPENSES:"مصاريف نثرية معتمدة",
    APPROVED_MARKETING_EXPENSES:"مصاريف تسويق معتمدة",
    APPROVED_OTHER_EXPENSES:"مصاريف أخرى معتمدة",


// old
    NO_OPERATIONAL_GOALS_ACHIEVED: "عدد الأهداف التشغيلية المحققة",
    NO_OPERATIONAL_GOALS_PLANNED: "إجمالي الأهداف التشغيلية المخططة",
    NO_TIMELY_ACTIVITIES: "عدد الأنشطة المنفذة في وقتها",
    TOTAL_PLANNED_ACTIVITIES: "إجمالي الأنشطة المخططة",
    PLANNED_ACTUAL_DIFF: "الفرق بين المخطط والفعلي",
    NO_OUTPUTS_ACHIEVED: "عدد المخرجات المحققة بالمواصفات المطلوبة",
    TOTAL_TARGETED_OUTPUTS: "إجمالي المخرجات المستهدفة",
    NO_TIMELY_TRANSACTIONS: "عدد المعاملات المنجزة خلال الوقت المحدد",
    TOTAL_TRANSACTIONS: "إجمالي المعاملات",
    NO_ARCHIVED_DOCS: "عدد الوثائق المؤرشفة حسب النظام",
    TOTAL_DOCS: "إجمالي الوثائق",
  },
  GENERAL: {
    NO_ADOPTED_ORPHANS: "عدد الأيتام المكفولين ",
    TOTAL_TARGETED_ORPHANS: "إجمالي الأيتام المستهدفين",
    TOTAL_MONTHLY_ADOP_EXP: "إجمالي تكاليف الكفالات الشهرية ",
    NO_ORPHANS_PRGM: "عدد الأيتام المشاركين في البرامج التأهيلية ",
    TOTAL_ORPHANS_QUAL_PRGM: "إجمالي الأيتام المؤهلين للبرامج التأهيلية",
    TOTAL_ANNUAL_EXP_ORPHANS: "إجمالي تكاليف الخدمات السنوية",
    NO_BENF_ORPHANS: "عدد الأيتام المستفيدين من الخدمات",
    NO_STD_ORPHANS: "عدد الأيتام الملتحقين بالتعليم العام ",
    TOTAL_ORPHANS_STD_AGE: "إجمالي الأيتام في سن التعليم العام",
    NO_ORPHANS_STD_UNI: "عدد الأيتام الملتحقين بالتعليم الجامعي ",
    TOTAL_ORPHANS_AGE_UNI: "إجمالي الأيتام في سن التعليم الجامعي",
    TOTAL_MARKS_ORPHANS: "مجموع المعدلات الدراسية لجميع الأيتام ",
    NO_GEN_EDU_ORPHANS: "عدد الأيتام الملتحقين بالتعليم",
    NO_HLTH_ORPHANS: "عدد الأيتام المشمولين بالتأمين الصحي ",
    TOTAL_ORPHANS: "إجمالي الأيتام",
    NO_EXEC_CONST_REQS: "عدد طلبات الصيانة المنفذة ",
    TOTAL_CONST_REQS: "إجمالي طلبات الصيانة المستلمة",
    NO_MOSQUES_ND_CONST: "عدد المساجد المحتاجة للترميم ",
    TOTAL_REG_MOSQUES: "إجمالي المساجد المسجلة",
    NO_MOSQUES_COMP_CONST: "عدد المساجد المكتملة البناء ",
    TOTAL_MOSQUES_PLAN_CONST: "إجمالي المساجد المخطط بناؤها",
    TOTAL_ANNUAL_EXPANSES_MOSQUES: "إجمالي تكاليف الصيانة السنوية ",
    NO_SERV_MOSQUES: "عدد المساجد المخدومة",
    NO_RESV_COMPL_MOSQUES: "عدد الشكاوى المستلمة ",
    NO_EXEC_PRJKS_MOSQUES: "عدد المشاريع المنفذة    ",
  },
};

const indicatorsLabels = {
  FINANCIAL: {
ABL_COVER_OBLIG: "قدرة الجمعية على تغطية التزاماتها المستقبلية",	
ADMIN_EXPENSES: "المصاريف الإدارية والعمومية",	
ADMIN_TO_TOTAL_EXPENSES: "التكلفة الإدارية من إ.المصاريف"	,
CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF: "النقد وما في حكمه الى صافي الأصول والالتزامات",	
DONAT_MONEY_RAISING: "جمع الأموال والتبرعات",
FINANCIAL_SUSTAIN: "الاستدامة المالية (اوقاف واستثمارات)",	
FUND_RAISING_TO_TOTAL_DONAT: "نسبة مصاريف جمع الأموال الى اجمالي التبرعات"	,
FUND_RAISING_TO_TOTAL_EXPENSES: "نسبة مصاريف جمع الأموال الى اجمالي المصاريف"	,
NET_CACHE_INVEST_ADMIN_EXPENSES: "نسبة صافي النقد والاستثمارات المتداولة الى المصاريف الإدارية التقديرية",	
PRGRMS_EXPENSES: "مصاريف البرامج والأنشطة"	,
PRGRMS_TO_TOTAL_EXPENSES: "تكلفة البرامج والانشطة من إ.المصاريف"	,
REV_FIN_SUST_TO_TOTAL_EXPENSES: "التكلفة الإدارية من العوائد",	
SUST_EXPENSEES_TO_REV: "تكلفة الاستدامة من عوائد الاستدامة",
SUST_RETURN_TO_ASSETS: "نسبة عوائد الاستدامة إلى إجمالي أصول"	,
SUST_TO_TOTAL_EXPENSES:   "تكلفة الاستدامة من المصاريف",	
RETURNS_FROM_TARGET:"نسبة الإيرادات المحققة من المستهدف العام",
  },
  CORPORATE: {
    CORORATE_PERFORMANCE: "الأداء المؤسسي ",
    GOVERENCE: "النسبة الإجمالية للحوكمة",
    HR: "الموارد البشرية",
    EMPLOYMENT_PERFORMANCE:"الأداء الوظيفي",
    EMP_PERF_AND_PROD:"أداء وإنتاجية الموظفين",
    PLANNING_ORGANIZING: "التخطيط والتنظيم",
    EMP_COMMITMENT:"الالتزام الوظيفي",
    DIRECT_MANAGER_EVALUATION:"تقييم المدير المباشر",

    SATIS_MEASURMENT: "قياس الرضا",
    CEO_PERFORMANCE: "أداء المدير التنفيذي ",
    COMPLIANCE_ADHERENCE_PRACTICES: "معيار الامتثال و الالتزام",
    TRANSPARENCY_DISCLOSURE_PRACTICES: "معيار الشفافية و الإفصاح",
    FINANCIAL_SAFETY_PRACTICES: "معيار السلامة المالية",
    RECRUITMENT: "التوظيف والاستقطاب",
    EMP_PERF_PROD: "أداء وإنتاجية الموظفين",
    EMP_DEV_TRAIN: "تطوير وتدريب الموظفين",
    TARGETS_HIT_PERF_EVAL: "تحقيق المستهدفات و تقييم الأداء ",
    JOB_COMMITMENT: "الانضباط الوظيفي",
    TRAIN_PLAN_EXEC: "تنفيذ خطة التدريب",
    TRAIN_IMPACT: "أثر التدريب",
    FOLLOWUP_OPERATIONAL_PLAN: "متابعة الخطة التشغيلية",
    QUALITY_OPERATIONAL_PLAN: "جودة الخطة التشغيلية",
    BENEF_SATIS_MEASURMENT: "رضا المستفيدين",
    EMP_SATIS_MEASURMENT: "رضا الموظفين",
    PARTENERS_SATIS_MEASURMENT: "رضا الشركاء والموردين",
    VOLUN_SATIS_MEASURMENT: "رضا المتطوعين",
    DONATORS_SATIS_MEASURMENT: "رضا المتبرعين والداعمين ",
    ADMIN_ORG_SATIS_MEASURMENT: "رضا الجمعية العمومية ومجلس الإدارة ",
    COMMUNITY_SATIS_MEASURMENT: "رضا المجتمع والصورة الذهنية",
    EXEC_LEADERSHIP: "القيادة التنفيذية ",
    EMP_TRAINING_INDICATOR:"مؤشر تدريب الموظفين",

    OPERATIONAL_PERF: "الأداء التشغيلي",
    ENTERPRISE_COMMUN: "التواصل المؤسسي",
    FOLLOWUP_BOARD_DECISION: "متابعة تنفيذ قرارات مجلس الإدارة",
    OPERATIONAL_PLAN_ACHIVMENT_GOALS: "تحقيق المستهدفات",
    //TODO: ITS THE BOARD STUFF CHANGE IIT LATER
    DAILY_OPS_MGMT: "تقييم مجلس الإدارة للمدير التنفيذي",
    FOLLOWUP_EMPS_PERF: "متابعة أداء الموظفين",
    ACTUAL_RETURNS:"العوائد الفعلية",
    EXPECTED_RETURNS:"الهوائد المتوقعة"
  },
  OPERATIONAL: {

    EFFIC_INTERNAL_OPS: "كفاءة العمليات الداخلية",
    VOLN_MGMT: "إدارة التطوع",
    OPS_PLAN_EXEC: "تنفيذ الخطة التشغيلية",
    PRJKT_PRGM_MGMT: "إدارة المشاريع والبرامج",
    OPS_GOALS_ACH_PERC: "نسبة تحقيق الأهداف التشغيلية",
    PGRM_PRJKS_EXEC_PERC: "نسبة تنفيذ البرامج والمشاريع",
    EFFIC_PRJKS_EXEC: "كفاءة تنفيذ المشاريع",
    EFFITV_PRJKS_PGRM: "فعالية المشاريع والبرامج",
    VOLN_CONTR_PRJKS_EXEC: "مساهمة المتطوعين في تنفيذ المشاريع",
    QLY_SPEED_PROC_EXEC: "جودة وسرعة تنفيذ الإجراءات",
    DOCS_ARCHIV: "التوثيق والأرشفة",
    VOLUN_GROWTH_RATE_QUAR: "معدل النمو الربعي للمتطوعين",
    VOLUN_SUST_PERC: "نسبة استدامة المتطوعين",
    PRJKT_TIMELY_COMP_PERC: "نسبة إنجاز المشروع في الوقت المحدد",
    BUDGET_COMMIT_PERC: "نسبة الالتزام بالميزانية",
    PRJK_GOALS_ACHV_PERC: "نسبة تحقيق أهداف المشروع",
    REACH_TARGET_AUD_PERC: "نسبة الوصول للفئة المستهدفة",
    DISBURSED_AMOUNTS_QUARTERLY:"المبالغ المصروفة",
    ACTIVITY_EXPENSES:"مصاريف الأنشطة",
    ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES:"مصاريف إدارية محملة على الأنشطة",
    SERVICE_EXPENSES:"مصاريف خدمات",
    SALARY_EXPENSES:"مصاريف الرواتب",
    MISCELLANEOUS_EXPENSES:"مصاريف نثرية",
    OTHER_EXPENSES:"أخرى",
    APPROVED_AMOUNTS_QUARTERLY:"المبالغ المعتمدة ",
    APPROVED_ACTIVITY_EXPENSES:"مصاريف الأنشطة",
    MARKETING_EXPENSES:"مصاريف التسويق",

    APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES:"مصاريف إدارية محملة على الأنشطة",

    APPROVED_SERVICE_EXPENSES:"مصاريف خدمات",
    APPROVED_SALARY_EXPENSES:"مصاريف الرواتب",
    APPROVED_MISCELLANEOUS_EXPENSES:"مصاريف نثرية",
    APPROVED_MARKETING_EXPENSES:"مصاريف التسويق",
    APPROVED_OTHER_EXPENSES:"أخرى",






  },
  GENERAL: {
    ECONOMIC_RETURN_OF_VOLUNTEERING: "العائد الاقتصادي للتطوع",
    FINANCIAL_PERF: "نسبة الأداء المالي ",
    ADMIN_EXPENSES: "المصاريف الإدارية والعمومية",
    CORPORATE_PERFORMANCE: "نسبة الأداء المؤسسي  ",
    GENERAL_PERFORMANCE:"نسبة الأداء العام ",
    VOLUN_SATIS_MEASURMENT: "رضا المتطوعين",
    BENEF_SATIS_MEASURMENT: "رضا المستفيدين",
    ADMIN_ORG_SATIS_MEASURMENT: "رضا اصحاب المصلحة",
    TOTAL_FINANCIAL_PEFORMANCE:"نسبة الأداء المالي ",
    OPERATIONAL_PERFORMANCE:"نسبة الأداء التشغيلي ",
    NO_RESPONSES_SATIS_FORM:"عدد المستفيدين ",
    AVG_SATIS_MEASURMENT:"متوسطة نسبة رضا أصحاب المصلحة",
    COMPLIANCE_ADHERENCE_PRACTICES_TOTAL:"معيار الامتثال و الالتزام",
    FINANCIAL_SAFETY_PRACTICES_TOTAL:"معيار السلامة المالية",
    TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL:"معيار الشفافية والإفصاح",

    GOVERANCE:"نسبة الحوكمة العامة",
    GOVERENCE:"نسبة الحوكمة العامة",


    OPS_PLAN_EXEC: "تنفيذ الخطة التشغيلية",
    PGRM_PRJKS_EXEC_PERC: "إدارة المشاريع والبرامج",
    EFFIC_INTERNAL_OPS: "كفاءة العمليات الداخلية",
    VOLN_MGMT: "إدارة التطوع",
RETURNS_FROM_TARGET:"نسبة الإيرادات المحققة من المستهدف العام",

  },
};


const governanceLabels  = {
  COMPLIANCE_ADHERENCE_PRACTICES: {
      // Bylaws and Basic Requirements
      BYLAWS_MODIFIED_IN_CURRENT_OR_PREVIOUS_YEAR:"هل تم تعديل اللائحة الأساسية للجمعية خلال السنة المالية الحالية أو السابقة؟",
      BYLAWS_INCLUDE_MEMBERSHIP_TERMS: "هل تشتمل اللائحة الأساسية على فئات وشروط وأحكام العضوية في الجمعية العمومية؟",
      HAS_APPROVED_BYLAWS_FROM_ASSEMBLY_AND_CENTER: "هل توجد لدى الجمعية لائحة أساسية معتمدة من الجمعية العمومية والمركز الوطني لتنمية القطاع غير الربحي وفق آخر تحديث ؟",
      HAS_OFFICIAL_WEBSITE: "هل تمتلك الجمعية موقعًا إلكترونيًا خاصًا بها؟",
      HAS_VALID_COMMERCIAL_REGISTRATION: "هل يوجد لدى الجمعية سجل تجاري ساري المفعول؟",
      HAS_BRANCHES_OR_OFFICES: "هل توجد فروع أو مكاتب لدى الجمعية؟",
      HAS_PERMANENT_COMMITTEES: "هل توجد لجان دائمة في الجمعية؟",
      FOLLOWED_BYLAWS_MODIFICATION_PROCEDURES:"هل تم اتباع الاجراءات المحدّدة عند تعديل اللائحة، وقبل تحديثها واعتمادها؟",
      MEMBERSHIP_OPEN_TO_PUBLIC:"هل باب العضوية في الجمعية مفتوح للعموم؟",
      GENERAL_ASSEMBLY_MEMBERSHIP_INCREASING:"هل يوجد تزايد في عدد أعضاء الجمعية العمومية؟",
      HAS_UPDATED_MEMBERS_REGISTRY:"هل لدى الجمعية سجل متكامل ومُحدّث بأعضاء الجمعية العمومية؟",
      ELECTED_NEW_BOARD_OR_EXECUTIVE_MEMBER_IN_CURRENT_OR_PREVIOUS_YEAR:"هل انتخبت الجمعية العمومية مجلساً جديداً أو عضواَ جديداً أو عضو إدارة تنفيذية خلال السنة المالية الحالية أو السابقة؟",
      PREVIOUS_BOARD_CLEARED_IN_FIRST_MEETING_AFTER_CHANGE:"هل تم إبراء ذمة مجلس الإدارة السابق أو أحد أعضائه في الاجتماع الأول بعد تغيّر الأعضاء ؟",
      GENERAL_ASSEMBLY_MET_IN_CURRENT_YEAR:"هل اجتمعت الجمعية العمومية (الاجتماع العادي) خلال السنة المالية الحالية؟",
      GENERAL_ASSEMBLY_REVIEWED_AUDITOR_REPORT:"هل درست الجمعية العمومية العادية في اجتماعها الأول تقرير مراجع الحسابات عن القوائم المالية للسنة المالية المنتهية؟",
      GENERAL_ASSEMBLY_APPROVED_NEW_BUDGET:"هل أقرّت الجمعية العمومية العادية مشروع الميزانية التقديرية للسنة المالية الجديدة؟",
      GENERAL_ASSEMBLY_DISCUSSED_NEW_YEAR_PLAN:"هل ناقشت الجمعية العمومية العادية الخطة المقترحة للسنة المالية الجديدة واتخذت التوصيات والقرارات لذلك؟",
      
      DOES_POLICY_CONTAIN_MECHANISM_TO_VERIFY_BENEFICIARY_ELIGIBILITY:"هل تحتوي السياسة على آلية للتأكد من استحقاق المستفيد؟",
      
      SUBMITTED_MEETING_MINUTES_TO_CENTER_WITHIN_FIFTEEN_DAYS:"هل تم إرسال نسخة من محضر اجتماع الجمعية العمومية مع محضر فرز الأصوات -إن وُجد- إلى المركز خلال 15 يوماً من تاريخ الاجتماع ؟",
      HAS_CURRENT_OPERATIONAL_PLAN:"هل توجد خطة تشغيلية للسنة المالية الحالية لدى الجمعية؟",
      OPERATIONAL_PLAN_APPROVED_BY_ASSEMBLY:"هل تم اعتماد الخطة من الجمعية العمومية؟",
      EXTRAORDINARY_GENERAL_ASSEMBLY_MET_IN_CURRENT_OR_PREVIOUS_YEAR:"هل انعقدت الجمعية العمومية (غير العادية) خلال السنة المالية الحالية أو السابقة؟",
      MEETINGS_HELD_BASED_ON_VALID_REQUEST:"هل كانت الاجتماعات بناًء على طلب مسّبب من المركز، أو من مجلس الإدارة، أو بناًء على طلب عدد لا يقل عن (25%) من الأعضاء الذين يحق لهم حضور الجمعية العمومية؟",
      EXTRAORDINARY_ASSEMBLY_DISCUSSED_WITHIN_JURISDICTION:"هل كل ما تم مناقشته هو ضمن اختصاصات الجمعية العمومية غير العادّية؟",
     
      SUBMITTED_EXTRAORDINARY_MEETING_MINUTES_TO_CENTER_WITHIN_FIFTEEN_DAYS:"هل تم إرسال نسخة من محضر اجتماع الجمعية العمومية مع محضر فرز الأصوات -إن ُوجد- إلى المركز خلال 15 يومًا من تاريخ الاجتماع؟",
     
      DECISIONS_MADE_DURING_MEETING:"هل تم اتخاذ قرارات خلال الاجتماع؟",
      OBTAINED_CENTER_APPROVAL_FOR_DECISIONS:"هل تم أخذ موافقة المركز على القرارات قبل تنفيذها؟",


      HAS_INTERNAL_AUDITOR_FOR_POLICIES:"هل يوجد مراجع داخلي أو موظف التزام لمراجعة وتحديث اللوائح والسياسات الداخلية؟",
     
      HAS_INTERNAL_CONTROL_SYSTEM_FOR_SPENDING_AND_COMPLIANCE:"هل يوجد نظام رقابة داخلي لمراجعة أوامر وقرارات الصرف الداخلية ومراجعة تطابق قرارات الإدارة التنفيذية مع السياسات واللوائح الداخلية المعتمدة؟",
      INTERNAL_CONTROL_SYSTEM_APPROVED_BY_BOARD:"هل تم اعتماد نظام الرقابة الداخلي من مجلس الإدارة؟",
      BOARD_OVERSEES_ASSEMBLY_AND_AUDITOR_DECISIONS:"هل يشرف المجلس على تنفيذ قرارات وتعليمات الجمعية العمومية أو المراجع الخارجي؟",
      HAS_APPROVED_CONFLICT_OF_INTEREST_POLICY:"هل توجد سياسة لتعارض المصالح معتمدة من مجلس الإدارة؟",
      HAS_RELATED_PARTY_TRANSACTIONS_BETWEEN_MEMBERS:"هل توجد علاقة تعاقدية أو تجارية من الدرجة الأولى إلى الدرجة الرابعة بين أحد أعضاء الجمعية العمومية أو أعضاء مجلس الإدارة أو موظفي الجمعية؟",
      HAS_APPROVED_WHISTLEBLOWER_PROTECTION_POLICY:"هل توجد سياسة للإبلاغ عن المخالفات وحماية مقدمي البلاغات معتمدة من مجلس الإدارة؟",
      HAS_APPROVED_DATA_PRIVACY_POLICY:"هل توجد سياسة لخصوصية البيانات معتمدة من مجلس الإدارة؟",
      HAS_APPROVED_DOCUMENT_RETENTION_POLICY:"هل توجد سياسة للاحتفاظ بالوثائق وإتلافها معتمدة من مجلس الإدارة؟",
      HAS_APPROVED_DONATION_POLICY:"هل توجد سياسة لجمع التبرعات معتمدة من مجلس الإدارة؟",
      HAS_APPROVED_BENEFICIARY_RELATIONS_POLICY:"هل توجد سياسة لتنظيم العلاقة مع المستفيدين (المستفيدين من الخدمة التي تقدمها الجمعية) معتمدة من مجلس الإدارة؟",
      POLICY_INCLUDES_ELIGIBILITY_VERIFICATION:"هل تحتوي السياسة على آلية للتأكد من استحقاق المستفيد؟",
      BENEFICIARY_NEEDS_ASSESSED:"هل تم دراسة احتياجات المستفيدين؟",
      AID_DISTRIBUTED_FAIRLY_TO_BENEFICIARIES:"هل تم توزيع التبرعات (الخدمات) بشكل عادل ومنصف بين المستفيدين؟",
      AID_MEETS_ACTUAL_BENEFICIARY_NEEDS:"هل تلبي التبرعات (الخدمات) الاحتياجات الفعلية للمستفيدين؟",
      AID_DISTRIBUTION_PROPERLY_DOCUMENTED:"هل تم تسجيل وتوثيق توزيع التبرعات (الخدمات) بطريقة صحيحة وشفافة؟",
      HAS_PERIODIC_AID_DISTRIBUTION_REPORTS:"هل توجد تقارير دورية تفيد بتسليم التبرعات (الخدمات) للمستفيدين؟",
      HAS_APPROVED_VOLUNTEER_MANAGEMENT_POLICY:"هل توجد آلية لإدارة المتطوعين في الجمعية معتمدة من مجلس الإدارة؟",
      HAS_APPROVED_HR_POLICY:"هل توجد لائحة للموارد البشرية في الجمعية معتمدة من مجلس الإدارة؟",
      HAS_APPROVED_BOARD_AUTHORITY_POLICY:"هل توجد لائحة لصلاحيات المجلس والصلاحيات الممنوحة من قبل مجلس الإدارة؟",
      HAS_DETAILED_AUTHORITY_DELEGATION_LIST:"هل توجد قائمة بصلاحيات المجلس والصلاحيات التي فّوضها وإجراءات اتخاذ القرار ومدة التفويض؟",
      BOARD_MONITORS_DELEGATED_AUTHORITIES:"هل يقوم المجلس بمتابعة ممارسة الصلاحيات المفّوضة عبر تقارير المتابعة؟",
      BOARD_MET_FOUR_TIMES_IN_PREVIOUS_YEAR:"هل اجتمع مجلس الإدارة (لا ُيقصد اللجنة التنفيذية) خلال السنة المالية السابقة أربعة اجتماعات على الأقل؟",
      BOARD_MEETINGS_HELD_QUARTERLY:"هل ُعقدت الاجتماعات بشكل منتظم (كل 3 أشهر مرة واحدة على الأقل)؟",
      BOARD_MEMBER_WORKS_IN_MANAGEMENT:"هل يوجد أحد أعضاء مجلس الإدارة يعمل في إدارة الجمعية أو في إحدى وظائفها؟",
      HAS_CENTER_APPROVAL_1:"هل توجد موافقة من المركز؟",
      BOARD_MEMBER_WORKS_IN_SUPERVISORY_AUTHORITY:"هل يوجد أحد أعضاء مجلس الإدارة يعمل في الإدارة المختصة بالإشراف على الجمعية في المركز أو الجهة المشرفة؟",
      HAS_CENTER_APPROVAL_2:"هل توجد موافقة من المركز؟",
      BOARD_MEMBER_EXCEEDED_TWO_CONSECUTIVE_TERMS:"هل يوجد أحد من أعضاء مجلس الإدارة استمر في عضويته لأكثر من دورتين متتاليتين؟",
      HAS_CENTER_APPROVAL_3:"هل توجد موافقة من المركز؟",
      BOARD_MEMBER_FROM_JUDICIARY:"هل يوجد أحد أعضاء مجلس الإدارة من أصحاب الفضيلة في السلك القضائي؟",

      HAS_APPOINTED_EXECUTIVE_DIRECTOR:"هل تم تعيين مدير تنفيذي في الجمعية",
      BOARD_MEMBERS_RECEIVED_ORIENTATION_PROGRAMS:"هل تم تقديم برامج تعريفية مخصصة لأعضاء مجلس الإدارة متعّلقة بعمل الجمعية والواجبات والمهام وفق نظام الجمعيات والمؤسسات الأهلية، وذلك خلال السنة المالية الحالية أو السابقة؟",
      EXECUTIVE_DIRECTOR_APPOINTED_BY_BOARD:"هل تم تعيينه (تعيين وليس تكليف) بقرار من قبل مجلس الإدارة؟",
      EXECUTIVE_DIRECTOR_RESPONSIBILITIES_DEFINED_IN_APPOINTMENT:"هل تم توضيح صلاحياته ومسؤولياته وحقوقه والتزاماته في قرار التعيين؟",
      EXECUTIVE_DIRECTOR_APPOINTMENT_DETAILS_SENT_TO_CENTER:"هل تم إرسال نسخة من قرار التعيين ومسوغات الراتب مع إرفاق صورة من هويته الوطنية وبيانات التواصل معه إلى المركز؟",
      HAS_SAUDI_ACCOUNTANT:"هل يوجد لدى الجمعية محاسب سعودي الجنسية؟",
      ACCOUNTANT_APPOINTMENT_DETAILS_SENT_TO_CENTER:"هل تم إرسال نسخة من قرار التعيين ومسوغات الراتب مع إرفاق صورة من هويته الوطنية وبيانات التواصل معه إلى المركز؟",
      BOARD_TERM_ENDING_OR_RECENTLY_ENDED:"هل مدة دورة مجلس الإدارة انتهت قريبًا (ستة أشهر قبل التقييم) أو على وشك الانتهاء (شهر بعد التقييم)؟",
      ELECTION_COMMITTEE_FORMED_IN_PREVIOUS_ASSEMBLY:"هل تم تشكيل لجنة انتخابات في الاجتماع العمومي الذي يسبق اجتماع الترشيح؟",
      ELECTION_COMMITTEE_HAS_TWO_NONCANDIDATE_MEMBERS:"هل أعضاء لجنة الانتخابات اثنين من أعضاء الجمعية العمومية كحد أدنى وغير مرشحين لعضوية المجلس الجديد؟",
      BOARD_INVITED_ELIGIBLE_CANDIDATES_WITHIN_TIMEFRAME:"هل دعا مجلس الإدارة جميع أعضاء الجمعية العمومية الذين تنطبق عليهم شروط الترشح لعضوية مجلس الإدارة قبل مئة وثمانين يوماً على الأقل من نهاية مدة مجلس الإدارة؟",
      NOMINATIONS_CLOSED_AND_SUBMITTED_TO_CENTER_ON_TIME:"هل تم إقفال باب الترشيح قبل تسعين يوما من نهاية مدة المجلس على الأقل ورفع أسماء المترشحين إلى المركز خلال أسبوع من قفل باب الترشيح؟",
      CANDIDATE_LIST_DISPLAYED_FIFTEEN_DAYS_BEFORE_TERM_END:"هل عرضت لجنة الانتخابات بالتنسيق مع مجلس الإدارة قائمة أسماء المترشحين الواردة من المركز في مقر الجمعية أو موقع الجمعية الإلكتروني قبل خمسة عشر يوما على الأقل من نهاية مدة المجلس؟",
      NEW_BOARD_MEMBERS_SUBMITTED_TO_CENTER_WITHIN_FIFTEEN_DAYS:"هل زود مجلس الإدارة الجديد المركز بأسماء الأعضاء الذين تم انتخابهم خلال خمسة عشر يوما من تاريخ الانتخاب؟",
      HAS_LOCAL_BRANCHES_AND_OFFICES:"هل يوجد لدى الجمعية فروع ومكاتب داخل المملكة؟",
      BRANCHES_APPROVED_BY_CENTER_AND_SUPERVISOR:"هل توجد موافقة من المركز والجهة المشرفة على إنشاء هذه الفروع والمكاتب؟",
      HAS_CERTIFIED_EXTERNAL_AUDITOR:"هل تم التعاقد مع مراجع حسابات معتمد لدى المركز أو مصنف لدى الهيئة السعودية للمراجعين والمحاسبين؟",
      HAS_DETAILED_ANNUAL_FINANCIAL_REPORT_APPROVED:"هل يوجد تقرير سنوي مفصل عن القوائم المالية ومعتمد من مراجع حسابات خارجي ومن الجمعية العمومية؟",
     
      FINANCIAL_REPORT_SUBMITTED_TO_CENTER_WITHIN_FOUR_MONTHS:"هل تم رفعه للمركز خلال الأربعة أشهر من نهاية السنة المالية؟",
      IS_THERE_DETAILED_ANNUAL_REPORT_ON_PROGRAMS_AND_ACTIVITIES_APPROVED_BY_GENERAL_ASSEMBLY:"هل يوجد تقرير سنوي مفصل عن البرامج والأنشطة معتمد من الجمعية العمومية؟",
      TERRORISM_FINANCING_RISKS_IDENTIFIED_AND_UNDERSTOOD:"هل قامت الجمعية بتحديد وفهم مخاطر جرائم الإرهاب وتمويله لديها؟",
      USES_CASH_TRANSACTIONS_FOR_DONATIONS:"هل يتم استخدام وسيلة التعاملات النقدية غير الإلكترونية في جمع التبرعات أو صرفها للمستفيدين؟",
      HAS_MONEY_LAUNDERING_SUSPICION_PROCEDURES:"هل لدى الجمعية إجراءات واضحة تلتزم بها إذا توافرت لديهم أسباب معقولة للاشتباه في أن الأموال أو بعضها تمثل عمليات لها علاقة بغسل الأموال أو أنها سوف تستخدم في عمليات غسل أموال أو بعلاقة أو ارتباط أي من العمليات، أو الصفقات المعّقدة، أو الضخمة أو غير الطبيعية بعمليات غسل الأموال؟",
      HAS_TERRORISM_FINANCING_AWARENESS_PROGRAMS:"هل توجد برامج توعوية لنشر وتعميق الوعي داخل الجمعية حول نقاط الضعف الممكنة والتي قد تستغل من قبل ممولي الإرهاب؟",
      REGISTRATION_CERTIFICATE_VALID:"هل شهادة تسجيل الجمعية سارية؟",
      ACTIVITIES_MATCH_CLASSIFICATION:"هل أنشطة الجمعية متطابقة مع تصنيفها؟",
      PROGRAM_ACTIVITIES_APPROVED_BY_SUPERVISORY_UNIT:"هل تمت الموافقة على طلبات إقامة البرامج والمشروعات والأنشطة الفنية التي تقدمها الجمعية وفق الإجراءات المتبعة للوحدة الإشرافية التابعة لها؟",
      HAS_UNAUTHORIZED_ACTIVITIES_OUTSIDE_BYLAWS:"هل توجد برامج وأنشطة للجمعية متعارضة مع أهدافها المحّددة في اللائحة الأساسية وبدون موافقة من المركز؟",
      HAS_SERVICE_DELIVERY_TRACKING_DOCUMENTATION:"هل يوجد توثيق لتتبع وصول الخدمة والمساعدات للمستفيدين؟",
      HAS_ACTIVITIES_OUTSIDE_ADMINISTRATIVE_SCOPE:"هل لدى الجمعية برامج أو أنشطة خارج نطاقها الإداري؟",
      HAS_CENTER_APPROVAL_4:"هل توجد موافقة من المركز؟",
      HAS_INTERNATIONAL_PARTNERSHIPS_OR_AGREEMENTS:"هل توجد تعاقدات أو شراكات أو اتفاقيات مع دول أو منظمات أو مؤسسات دولية؟",
      HAS_APPROVAL_FOR_INTERNATIONAL_AGREEMENTS:"هل توجد موافقة على ذلك من المركز والجهة المختصة؟",
      CONDUCTS_FUNDRAISING_CAMPAIGNS:"هل تقوم الجمعية بحملات لجمع التبرعات؟",
      HAS_FUNDRAISING_APPROVAL_FROM_CENTER:"هل توجد موافقة من المركز بذلك؟",
      HAS_SEPARATE_DONATIONS_ACCOUNT:"هل يوجد حساب مستقل للتبرعات؟",
      HAS_DONATIONS_REGISTRY:"هل يوجد سجل خاص بالتبرعات؟",
      DONATION_REGISTRY_INCLUDES_REQUIRED_DETAILS:"هل يحتوي السجل معلومات المتبرع، وقيمة التبرع، وشرطه إن وجد؟",
      DONATIONS_USED_FOR_UNINTENDED_PURPOSE:"هل تم استخدام التبرعات التي تم جمعها لغرض معين في نشاط آخر غير ما ُجمعت لأجله؟",
      HAS_CENTER_APPROVAL_FOR_DONATION_REPURPOSE:"هل توجد موافقة من المركز على ذلك؟",
      SURPLUS_INVESTED_IN_ENDOWMENTS_OR_PROJECTS:"هل تم استخدام فائض إيرادات معّينة وإدخالها في أوقاف الجمعية، أو تم استثمارها في مجالات مرّجحة الكسب تضمن لها الحصول على مورد ثابت، أو تم إعادة توظيفها في المشروعات الإنتاجية والخدمية؟",
      SURPLUS_INVESTMENT_APPROVED_BY_ASSEMBLY:"هل تم أخذ موافقة الجمعية العمومية على ذلك؟",
      RECEIVED_UNSOLICITED_FOREIGN_AID:"هل استقبلت الجمعية أعانات من خارج المملكة من دون طلب؟",
      COMPLIES_WITH_DONATION_HANDLING_REGULATIONS:"هل تلتزم الجمعية في الإجراءات النظامية المتعلقة باستقبال التبرعات وصرفها للمستفيدين؟",
      AUDITOR_APPOINTED_BY_BOARD:"هل تم تكليفه أو تعيينه من مجلس الإدارة؟",
      RISK_ASSESSMENT_DECISIONS_AND_RECOMMENDATIONS_IMPLEMENTED:"هل تم اتخاذ القرارات وتوصيات بعد استعراض نتائج التقييم للتعامل مع المخاطر والحد منها؟",
      NOTIFIED_CENTER_OF_FOREIGN_AID:"هل تم ابلاغ المركز؟",
      HAS_PROPERTY_OR_INVESTMENTS:"هل توجد عقارات أو استثمارات في ملكية الجمعية؟",
      PROPERTY_ACQUISITION_PROPERLY_APPROVED:"هل توجد موافقة من الجمعية العمومية قبل التملك أو تم إقرار ذلك في أول اجتماع تاٍل لها أو بقرار من مجلس الإدارة -في حال تم تفويضه من الجمعية العمومية باتخاذ القرارات في ذلك؟",
      BENEFICIARY_RECORDS_SECURELY_MAINTAINED:"هل يتم الاحتفاظ في مقر الجمعية بسجلات المستفيدين بحيث لا يتم فقدانها أو كشف سريتها؟",
      HAS_UPDATED_ASSEMBLY_MEETINGS_REGISTRY:"هل يوجد سجل محّدث خاص بوقائع جلسات الجمعية العمومية العادية وغير العادية؟",
      BOARD_MEETING_RECORDS_MAINTAINED:"هل ُتحفظ السجلات المتعلقة باجتماعات مجلس الإدارة؟",
      MEMBERS_HAVE_MEMBERSHIP_CARDS:"هل توجد بطاقات عضوية لكل عضو من أعضاء الجمعية العمومية؟",
      ALL_MEMBERS_RECEIVED_MEMBERSHIP_CARDS:"هل استلم جميع أعضاء الجمعية العمومية بطاقات عضوية؟",
      HAS_PERMANENT_OR_TEMPORARY_COMMITTEES_WITH_SPECIFIC_TASKS:"هل توجد لجان دائمة أو مؤقتة تم تكوينها من قبل الجمعية العمومية أو مجلس الإدارة للقيام بمهام محددة من حيث طبيعتها ومدتها؟",
      COMMITTEES_FORMATION_DECISIONS_EXIST:"هل توجد قرارات صادرة بتكوين هذه اللجان؟",
      COMMITTEE_DECISIONS_INCLUDE_COMPLETE_DETAILS:"هل اشتملت القرارات على مسمى كل لجنة وعدد أعضائها واختصاصاتها واختصاصات أعضائها، بما في ذلك تسمية رئيسها؟",
      BOARD_MEMBERS_PRESENT_IN_COMMITTEES:"هل يوجد أحد أعضاء مجلس الإدارة في هذه اللجان؟",
      HAS_EXECUTIVE_COMMITTEE:"هل توجد لجنة تنفيذية في الجمعية؟",
      EXECUTIVE_COMMITTEE_FORMED_WITH_DEFINED_AUTHORITIES:"هل يوجد قرار بتشكيلها وتحديد المهام والصلاحيات المفوضة فيها والتي تكفل سير عمل الجمعية؟",
      HAS_INTERNAL_AUDIT_COMMITTEE:"هل توجد لجنة تدقيق ومراجعة داخلية؟",
      FINANCIAL_SUPERVISOR_CHAIRS_AUDIT_COMMITTEE:"هل يرأس المشرف المالي في مجلس الإدارة هذه اللجنة؟"
    },
    TRANSPARENCY_DISCLOSURE_PRACTICES:{
        HAS_OFFICIAL_WEBSITE: "هل تمتلك الجمعية موقعًا إلكترونيًا خاصًا بها؟",
        PUBLISHED_BYLAWS_WITHOUT_IDS: "هل نشرت الجمعية لائحتها الأساسية المعتمدة في موقعها الإلكتروني، مع عدم عرض أرقام هويات أعضاء الجمعية العمومية؟",
        PUBLISHED_DONATION_POLICY: "هل تم نشر سياسة جمع التبرعات على موقع الجمعية الإلكتروني؟",
        PUBLISHED_BENEFICIARY_RELATIONS_POLICY: "هل تم نشر سياسة تنظيم العلاقة مع المستفيدين وتقديم الخدمات على موقع الجمعية الإلكتروني؟",
        PUBLISHED_VOLUNTEER_MANAGEMENT_POLICY: "هل تم نشر آلية إدارة المتطوعين على موقع الجمعية الإلكتروني؟",
        PUBLISHED_CONFLICT_OF_INTEREST_POLICY: "هل تم نشر سياسة تعارض المصالح المعتمدة في الجمعية على موقع الجمعية الإلكتروني؟",
        PUBLISHED_WHISTLEBLOWER_PROTECTION_POLICY: "هل تم نشر سياسة الإبلاغ عن المخالفات وحماية مقدمي البلاغات المعتمدة على موقع الجمعية الإلكتروني؟",
        PUBLISHED_DATA_PRIVACY_POLICY: "هل تم نشر سياسة خصوصية البيانات على موقع الجمعية الإلكتروني؟",
        PUBLISHED_DOCUMENT_RETENTION_POLICY: "هل تم نشر سياسة الاحتفاظ بالوثائق وإتلافها على موقع الجمعية الإلكتروني؟",
        DISCLOSED_GENERAL_ASSEMBLY_MEMBERS: "هل تم الإفصاح عن أسماء أعضاء الجمعية العمومية في الموقع الإلكتروني؟",
        DISCLOSED_GENERAL_ASSEMBLY_MINUTES: "هل تم الإفصاح عن محاضر اجتماعات الجمعية العمومية في موقع الجمعية الإلكتروني؟",
        DISCLOSED_BOARD_MEMBERS_AND_TERMS: "هل تم الإفصاح عن أسماء أعضاء مجلس الإدارة ومدة دورة المجلس والمدة المتاحة للأعضاء في الموقع الإلكتروني؟",
        DISCLOSED_RELATED_PARTY_RELATIONSHIPS: "هل تم الإفصاح عن وجود علاقة عائلية أو تجارية بين أحد من أعضاء مجلس الإدارة أو المديرين أو الموظفين القياديين مع عضو مجلس إدارة أو مدير أو موظف قيادي آخر في الجمعية؟",
        DISCLOSED_BOARD_MEMBER_CONTRACTS: "هل تم الإفصاح عن تعاقدات الجمعية مع شركة لـعضو مجلس إدارة أو أحد من أقاربه من الدرجة الأولى؟",
        DISCLOSED_COMMERCIAL_RELATIONSHIPS: "هل تم الإفصاح في الموقع الإلكتروني أو نموذج الإفصاح للجمعية عن وجود علاقة تعاقدية تجارية من الدرجة الأولى إلى الدرجة الرابعة؟",
        HAS_PERMANENT_COMMITTEES: "هل توجد لجان دائمة في الجمعية؟",
        DISCLOSED_COMMITTEE_DETAILS: "هل تم الإفصاح عن أسماء اللجان الدائمة واختصاصاتها مع أسماء أعضائها؟",
        HAS_VALID_COMMERCIAL_REGISTRATION: "هل يوجد لدى الجمعية سجل تجاري ساري المفعول؟",
        DISCLOSED_REGISTRATION_AND_EMPLOYEES: "هل تم الإفصاح عن السجل التجاري والعاملين في نموذج الإفصاح؟",
        DISCLOSED_EXECUTIVE_DIRECTOR: "هل تم الإفصاح عن اسم المدير التنفيذي؟",
        HAS_BRANCHES_OR_OFFICES: "هل توجد فروع أو مكاتب لدى الجمعية؟",
        DISCLOSED_BRANCH_MANAGERS_CONTACTS: "هل تم الإفصاح عن أسماء مديري الفروع والمكاتب وبيانات التواصل معهم؟",
        HAS_FEEDBACK_PORTAL: "هل لدى الجمعية نافذة لاستقبال الاستفسارات والمقترحات والشكاوى موضحة في موقعها الإلكتروني؟",
        RESPONDS_TO_FEEDBACK: "هل تتفاعل الجمعية مع الاستفسارات والمقترحات والشكاوى؟",
        CONDUCTED_STAKEHOLDER_SATISFACTION_SURVEY: "هل تم إجراء تقييمات لقياس رضا أصحاب العلاقة خلال السنة المالية الحالية أو السابقة؟",
        ACHIEVED_FIFTY_PERCENT_SURVEY_RESPONSE: "هل نسبة الاستجابة على قياس الرضا تمثل 50% من عدد مستفيدي الجمعية؟",
        ANALYZED_SATISFACTION_SURVEY_RESULTS: "هل تم تحليل الاستجابات التي تم جمعها من قياس الرضا؟",
        PRESENTED_RESULTS_TO_BOARD: "هل تم عرض النتائج على مجلس الإدارة؟",
        BOARD_MADE_RECOMMENDATIONS_ON_RESULTS: "هل تم اتخاذ القرارات والتوصيات من مجلس الإدارة على نتائج التقييم؟",
        PUBLISHED_EVALUATION_FEEDBACK: "هل تم نشر التغذية الراجعة من عمليات التقييم على منصات الجمعية الإلكترونية المناسبة؟",
        NOTIFIED_STAKEHOLDERS_OF_IMPROVEMENTS: "هل تم ابلاغ المعنيين بنتيجة التحسينات استنادًا إلى ملاحظاتهم؟",
        HAS_BENEFICIARY_EVALUATION_REPORT: "هل يوجد تقرير يلخص تقييم المستفيدين النهائيين للخدمات التي تقدمها الجمعية؟",
        PUBLISHED_STRATEGIC_OPERATIONAL_OBJECTIVES: "هل نشرت الجمعية أهدافها الاستراتيجية والتشغيلية في منصاتها الإلكترونية بما فيها موقعها الإلكتروني؟",
        PUBLISHED_PROGRAM_ACTIVITY_REPORTS: "هل تنشر الجمعية تقارير برامجها وأنشطتها في منصاتها الإلكترونية أو موقعها الإلكتروني؟",
        PUBLISHED_INVESTMENT_OWNERSHIP_DECISIONS: "هل تنشر الجمعية قرارات الاستثمار أو التملك الصادرة من الجمعية العمومية أو مجلس الإدارة في منصاتها الإلكترونية أو موقعها الإلكتروني؟",
        PUBLISHED_AID_STATISTICS: "هل تم نشر الإحصائيات الدقيقة المتعلقة بالمساعدات النقدية والعينية وأعداد وفئات المستفيدين منها في مواقع التواصل الاجتماعي للجمعية أو موقعها الإلكتروني؟",
        NOTIFIED_STAKEHOLDERS_OF_POLICY_UPDATES: "هل تم إبلاغ المستهدفين من الأنظمة واللوائح والسياسات عند نشرها أو تحديثها؟",
        PUBLISHED_AUDITED_FINANCIAL_REPORT: "هل تم نشر التقرير المالي السنوي المدّقق والمعتمد للجمعية على موقع الجمعية الإلكتروني؟",
        SUBMITTED_DISCLOSURE_ON_TIME: "هل تم توفير البيانات المطلوبة في نموذج الإفصاح في الوقت المحّدد؟",
        DISCLOSURE_APPROVED_BY_CHAIRMAN: "هل تم اعتماد النموذج من رئيس مجلس الإدارة؟",
        DISCLOSURE_MATCHES_REALITY: "هل تتطابق بيانات الجمعية المعتمدة في نموذج الإفصاح مع واقع الجمعية؟"
      },
    FINANCIAL_SAFETY_PRACTICES:{
      HAS_APPROVED_FINANCIAL_ORG_STRUCTURE: "هل يوجد هيكل تنظيمي للوظائف المالية في الجمعية ضمن هيكل الجمعية معتمد من مجلس الإدارة؟",
      HAS_CLEAR_FINANCIAL_JOB_DESCRIPTIONS: "هل يوجد وصف وظيفي للوظائف المالية واضح يحدد مسؤوليات واختصاصات كل موظف في الوظائف المالية المعتمدة في الهيكل التنظيمي؟",
      ROLES_MATCH_ORG_STRUCTURE: "هل هي متطابقة مع المستويات الموجودة في الهيكل التنظيمي المعتمد؟",
      HAS_FINANCIAL_POLICIES: "هل توجد لائحة للسياسات المالية ؟",
      FINANCIAL_POLICY_APPROVED_1: "هل تم اعتماد اللائحة من مجلس الإدارة؟",
      FINANCIAL_POLICY_APPROVED_2: "هل تم اعتماد اللائحة من مجلس الإدارة؟",
      FINANCIAL_POLICY_APPROVED_3: "هل تم اعتماد اللائحة من مجلس الإدارة؟",
      FINANCIAL_POLICY_APPROVED_4: "هل تم اعتماد اللائحة من مجلس الإدارة؟",


      PROCEDURES_IMPLEMENTED_1: "هل هي مفعلة في واقع العمل المالي في الجمعية ؟",
      PROCEDURES_IMPLEMENTED_2: "هل هي مفعلة في واقع العمل المالي في الجمعية ؟",
      PROCEDURES_IMPLEMENTED_3: "هل هي مفعلة في واقع العمل المالي في الجمعية ؟",

      HAS_FINANCIAL_PROCEDURES_MANUAL: "هل يوجد لدى الجمعية دليل إجراءات مالي ؟",
      PROCEDURES_MANUAL_APPROVED: "هل تم اعتماد الدليل من مجلس الإدارة؟",
      HAS_FINANCIAL_AUTHORITY_MATRIX: "هل يوجد لائحة صلاحيات مالية للمجلس والصلاحيات الممنوحة من المجلس للإدارة التنفيذية؟",
      HAS_PROCUREMENT_PROCEDURES: "هل يوجد لدى الجمعية لائحة وإجراءات للمشتريات؟",
      HAS_PROGRAM_SPENDING_PROCEDURES: "هل توجد لدى الجمعية سياسات وإجراءات خاصة بعمليات الصرف للبرامج والأنشطة؟",
      HAS_REVENUE_HANDLING_PROCEDURES: "هل لدى الجمعية إجراءات ملائمة للتعامل مع المقبوضات في الجمعية؟",
      HAS_APPROVED_DONATION_POLICY: "هل توجد سياسة لجمع التبرعات معتمدة من مجلس الإدارة؟",
      POLICIES_APPROVED: "هل تم اعتماد السياسات من مجلس الإدارة؟",
      POLICIES_APPROVED_2: "هل تم اعتماد السياسات من مجلس الإدارة؟",
      POLICIES_APPROVED_3: "هل تم اعتماد السياسات من مجلس الإدارة؟",

      HAS_INVESTMENT_POLICIES: "هل توجد لدى الجمعية سياسات وإجراءات مالية للاستثمار في الجمعية؟",
      HAS_ACCOUNTANT: "هل يوجد لدى الجمعية محاسب؟",
      ACCOUNTANT_IS_SAUDI: "هل المحاسب سعودي الجنسية؟",
      SUPERVISOR_PERFORMS_DUTIES: "هل يمارس المشرف المهام الموكلة إليه في هذه الممارسة؟",
      INTERNAL_AUDITOR_REPORTS_TO_BOARD: "هل يرفع المراجع الداخلي التقارير لمجلس الإدارة والإدارة التنفيذية؟",
      HAS_ACCOUNTING_SOFTWARE: "هل يوجد لدى الجمعية برنامج محاسبي ؟",
      FOLLOWS_SAUDI_ACCOUNTING_STANDARDS: "هل تتقيد الجمعية في عملياتها المالية بالمعايير المحاسبية الصادرة من الهيئة السعودية للمحاسبين القانونيين وبالنماذج والتقارير المحاسبية التي تصدرها المركز؟",
      MAINTAINS_REQUIRED_RECORDS: "هل يوجد لدى الجمعية السجلات والدفاتر الإدارية والمحاسبية التي تحتاجها وفقًا للأنظمة واللوائح والتعليمات ومتطلبات العمل المالي والمحاسبي لكافة العمليات المحاسبية؟",
      APPLIES_UNIFIED_CHART_OF_ACCOUNTS: "هل تطبق الجمعية دليل الحسابات الموحد في الجمعيات الأهلية والمعتمد من المركز بشكل صحيح ؟",
      CHART_OF_ACCOUNTS_IMPLEMENTED: "هل هو مفعل في واقع العمل المالي في الجمعية ؟",
      CHART_OF_ACCOUNTS_IMPLEMENTED_2: "هل هو مفعل في واقع العمل المالي في الجمعية ؟",

      HAS_MEMBERSHIP_FEES_TRACKING: "هل يوجد سجل يدوي أو عبر البرنامج المحاسبي لمتابعة اشتراكات الأعضاء؟",
      HAS_OPERATIONAL_BUDGET: "هل للجمعية موازنة تقديرية و تم إعدادها بناء على الخطة التشغيلية المعتمدة للجمعية؟",
      HAS_INVESTMENTS_OR_ASSETS: "هل لدى الجمعية استثمارات أو أصول ؟",
      INVESTMENTS_APPROVED_BY_ASSEMBLY: "هل أقّرت الجمعية العمومية خطة هذه الاستثمارات والأصول واقترحت مجالاته؟",
      RECEIVED_FOREIGN_AID: "هل تلّقت الجمعية إعانات من خارج المملكة؟",
      FOREIGN_AID_CENTER_APPROVED: "هل تم أخذ الموافقة من المركز؟"


    }


}

export { entriesLabels, indicatorsLabels, dashboardStatusMap, tabsNames ,governanceLabels,GOVERANCE_TABS};
