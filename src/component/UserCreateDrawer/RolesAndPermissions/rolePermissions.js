export const rolePermissions = {
  Manager: {
    dashboardSubs: { goalAchievement: true },
    masterReport: true,
  },
  Customer: {
    dashboardSubs: { goalAchievement: true, masterReportOverview: true },
    masterReport: true,
  },
  Employee: {
    dashboard: true,
    dashboardSubs: {
      leadsOverTime: true,
      goalAchievement: true,
      masterReportOverview: true,
    },
    masterReport: true,
  },
  "Growth Specialist": {
    masterReport: true,
  },
  "Department Manager": {
    dashboard: true,
    dashboardSubs: {
      leadsOverTime: true,
      goalAchievement: true,
      masterReportOverview: true,
    },
  },
  Admin: {
    selectAll: true,
    dashboard: true,
    dashboardSubs: {
      leadsOverTime: true,
      goalAchievement: true,
      masterReportOverview: true,
    },
    admin: true,
    adminSubs: { users: true, roles: true, rowLevelSettings: true },
    amberAlerts: true,
    masterReport: true,
  },
};
