/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("floorPlans");

  const record0 = new Record(collection);
    record0.set("title", "Modern 1 Bed Apartment");
    record0.set("description", "Modern 1 bedroom apartment floor plan with open-plan living/meals area, kitchen, bathroom, bedroom with robe/wardrobe. Total dimensions approximately 7430 x 3400mm.");
    record0.set("image", "https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/d7591b861b47bd37a5042526e50bfb3b.png");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("title", "Industrial Warehouse with Multiple Bays");
    record1.set("description", "Industrial warehouse floor plan with 6 large bays (3 left, 3 right), kitchen, bathroom, mezzanine level above, multiple roller doors (3500x2100, 5000x2700), swing doors (820x2040), bifold door (3200x2100), louvre windows, and siding windows. Approximately 4550 x 9100mm total dimensions.");
    record1.set("image", "https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/525bbd9453eb9b7eac6381e80c8422f2.png");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})