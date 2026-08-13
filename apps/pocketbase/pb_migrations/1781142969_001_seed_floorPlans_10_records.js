/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("floorPlans");

  const record0 = new Record(collection);
    record0.set("title", "4-Bedroom Family Home");
    record0.set("description", "Verandah, Timber decking, 4 Beds, 2 Baths, 1250 Sq Ft");
    record0.set("image", "https://via.placeholder.com/400x300?text=4-Bedroom+Family+Home");
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
    record1.set("title", "3-Bedroom Residence");
    record1.set("description", "Master bedroom, Guest bedrooms, 3 Beds, 2 Baths, 1400 Sq Ft");
    record1.set("image", "https://via.placeholder.com/400x300?text=3-Bedroom+Residence");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("title", "Compact Studio");
    record2.set("description", "Kitchenette, Living area, 1 Bed, 1 Bath, 450 Sq Ft");
    record2.set("image", "https://via.placeholder.com/400x300?text=Compact+Studio");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("title", "2-Bedroom with Study");
    record3.set("description", "Lounge, Study, 2 Beds, 1 Bath, 980 Sq Ft");
    record3.set("image", "https://via.placeholder.com/400x300?text=2-Bedroom+with+Study");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("title", "Wellness Spa Facility");
    record4.set("description", "Treatment rooms, Waiting area, 0 Beds, 2 Baths, 1800 Sq Ft");
    record4.set("image", "https://via.placeholder.com/400x300?text=Wellness+Spa+Facility");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("title", "Professional Studio Clinic");
    record5.set("description", "Study, Dining, 2 Beds, 1 Bath, 1050 Sq Ft");
    record5.set("image", "https://via.placeholder.com/400x300?text=Professional+Studio+Clinic");
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("title", "2-Bedroom Courtyard Home");
    record6.set("description", "Courtyard, Ensuite, 2 Beds, 2 Baths, 1150 Sq Ft");
    record6.set("image", "https://via.placeholder.com/400x300?text=2-Bedroom+Courtyard+Home");
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("title", "3-Bedroom Family Home");
    record7.set("description", "Lounge, Dining, 3 Beds, 2 Baths, 1350 Sq Ft");
    record7.set("image", "https://via.placeholder.com/400x300?text=3-Bedroom+Family+Home");
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record8 = new Record(collection);
    record8.set("title", "Family Home");
    record8.set("description", "Office, Storage areas, 0 Beds, 1 Bath, 900 Sq Ft");
    record8.set("image", "https://via.placeholder.com/400x300?text=Family+Home");
  try {
    app.save(record8);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record9 = new Record(collection);
    record9.set("title", "3-Bedroom Modern Home");
    record9.set("description", "Lounge, Dining, 3 Beds, 2 Baths, 1380 Sq Ft");
    record9.set("image", "https://via.placeholder.com/400x300?text=3-Bedroom+Modern+Home");
  try {
    app.save(record9);
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