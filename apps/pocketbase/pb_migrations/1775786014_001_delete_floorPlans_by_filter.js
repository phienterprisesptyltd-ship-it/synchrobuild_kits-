/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const records = app.findRecordsByFilter("floorPlans", "title != 'Single Bedroom Residential Unit' && title != 'Multi-Bay Industrial Facility'");
  for (const record of records) {
    app.delete(record);
  }
}, (app) => {
  // Rollback: record data not stored, manual restore needed
})