export type EntriesInitialValues = {
  FINANCIAL: FinancialEntriesType;
  OPERATIONAL: { [key: string]: number };
  CORPORATE: { [key: string]: number };
  GENERAL: { [key: string]: number };
  COMPLIANCE_ADHERENCE_PRACTICES: { [key: string]: number };
};
export const initialValues: EntriesInitialValues = {
  FINANCIAL: {
    TOTAL_SUSTAINABILITY_ASSETS: {
      value: 0,
      TRADED_INVESTMENTS: {
        value: 0,
      },
      UNTRADED_INVESTMENTS: {
        value: 0,
      },
      AWQAF_INVESTMENTS: {
        value: 0,
      },
      AWQAF_FIXED_ASSETS: {
        value: 0,
      },
    },
    CASHE_RELATED: {
      value: 0,
    },
    CURRENT_LIABILITIES: {
      value: 0,
    },
    TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH: {
      value: 0,
      LIMITED_NET_ASSETS: {
        value: 0,
      },
      AWQAF_NET_ASSETS: {
        value: 0,
      },
    },
    TOTAL_EXPENSES: {
      value: 0,
      TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES: {
        value: 0,
        GENERAL_ADMINSTRATIVE_EXPENSES: {
          value: 0,
        },
        GOVERENCE_EXPENSES: {
          value: 0,
        },
      },
      TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES: {
        value: 0,
        PROGRAMS_EXPENSES: {
          value: 0,
        },
        ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY: {
          value: 0,
        },
      },
      TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES: {
        value: 0,
        AWQAF_DIST_EXPENSES: {
          value: 0,
        },
        INVESTMENT_EXPENSES: {
          value: 0,
        },
      },
      FUND_RAISING_EXPENSES: {
        value: 0,
      },
    },
    TOTAL_SUSTAINABILITY_RETURNS: {
      value: 0,
      UNRESTRICTED_REVENUE: {
        value: 0,
      },
      RESTRICTED_REVENUE: {
        value: 0,
      },
      AWQAF_QUARTER_REVENUE: {
        value: 0,
      },
      PROFIT_AWQAF_INVESTMENTS: {
        value: 0,
      },
    },
    TOTAL_DONATIONS: {
      value: 0,
      ZAKAT: {
        value: 0,
      },
      RESTRICTED_CASH_DONATIONS: {
        value: 0,
      },
      RESTRICTED_IN_KIND_DONATIONS: {
        value: 0,
      },
      RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: {
        value: 0,
      },
      GOVERNMENT_GRANT_DONATIONS: {
        value: 0,
      },
      UNRESTRICTED_CASH_DONATIONS: {
        value: 0,
      },
      UNRESTRICTED_IN_KIND_DONATIONS: {
        value: 0,
      },
      UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: {
        value: 0,
      },
      DONATION_BY_LIABILITY_REDUCTION: {
        value: 0,
      },
    },
    IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES: {
      value: 0,
      TOTAL_TAX_REFUND: {
        value: 0,
      },
      PROGRAM_AND_ACTIVITY_REVENUES: {
        value: 0,
        RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES: {
          value: 0,
        },
      },
      GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL: {
        value: 0,
      },
    },
  },
  OPERATIONAL: {
    NO_OPERATIONAL_GOALS_ACHIEVED: 0,
    NO_OPERATIONAL_GOALS_PLANNED: 0,
    NO_PROGRAMS_EXECUTED: 0,
    NO_PROGRAMS_PLANNED: 0,
    NO_TIMELY_ACTIVITIES: 0,
    TOTAL_PLANNED_ACTIVITIES: 0,
    APPROVED_BUDGET: 0,
    PLANNED_ACTUAL_DIFF: 0,
    NO_OUTPUTS_ACHIEVED: 0,
    TOTAL_TARGETED_OUTPUTS: 0,
    NO_ACTUAL_BENEFICIARIES: 0,
    PLANNED_TARGET_NUMBER: 0,
    NO_PROGRAMS_WITH_PARTICIPANTS: 0,
    NO_PROGRAMS_PROJECTS: 0,
    NO_TIMELY_TRANSACTIONS: 0,
    TOTAL_TRANSACTIONS: 0,
    NO_ARCHIVED_DOCS: 0,
    TOTAL_DOCS: 0,
    NO_VOLUNTEERS_CURRENT_QUARTER: 0,
    NO_VOLUNTEERS_NEXT_QUARTER: 0,
    NO_VOLUNTEERS_CONT_3: 0,
    TOTAL_VOLUNTEERS: 0,
  },
  CORPORATE: {
    TOTAL_ASSIGNED_TASKS_DURING_PERIOD:0,
    TOTAL_COMPLETED_TASKS_DURING_PERIOD:0,
    TOTAL_WORKING_DAYS:0,
    TOTAL_EMPLOYEE_ATTENDANCE_DAYS:0,
    PERC_COMMIT_WORK_HOURS:0,
    NO_PLANNED_PRACTICES:0,
    NO_EXE_PRACTICES:0,
    TOTAL_FORMS_GRADES:0,
    NO_RESPONSES_SATIS_FORM:0,
    NO_RESPONSES_EMP_SATIS:0,
    NO_RESPONSES_PARTERS_FORM:0,
    NO_RESPOSES_VOL_SATIS_FORM:0,
    NO_RESPONSES_DONAT_SATIS_FORM:0,
    NO_ORG_MEMBERS:0,
    NO_GRADES_BENEFITS_SATISF:0,
    TOTAL_GRADES_EMP_SATIS:0,
    TOTAL_GEADES_PARTENERS_SATIS:0,
    TOTAL_GRADES_VOL_SATIS:0,
    TOTAL_GRADES_DONAT_STATIS:0,
    TOTAL_SATIS_GRADES_ORG:0,
    TOTAL_GRADES_COM:0,
    TOTAL_DECISIONS_BY_CEO:0,
    TOTAL_EXECUTED_DECISIONS:0,
    TOTAL_PLANNED_PROGRAMS:0,
    TOTAL_ACHIEVED_PROGRAMS:0,
    EMP_PERF_EVALUATION_AVG:0,
    BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE:0,
    DIRECT_MANAGER_EVALUATION:0,

  },
  GENERAL: {},

  COMPLIANCE_ADHERENCE_PRACTICES: {
    // Bylaws and Basic Requirements
    BYLAWS_MODIFIED_IN_CURRENT_OR_PREVIOUS_YEAR: 0,
    BYLAWS_INCLUDE_MEMBERSHIP_TERMS: 0,
    HAS_APPROVED_BYLAWS_FROM_ASSEMBLY_AND_CENTER: 0,
    HAS_OFFICIAL_WEBSITE: 0,
    HAS_VALID_COMMERCIAL_REGISTRATION: 0,
    HAS_BRANCHES_OR_OFFICES: 0,
    HAS_PERMANENT_COMMITTEES: 0,
    FOLLOWED_BYLAWS_MODIFICATION_PROCEDURES: 0,
    MEMBERSHIP_OPEN_TO_PUBLIC: 0,
    GENERAL_ASSEMBLY_MEMBERSHIP_INCREASING: 0,
    HAS_UPDATED_MEMBERS_REGISTRY: 0,
    ELECTED_NEW_BOARD_OR_EXECUTIVE_MEMBER_IN_CURRENT_OR_PREVIOUS_YEAR: 0,
    PREVIOUS_BOARD_CLEARED_IN_FIRST_MEETING_AFTER_CHANGE: 0,
    GENERAL_ASSEMBLY_MET_IN_CURRENT_YEAR: 0,
    GENERAL_ASSEMBLY_REVIEWED_AUDITOR_REPORT: 0,
    GENERAL_ASSEMBLY_APPROVED_NEW_BUDGET: 0,
    GENERAL_ASSEMBLY_DISCUSSED_NEW_YEAR_PLAN: 0,
    SUBMITTED_MEETING_MINUTES_TO_CENTER_WITHIN_FIFTEEN_DAYS: 0,
    HAS_CURRENT_OPERATIONAL_PLAN: 0,
    OPERATIONAL_PLAN_APPROVED_BY_ASSEMBLY: 0,
    EXTRAORDINARY_GENERAL_ASSEMBLY_MET_IN_CURRENT_OR_PREVIOUS_YEAR: 0,
    MEETINGS_HELD_BASED_ON_VALID_REQUEST: 0,
    EXTRAORDINARY_ASSEMBLY_DISCUSSED_WITHIN_JURISDICTION: 0,
    SUBMITTED_EXTRAORDINARY_MEETING_MINUTES_TO_CENTER_WITHIN_FIFTEEN_DAYS: 0,
    DECISIONS_MADE_DURING_MEETING: 0,
    OBTAINED_CENTER_APPROVAL_FOR_DECISIONS: 0,
    HAS_INTERNAL_AUDITOR_FOR_POLICIES: 0,
    HAS_INTERNAL_CONTROL_SYSTEM_FOR_SPENDING_AND_COMPLIANCE: 0,
    INTERNAL_CONTROL_SYSTEM_APPROVED_BY_BOARD: 0,
    BOARD_OVERSEES_ASSEMBLY_AND_AUDITOR_DECISIONS: 0,
    HAS_APPROVED_CONFLICT_OF_INTEREST_POLICY: 0,
    HAS_RELATED_PARTY_TRANSACTIONS_BETWEEN_MEMBERS: 0,
    HAS_APPROVED_WHISTLEBLOWER_PROTECTION_POLICY: 0,
    HAS_APPROVED_DATA_PRIVACY_POLICY: 0,
    HAS_APPROVED_DOCUMENT_RETENTION_POLICY: 0,
    HAS_APPROVED_DONATION_POLICY: 0,
    HAS_APPROVED_BENEFICIARY_RELATIONS_POLICY: 0,
    POLICY_INCLUDES_ELIGIBILITY_VERIFICATION: 0,
    BENEFICIARY_NEEDS_ASSESSED: 0,
    AID_DISTRIBUTED_FAIRLY_TO_BENEFICIARIES: 0,
    AID_MEETS_ACTUAL_BENEFICIARY_NEEDS: 0,
    AID_DISTRIBUTION_PROPERLY_DOCUMENTED: 0,
    HAS_PERIODIC_AID_DISTRIBUTION_REPORTS: 0,
    HAS_APPROVED_VOLUNTEER_MANAGEMENT_POLICY: 0,
    HAS_APPROVED_HR_POLICY: 0,
    HAS_APPROVED_BOARD_AUTHORITY_POLICY: 0,
    HAS_DETAILED_AUTHORITY_DELEGATION_LIST: 0,
    BOARD_MONITORS_DELEGATED_AUTHORITIES: 0,
    BOARD_MET_FOUR_TIMES_IN_PREVIOUS_YEAR: 0,
    BOARD_MEETINGS_HELD_QUARTERLY: 0,
    BOARD_MEMBER_WORKS_IN_MANAGEMENT: 0,
    HAS_CENTER_APPROVAL_1: 0,
    BOARD_MEMBER_WORKS_IN_SUPERVISORY_AUTHORITY: 0,
    HAS_CENTER_APPROVAL_2: 0,
    BOARD_MEMBER_EXCEEDED_TWO_CONSECUTIVE_TERMS: 0,
    HAS_CENTER_APPROVAL_3: 0,
    BOARD_MEMBER_FROM_JUDICIARY: 0,
    HAS_APPOINTED_EXECUTIVE_DIRECTOR: 0,
    BOARD_MEMBERS_RECEIVED_ORIENTATION_PROGRAMS: 0,
    EXECUTIVE_DIRECTOR_APPOINTED_BY_BOARD: 0,
    EXECUTIVE_DIRECTOR_RESPONSIBILITIES_DEFINED_IN_APPOINTMENT: 0,
    EXECUTIVE_DIRECTOR_APPOINTMENT_DETAILS_SENT_TO_CENTER: 0,
    HAS_SAUDI_ACCOUNTANT: 0,
    ACCOUNTANT_APPOINTMENT_DETAILS_SENT_TO_CENTER: 0,
    BOARD_TERM_ENDING_OR_RECENTLY_ENDED: 0,
    ELECTION_COMMITTEE_FORMED_IN_PREVIOUS_ASSEMBLY: 0,
    ELECTION_COMMITTEE_HAS_TWO_NONCANDIDATE_MEMBERS: 0,
    BOARD_INVITED_ELIGIBLE_CANDIDATES_WITHIN_TIMEFRAME: 0,
    NOMINATIONS_CLOSED_AND_SUBMITTED_TO_CENTER_ON_TIME: 0,
    CANDIDATE_LIST_DISPLAYED_FIFTEEN_DAYS_BEFORE_TERM_END: 0,
    NEW_BOARD_MEMBERS_SUBMITTED_TO_CENTER_WITHIN_FIFTEEN_DAYS: 0,
    HAS_LOCAL_BRANCHES_AND_OFFICES: 0,
    BRANCHES_APPROVED_BY_CENTER_AND_SUPERVISOR: 0,
    HAS_CERTIFIED_EXTERNAL_AUDITOR: 0,
    HAS_DETAILED_ANNUAL_FINANCIAL_REPORT_APPROVED: 0,
    TERRORISM_FINANCING_RISKS_IDENTIFIED_AND_UNDERSTOOD: 0,
    USES_CASH_TRANSACTIONS_FOR_DONATIONS: 0,
    HAS_MONEY_LAUNDERING_SUSPICION_PROCEDURES: 0,
    HAS_TERRORISM_FINANCING_AWARENESS_PROGRAMS: 0,
    REGISTRATION_CERTIFICATE_VALID: 0,
    ACTIVITIES_MATCH_CLASSIFICATION: 0,
    PROGRAM_ACTIVITIES_APPROVED_BY_SUPERVISORY_UNIT: 0,
    HAS_UNAUTHORIZED_ACTIVITIES_OUTSIDE_BYLAWS: 0,
    HAS_SERVICE_DELIVERY_TRACKING_DOCUMENTATION: 0,
    HAS_ACTIVITIES_OUTSIDE_ADMINISTRATIVE_SCOPE: 0,
    HAS_CENTER_APPROVAL_4: 0,
    HAS_INTERNATIONAL_PARTNERSHIPS_OR_AGREEMENTS: 0,
    HAS_APPROVAL_FOR_INTERNATIONAL_AGREEMENTS: 0,
    CONDUCTS_FUNDRAISING_CAMPAIGNS: 0,
    HAS_FUNDRAISING_APPROVAL_FROM_CENTER: 0,
    HAS_SEPARATE_DONATIONS_ACCOUNT: 0,
    HAS_DONATIONS_REGISTRY: 0,
    DONATION_REGISTRY_INCLUDES_REQUIRED_DETAILS: 0,
    DONATIONS_USED_FOR_UNINTENDED_PURPOSE: 0,
    HAS_CENTER_APPROVAL_FOR_DONATION_REPURPOSE: 0,
    SURPLUS_INVESTED_IN_ENDOWMENTS_OR_PROJECTS: 0,
    SURPLUS_INVESTMENT_APPROVED_BY_ASSEMBLY: 0,
    RECEIVED_UNSOLICITED_FOREIGN_AID: 0,
    NOTIFIED_CENTER_OF_FOREIGN_AID: 0,
    HAS_PROPERTY_OR_INVESTMENTS: 0,
    PROPERTY_ACQUISITION_PROPERLY_APPROVED: 0,
    BENEFICIARY_RECORDS_SECURELY_MAINTAINED: 0,
    HAS_UPDATED_ASSEMBLY_MEETINGS_REGISTRY: 0,
    BOARD_MEETING_RECORDS_MAINTAINED: 0,
    MEMBERS_HAVE_MEMBERSHIP_CARDS: 0,
    ALL_MEMBERS_RECEIVED_MEMBERSHIP_CARDS: 0,
    HAS_PERMANENT_OR_TEMPORARY_COMMITTEES_WITH_SPECIFIC_TASKS: 0,
    COMMITTEES_FORMATION_DECISIONS_EXIST: 0,
    COMMITTEE_DECISIONS_INCLUDE_COMPLETE_DETAILS: 0,
    BOARD_MEMBERS_PRESENT_IN_COMMITTEES: 0,
    HAS_EXECUTIVE_COMMITTEE: 0,
    EXECUTIVE_COMMITTEE_FORMED_WITH_DEFINED_AUTHORITIES: 0,
    HAS_INTERNAL_AUDIT_COMMITTEE: 0,
    FINANCIAL_SUPERVISOR_CHAIRS_AUDIT_COMMITTEE: 0,
  },
};



