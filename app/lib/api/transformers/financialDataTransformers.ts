import type { FinancialDashboardEntriesType } from "../dashboard";

export type FinancialNode = {
    key: string;
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
    children?: Record<string, FinancialNode>;
  }


export function transformFinancialEntries(
    entries: FinancialDashboardEntriesType[]
  ): FinancialNode[] {
    if (!entries || entries.length === 0) {
      return [];
    }
  
    return entries.map(entry => {
      const sustainabilityAssets = createParentNode("TOTAL_SUSTAINABILITY_ASSETS", entry.TOTAL_SUSTAINABILITY_ASSETS, {
        TRADED_INVESTMENTS: createNode("TRADED_INVESTMENTS", entry.TRADED_INVESTMENTS),
        UNTRADED_INVESTMENTS: createNode("UNTRADED_INVESTMENTS", entry.UNTRADED_INVESTMENTS),
        AWQAF_INVESTMENTS: createNode("AWQAF_INVESTMENTS", entry.AWQAF_INVESTMENTS),
        AWQAF_FIXED_ASSETS: createNode("AWQAF_FIXED_ASSETS", entry.AWQAF_FIXED_ASSETS)
      });
      
      const netRestrictedAssets = createParentNode("TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH", 
        entry.TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH, {
          LIMITED_NET_ASSETS: createNode("LIMITED_NET_ASSETS", entry.LIMITED_NET_ASSETS),
          AWQAF_NET_ASSETS: createNode("AWQAF_NET_ASSETS", entry.AWQAF_NET_ASSETS)
      });
      
      const administrativeExpenses = createParentNode("TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES", 
        entry.TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES, {
          GENERAL_ADMINSTRATIVE_EXPENSES: createNode("GENERAL_ADMINSTRATIVE_EXPENSES", entry.GENERAL_ADMINSTRATIVE_EXPENSES),
          GOVERENCE_EXPENSES: createNode("GOVERENCE_EXPENSES", entry.GOVERENCE_EXPENSES)
      });
      
      const programExpenses = createParentNode("TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES",
        entry.TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES, {
          PROGRAMS_EXPENSES: createNode("PROGRAMS_EXPENSES", entry.PROGRAMS_EXPENSES),
          ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY: createNode("ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY", 
            entry.ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY)
      });
      
      const sustainabilityExpenses = createParentNode("TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES",
        entry.TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES, {
          AWQAF_DIST_EXPENSES: createNode("AWQAF_DIST_EXPENSES", entry.AWQAF_DIST_EXPENSES),
          INVESTMENT_EXPENSES: createNode("INVESTMENT_EXPENSES", entry.INVESTMENT_EXPENSES)
      });
      
      const totalExpenses = createParentNode("TOTAL_EXPENSES", entry.TOTAL_EXPENSES, {
        TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES: administrativeExpenses,
        TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES: programExpenses,
        TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES: sustainabilityExpenses,
        FUND_RAISING_EXPENSES: createNode("FUND_RAISING_EXPENSES", entry.FUND_RAISING_EXPENSES)
      });
      
      const sustainabilityReturns = createParentNode("TOTAL_SUSTAINABILITY_RETURNS", entry.TOTAL_SUSTAINABILITY_RETURNS, {
        UNRESTRICTED_REVENUE: createNode("UNRESTRICTED_REVENUE", entry.UNRESTRICTED_REVENUE),
        RESTRICTED_REVENUE: createNode("RESTRICTED_REVENUE", entry.RESTRICTED_REVENUE),
        AWQAF_QUARTER_REVENUE: createNode("AWQAF_QUARTER_REVENUE", entry.AWQAF_QUARTER_REVENUE),
        PROFIT_AWQAF_INVESTMENTS: createNode("PROFIT_AWQAF_INVESTMENTS", entry.PROFIT_AWQAF_INVESTMENTS)
      });
      
      const totalDonations = createParentNode("TOTAL_DONATIONS", entry.TOTAL_DONATIONS, {
        ZAKAT: createNode("ZAKAT", entry.ZAKAT),
        RESTRICTED_CASH_DONATIONS: createNode("RESTRICTED_CASH_DONATIONS", entry.RESTRICTED_CASH_DONATIONS),
        RESTRICTED_IN_KIND_DONATIONS: createNode("RESTRICTED_IN_KIND_DONATIONS", entry.RESTRICTED_IN_KIND_DONATIONS),
        RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: createNode("RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES", 
          entry.RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES),
        GOVERNMENT_GRANT_DONATIONS: createNode("GOVERNMENT_GRANT_DONATIONS", entry.GOVERNMENT_GRANT_DONATIONS),
        UNRESTRICTED_CASH_DONATIONS: createNode("UNRESTRICTED_CASH_DONATIONS", entry.UNRESTRICTED_CASH_DONATIONS),
        UNRESTRICTED_IN_KIND_DONATIONS: createNode("UNRESTRICTED_IN_KIND_DONATIONS", entry.UNRESTRICTED_IN_KIND_DONATIONS),
        UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: createNode("UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES", 
          entry.UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES),
        DONATION_BY_LIABILITY_REDUCTION: createNode("DONATION_BY_LIABILITY_REDUCTION", entry.DONATION_BY_LIABILITY_REDUCTION)
      });
      
      const programActivityRevenues = createParentNode("PROGRAM_AND_ACTIVITY_REVENUES", entry.PROGRAM_AND_ACTIVITY_REVENUES, {
        RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES: createNode("RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES", 
          entry.RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES)
      });
      
      const importantValues = createParentNode("IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES", 
        entry.IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES, {
          TOTAL_TAX_REFUND: createNode("TOTAL_TAX_REFUND", entry.TOTAL_TAX_REFUND),
          PROGRAM_AND_ACTIVITY_REVENUES: programActivityRevenues,
          GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL: createNode("GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL", 
            entry.GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL)
      });
      
      // root node with all sections
      return {
        key: "ROOT",
        value: null,
        children: {
          TOTAL_SUSTAINABILITY_ASSETS: sustainabilityAssets,
          CASHE_RELATED: createNode("CASHE_RELATED", entry.CASHE_RELATED),
          CURRENT_LIABILITIES: createNode("CURRENT_LIABILITIES", entry.CURRENT_LIABILITIES),
          TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH: netRestrictedAssets,
          TOTAL_EXPENSES: totalExpenses,
          TOTAL_SUSTAINABILITY_RETURNS: sustainabilityReturns,
          TOTAL_DONATIONS: totalDonations,
          IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES: importantValues
        }
      };
    });
  }
  
  
   // helper function to create a leaf node
   
  function createNode(key: string, value: number | null): FinancialNode {
    return {
      key,
      value,
      isParent: false
    };
  }
  
  
   // helper function to create a parent node with children as an object
  function createParentNode(
    key: string, 
    value: number | null, 
    children: Record<string, FinancialNode>
  ): FinancialNode {
    const childrenValues = Object.values(children);
    const completedChildrenCount = childrenValues.filter(child => 
      child.value !== null && child.value !== undefined
    ).length;
    
    return {
      key,
      value,
      isParent: true,
      isExpanded: false,
      totalChildren: childrenValues.length,
      completedChildren: completedChildrenCount,
      children
    };
  }