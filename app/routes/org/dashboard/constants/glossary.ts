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


  const newDashboardsTitles = {
    NEW_CORPORATE_INDICATORS:"اللوحة المؤسسية",
    NEW_FINANCIAL_INDICATORS:"اللوحة المالية",
    NEW_OPERATIONAL_INDICATORS:"اللوحة التشغيلية",
    NEW_GENERAL_INDICATORS:"اللوحة العامة"


  }

  const indicatorsLabels = {
    FINANCIAL: {
      FINANCIAL_PERF:"الأداء المالي",
      FINANCIAL_RESOURCES_DEV: "تنمية الموارد المالية",
      ADMIN_EXPENSES: "المصاريف الإدارية  ",
      PRGRMS_EXPENSES: "مصاريف البرامج و الأنشطة",
      FINANCIAL_SUSTAIN: " نسبة الاستدامة المالية ",
      DONAT_MONEY_RAISING: "جمع الأموال و التبرعات",
      ABL_COVER_OBLIG: "القدرة على تغطية التزاماتها المستقبلية",
      DIVERSITY_INCOME_RESOURCES:"تنوع مصادر الدخل",
      EFFECIENT_RESOURCE_MGMT:"كفاءة إدارة الموارد",
      ADMIN_TO_TOTAL_EXPENSES:"المصاريف الإدارية إلى اجمالي المصاريف",
      REV_FIN_SUST_TO_TOTAL_EXPENSES:"عوائد الاستدامة المالية إلى المصاريف الإدارية",
      PRGRMS_TO_TOTAL_EXPENSES:"مصاريف البرامج والأنشطة إلى اجمالي المصاريف",
      SUST_TO_TOTAL_EXPENSES:"مصاريف الاستدامة إلى اجمالي المصاريف",
      SUST_EXPENSEES_TO_REV:"مصاريف الاستدامة إلى عوائد الاستدامة",
      SUST_RETURN_TO_ASSETS:"العائد من الاستدامة إلى اجمالي أصول الاستدامة",
      FUND_RAISING_TO_TOTAL_EXPENSES:"مصاريف جمع الأموال إلى اجمالي المصاريف",
      FUND_RAISING_TO_TOTAL_DONAT:"مصاريف جمع الأموال إلى اجمالي التبرعات",
      CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF:"النقد وما ي حكمه إلى (صافي الأصول المقيدة + صافي أصول النقدية الأوقاف)",
      NET_CACHE_INVEST_ADMIN_EXPENSES:"صافي النقد والاستثمارات المتداولة إلى المصاريف الإدارية التقديرية",
      DONAT_PERC:"نسبة التبرعات (مقيدة/غير مقيدة)",
      PLATFORM_REV_PERC:"نسبة الإيرادات من المنصات",
      PRGMS_PRJKS_REV:"عوائد البرامج و المشاريع",
      PAID_MEMBERSHIP_PERC:"نسبة العضويات المسددة",
      ECO_RETURN_VOLUN:"العائد الاقتصادي من التطوع",
      RATE_REV_ANNUAL_GROWTH:"معدل نمو الإيرادات السنوي",
      COMMIT_DISC_PERC:"نسبة تخفيض الالتزامات",
      RATE_SUST_DONAT:"معدل استدامة المتبرعين",
      TOTAL_TAX_REFUND:"اجمالي المبالغ المستردة من الضريبة"
    },
    CORPORATE: {
      CORORATE_PERFORMANCE: "الأداء المؤسسي ",
      GOVERANCE: "النسبة الإجمالية للحوكمة",
      HR: "الموارد البشرية",
      PLANNING_ORGANIZING: "التخطيط والتنظيم",
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
      BENEF_SATIS_MEASURMENT: "قياس رضا المستفيدين",
      EMP_SATIS_MEASURMENT: "قياس رضا الموظفين",
      PARTENERS_SATIS_MEASURMENT: "قياس رضا الشركاء والموردين",
      VOLUN_SATIS_MEASURMENT: "قياس رضا المتطوعين",
      DONATORS_SATIS_MEASURMENT: "قياس رضا المتبرعين والداعمين ",
      ADMIN_ORG_SATIS_MEASURMENT: "قياس رضا الجمعية العمومية ومجلس الإدارة ",
      COMMUNITY_SATIS_MEASURMENT: "قياس رضا المجتمع والصورة الذهنية",
      EXEC_LEADERSHIP: "القيادة التنفيذية ",
      OPERATIONAL_PERF: "القيادة التنفيذية ",
      ENTERPRISE_COMMUN: "القيادة التنفيذية ",
      FOLLOWUP_BOARD_DECISION: "متابعة تنفيذ قرارات مجلس الإدارة",
      OPERATIONAL_PLAN_ACHIVMENT_GOALS: "تحقيق المستهدفات",
      DAILY_OPS_MGMT: "إدارة العمليات اليومية",
      FOLLOWUP_EMPS_PERF: "متابعة أداء الموظفين",
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
      REACH_TARGET_AUD_PERC: "نسبة الوصول للفئة المستهدفة"
  
    },
    GENERAL: {
      ECO_RETURN_VOLUN: "العائد الاقتصادي للتطوع",
      FINANCIAL_PERF: "نسبة الأداء المالي ",
      ADMIN_EXPENSES: "المصاريف الإدارية والعمومية",
      CORPORATE_PERFORMANCE: "نسبة الأداء المؤسسي  ",
      GENERAL_PERFORMANCE:"نسبة الأداء العام ",
      VOLUN_SATIS_MEASURMENT: "قياس رضا المتطوعين",
      BENEF_SATIS_MEASURMENT: "قياس رضا المستفيدين",
      ADMIN_ORG_SATIS_MEASURMENT: "قياس رضا اصحاب المصلحة",
      GOVERANCE:"نسبة الحوكمة العامة",
      OPS_PLAN_EXEC: "تنفيذ الخطة التشغيلية",
      PRJKT_PRGM_MGMT: "إدارة المشاريع والبرامج",
      EFFIC_INTERNAL_OPS: "كفاءة العمليات الداخلية",
      VOLN_MGMT: "إدارة التطوع"
    
    },
  };

export { indicatorsLabels, dashboardStatusMap, tabsNames ,newDashboardsTitles};
