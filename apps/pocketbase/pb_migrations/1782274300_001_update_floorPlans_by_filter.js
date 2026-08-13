/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  let records;
  try {
    records = app.findRecordsByFilter("floorPlans", "title='3-Bedroom Residence'");
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("No records found, skipping");
      return;
    }
    throw e;
  }
  
  for (const record of records) {
    record.set("description", "BED 1: 2.76 x 3.18m, BED 2: 2.76 x 2.8m, BATH: 2.76 x 2.4m, MEALS: 2.8 x 2.4m, KITCHEN: 3.6 x 2.6m, STUDY: 3.13 x 2.78m, LOUNGE: 3.9 x 5.6m, VERANDAH. Overall dimensions: 13.9m x 12.1m (approximately 168 m\u00b2)");
    try {
      app.save(record);
    } catch (e) {
      if (e.message.includes("Value must be unique")) {
        console.log("Record with unique value already exists, skipping");
      } else {
        throw e;
      }
    }
  }
}, (app) => {
  // Rollback: original values not stored, manual restore needed
})