/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("floorPlans");

  const record0 = new Record(collection);
    record0.id = "d3cxogiounyvuwx";
    record0.set("title", "Modern Elevated Home with Verandah");
    record0.set("description", "Contemporary elevated design featuring timber verandah, modern finishes, and open plan living. 2 bedrooms, 1 bathroom with study area. Perfect for those seeking a modern, elevated lifestyle with premium finishes and outdoor entertaining spaces.");
    record0.set("image", "https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/0f9fd5b2da073f8ada3965e39f743310.png");
    record0.set("squareMeters", 120);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  const seededRecordIds = ["d3cxogiounyvuwx"];
  for (const seededRecordId of seededRecordIds) {
    try {
      app.delete(app.findRecordById("floorPlans", seededRecordId));
    } catch (error) {
      if (error.message.includes("no rows in result set")) {
        continue;
      }
      throw error;
    }
  }
})