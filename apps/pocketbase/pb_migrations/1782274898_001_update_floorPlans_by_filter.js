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
    record.set("description", "Modern residential floor plan with master bedroom, guest bedrooms, lounge, dining, kitchen, and outdoor verandah with landscape path.\n\nRoom Dimensions:\n- BED 1: 2.76 x 3.18m\n- BED 2: 2.76 x 2.8m\n- BATH: 2.76 x 2.4m\n- MEALS: 2.8 x 2.4m\n- KITCHEN: 3.6 x 2.6m\n- STUDY: 3.13 x 2.78m\n- LOUNGE: 3.9 x 5.6m\n- VERANDAH\n- Total Area: 115 m\u00b2 (including verandah) / 76 m\u00b2 (excluding verandah)");
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