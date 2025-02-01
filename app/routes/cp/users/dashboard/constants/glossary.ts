



 const dashboardStatusMap={
    NOT_STARTED:"لم يتم البدء",
    IN_PROGRESS:"قيد التنفيذ",
    COMPLETE:"مكتمل",
}


const tabsNames={
    FINANCIAL:"مؤشر الأداء المالي",
    OPERATIONAL:"مؤشر الأداء التشغيلي",
    CORPORATE:"مؤشر الأداء المؤسسي",
    GENERAL:"اللوحة العامة"
}


const entriesLabels = {
    FINANCIAL:{
        GENERAL_ADMINSTRATIVE_EXPENSES: "المصاريف العمومية و الإدارية",
        GOVERENCE_EXPENSES: "مصاريف الحوكمة",
        PROGRAMS_EXPENSES_BOUNDED: "مصاريف برامج و أنشطة مقيدة",
        PROGRAMS_EXPENSES_UNBOUNDED: "مصاريف برامج و أنشطة غير مقيدة",
        PROGRAMS_EXPENSES: "مصاريف البرامج",
        GENERAL_ADMINSTRATIVE_EXPENSES_ACT: "مصاريف العمومية و الإدارية المحملة على البرامج والأنشطة",
        AWQAF_EXPENSES: "مصاريف الأوقاف",
        INVESTMENT_EXPENSES: "مصاريف الاستثمار",
        SUSTAINBILITY_EXPENSES: "مصاريف الاستدامة",
        FUND_RAISING_EXPENSES: "مصاريف جمع الأموال",
        TOTAL_EXPENSES: "إجمالي المصاريف",
        AWQAF_REVENUE: "إيرادات الأوقاف",
        INVESTMENT_REVENUE: "إيرادات الاستثمارات",
        SUSTAINBILITY_REVENUE: "إيرادات الاستدامة المالية",
        BOUNDED_CHARITY: "التبرعات المقيدة",
        UNBOUNDED_CHARITY: "تبرعات غير مقيدة",
        TOTAL_CHARITY: "إجمالي التبرعات",
        CASH_RELATED: "النقد وما في حكمه",
        TRADED_INVESTMENTS: "الاستثمارات المتداولة",
        SUSTAIN_ASSETS_WAQFI: "الأصول الاستدامة الوقفية",
        SUSTAIN_ASSETS_INVEST: "أصول الاستدامة  الاستثمارات",
        SUSTAIN_ASSETS_FIN: "أصول الاستدامة المالية",
        CURRENT_LIABILITIES: "الالتزامات المتداولة",
        BOUNDED_NET_ASSETS: "صافي الأصول المقيدة",
        AWQAF_NET_ASSETS_CASH: "صافي أصول الأوقاف)نقدية)",
        GOV_PLATFORMS_REVENUE: "الإيرادات من المنصات الحكومية",
        PRGMS_PRJKS_REVENUE: "عوائد البرامج والمشاريع",
        NO_PAID_MEMBERSHIP: "عدد العضويات المسددة",
        TOTAL_MEMBERSHIP: "إجمالي العضويات",
        FIN_VALUE_VOLUN: "القيمة المالية لساعات التطوع",
        OPERATIONAL_EXPANSES: "المصروفات التشغيلية",
        LAST_YEAR_REVENUE: "إيرادات العام السابق",
        NO_CONT_VOLUN: "عدد المتبرعين المستمرين",
        NO_TOTAL_VOLUN_LAST_YEAR: "إجمالي المتبرعين في العام السابق",
        NO_TOTAL_MONEY_VAT: "إجمالي المبالغ المستردة من الضريبة",
        START_LIABILITIES: "الالتزامات في بداية العام",
        END_LIABILITIES: "الالتزامات في نهاية العام"
    },
    CORPORATE:{
        COMPLIANCE_ADHERENCE_PRACTICES: "ممارسات الامتثال و الالتزام",
        TRANSPARENCY_DISCLOSURE_PRACTICES: "ممارسات الشفافية و الإفصاح",
        FINANCIAL_SAFETY_PRACTICES: "ممارسات السلامة المالية",
        NO_SUCCESSFUL_HIRES_POST_EXP: "عدد التعيينات الناجحة التي تجاوزت فترة التجربة",
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
        TOTAL_GRADES_DON_STATIS:"مجموع درجات رضا المتبرعين",
        NO_RESPOSES_VOL_SATIS_FORM: "عدد المستجيبين من استبيان رضا المتطوعين",
        NO_RESPONSES_VOL_SATIS_FORM: "عدد المستجيبين من استبيان رضا المتطوعين",
        NO_RESPONSES_DON_SATIS_FORM:"عدد المستجيبين من استبيان رضا المتبرعين",
        TOTAL_SATIS_GRADES_ORG: "مجموع درجات الرضا الجمعية العمومية ومجلس الإدارة",
        NO_ORG_MEMBERS: "العدد الكلي للأعضاء الجمعية العمومية ومجلس الإدارة",
        TOTAL_GRADES_COM: "مجموع درجات رضا المجتمع",
        NO_RESPONSES_COM_SATIS: "عدد المستجيبين من استبيان رضا المجتمع",
        TASKS_ACHIEVED_TIMELY_CEO: "المهام المنجزة في وقتها للمدير التنفيذي",
        TOTAL_PLANNED_TASKS_CEO: "إجمالي المهام المخططة للمدير التنفيذي",
        AVG_EVAL_EMPS: "متوسط تقييم أداء جميع الموظفين",
        AVG_RES_SATIS_FORMS_EMP: "متوسط نتائج استبيانات الرضا الموظفين، الشركاء، أصحاب المصلحة",
        EMP_EVAL: "تقييم كل موظف",
        EMP_ACHIEVMENT_PERC: "نسبه إنجاز كل موظف",
        NO_EXEC_DESC: "عدد القرارات المنفذة",
        TOTAL_DESC: "إجمالي القرارات",
        NO_ACHIV_TARGETS: "عدد الأهداف المحققة",
        TOTAL_TARGETS: "إجمالي الأهداف"
    },
    OPERATIONAL:{
        NO_OPERATIONAL_GOALS_ACHIEVED: "عدد الأهداف التشغيلية المحققة",
    NO_OPERATIONAL_GOALS_PLANNED: "إجمالي الأهداف التشغيلية المخططة",
    NO_PROGRAMS_EXECUTED: "عدد البرامج المنفذة",
    NO_PROGRAMS_PLANNED: "إجمالي البرامج المخططة",
    NO_TIMELY_ACTIVITIES: "عدد الأنشطة المنفذة في وقتها",
    TOTAL_PLANNED_ACTIVITIES: "إجمالي الأنشطة المخططة",
    APPROVED_BUDGET: "الميزانية المعتمدة",
    PLANNED_ACTUAL_DIFF: "الفرق بين المخطط والفعلي",
    NO_OUTPUTS_ACHIEVED: "عدد المخرجات المحققة بالمواصفات المطلوبة",
    TOTAL_TARGETED_OUTPUTS: "إجمالي المخرجات المستهدفة",
    NO_ACTUAL_BENEFICIARIES: "عدد المستفيدين الفعلي",
    PLANNED_TARGET_NUMBER: "العدد المستهدف في الخطة",
    NO_PROGRAMS_WITH_PARTICIPANTS: "عدد المشاريع والبرامج التي شارك فيها متطوعون",
    NO_PROGRAMS_PROJECTS: "إجمالي عدد المشاريع والبرامج",
    NO_TIMELY_TRANSACTIONS: "عدد المعاملات المنجزة خلال الوقت المحدد",
    TOTAL_TRANSACTIONS: "إجمالي المعاملات",
    NO_ARCHIVED_DOCS: "عدد الوثائق المؤرشفة حسب النظام",
    TOTAL_DOCS: "إجمالي الوثائق",
    NO_VOLUNTEERS_CURRENT_QUARTER: "عدد المتطوعين في الربع الحالي",
    NO_VOLUNTEERS_NEXT_QUARTER: "عدد المتطوعين في الربع السابق",
    NO_VOLUNTEERS_CONT_3: "عدد المتطوعين المستمرين لأكثر من 3 أشهر",
    TOTAL_VOLUNTEERS: "إجمالي عدد المتطوعين"
    }
}

export {
    entriesLabels,
    dashboardStatusMap,
    tabsNames
}