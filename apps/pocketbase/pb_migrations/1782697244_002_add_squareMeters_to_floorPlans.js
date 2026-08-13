/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("floorPlans");

  const existing = collection.fields.getByName("squareMeters");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("squareMeters"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "squareMeters",
    required: false,
    min: 0
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("floorPlans");
    collection.fields.removeByName("squareMeters");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})