export type OPERATIONALEntriesType = {
  NO_PROGRAMS_EXECUTED: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  NO_PROGRAMS_PLANNED: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_BUDGET: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  TOTAL_PERIOD_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  NO_ACTUAL_BENEFICIARIES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  PLANNED_TARGET_NUMBER: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  NO_PROGRAMS_WITH_PARTICIPANTS: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  NO_PROGRAMS_PROJECTS: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  NO_VOLUNTEERS_CURRENT_QUARTER: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  NO_VOLUNTEERS_NEXT_QUARTER: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  NO_VOLUNTEERS_CONT_3: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  TOTAL_VOLUNTEERS: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  DISBURSED_AMOUNTS_QUARTERLY: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  ACTIVITY_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  SERVICE_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  SALARY_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  MISCELLANEOUS_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  MARKETING_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  OTHER_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_AMOUNTS_QUARTERLY: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_ACTIVITY_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_SERVICE_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_SALARY_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_MISCELLANEOUS_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_MARKETING_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
  APPROVED_OTHER_EXPENSES: {
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
  };
};

type FinancialEntriesType = {
  key: "ROOT";
  value: null;
  children: {
    TOTAL_SUSTAINABILITY_ASSETS: {
      value: number | null;
      key: string;
      isExpanded?: boolean;
      isParent?: boolean;
      totalChildren?: number;
      completedChildren?: number;
      children: {
        TRADED_INVESTMENTS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        UNTRADED_INVESTMENTS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        AWQAF_INVESTMENTS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        AWQAF_FIXED_ASSETS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
      };
    };
    CASHE_RELATED: {
      value: number | null;
      key: string;
      isExpanded?: boolean;
      isParent?: boolean;
      totalChildren?: number;
      completedChildren?: number;
    };
    CURRENT_LIABILITIES: {
      value: number | null;
      key: string;
      isExpanded?: boolean;
      isParent?: boolean;
      totalChildren?: number;
      completedChildren?: number;
    };
    TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH: {
      value: number | null;
      key: string;
      isExpanded?: boolean;
      isParent?: boolean;
      totalChildren?: number;
      completedChildren?: number;
      children: {
        LIMITED_NET_ASSETS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        AWQAF_NET_ASSETS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
      };
    };
    TOTAL_EXPENSES: {
      value: number | null;
      key: string;
      isExpanded?: boolean;
      isParent?: boolean;
      totalChildren?: number;
      completedChildren?: number;
      children: {
        TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
          children: {
            GENERAL_ADMINSTRATIVE_EXPENSES: {
              value: number | null;
              key: string;
              isExpanded?: boolean;
              isParent?: boolean;
              totalChildren?: number;
              completedChildren?: number;
            };
            GOVERENCE_EXPENSES: {
              value: number | null;
              key: string;
              isExpanded?: boolean;
              isParent?: boolean;
              totalChildren?: number;
              completedChildren?: number;
            };
          };
        };
        TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
          children: {
            PROGRAMS_EXPENSES: {
              value: number | null;
              key: string;
              isExpanded?: boolean;
              isParent?: boolean;
              totalChildren?: number;
              completedChildren?: number;
            };
            ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY: {
              value: number | null;
              key: string;
              isExpanded?: boolean;
              isParent?: boolean;
              totalChildren?: number;
              completedChildren?: number;
            };
          };
        };
        TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
          children: {
            AWQAF_DIST_EXPENSES: {
              value: number | null;
              key: string;
              isExpanded?: boolean;
              isParent?: boolean;
              totalChildren?: number;
              completedChildren?: number;
            };
            INVESTMENT_EXPENSES: {
              value: number | null;
              key: string;
              isExpanded?: boolean;
              isParent?: boolean;
              totalChildren?: number;
              completedChildren?: number;
            };
          };
        };
        FUND_RAISING_EXPENSES: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
      };
    };
    TOTAL_SUSTAINABILITY_RETURNS: {
      value: number | null;
      key: string;
      isExpanded?: boolean;
      isParent?: boolean;
      totalChildren?: number;
      completedChildren?: number;
      children: {
        UNRESTRICTED_REVENUE: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        RESTRICTED_REVENUE: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        AWQAF_QUARTER_REVENUE: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        PROFIT_AWQAF_INVESTMENTS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
      };
    };
    TOTAL_DONATIONS: {
      value: number | null;
      key: string;
      isExpanded?: boolean;
      isParent?: boolean;
      totalChildren?: number;
      completedChildren?: number;
      children: {
        ZAKAT: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        RESTRICTED_CASH_DONATIONS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        RESTRICTED_IN_KIND_DONATIONS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        GOVERNMENT_GRANT_DONATIONS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        UNRESTRICTED_CASH_DONATIONS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        UNRESTRICTED_IN_KIND_DONATIONS: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        DONATION_BY_LIABILITY_REDUCTION: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
      };
    };
    IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES: {
      value: number | null;
      key: string;
      isExpanded?: boolean;
      isParent?: boolean;
      totalChildren?: number;
      completedChildren?: number;
      children: {
        TOTAL_TAX_REFUND: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
        PROGRAM_AND_ACTIVITY_REVENUES: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
          children: {
            RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES: {
              value: number | null;
              key: string;
              isExpanded?: boolean;
              isParent?: boolean;
              totalChildren?: number;
              completedChildren?: number;
            };
          };
        };
        GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL: {
          value: number | null;
          key: string;
          isExpanded?: boolean;
          isParent?: boolean;
          totalChildren?: number;
          completedChildren?: number;
        };
      };
    };
  };
};
