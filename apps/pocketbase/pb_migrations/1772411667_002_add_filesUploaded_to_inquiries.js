/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("inquiries");

  const existing = collection.fields.getByName("filesUploaded");
  if (existing) {
    if (existing.type === "file") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("filesUploaded"); // exists with wrong type, remove first
  }

  collection.fields.add(new FileField({
    name: "filesUploaded",
    required: false,
    maxSelect: 3,
    maxSize: 10485760
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("inquiries");
  collection.fields.removeByName("filesUploaded");
  return app.save(collection);
})