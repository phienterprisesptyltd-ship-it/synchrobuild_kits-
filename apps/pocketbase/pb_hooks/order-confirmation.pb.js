/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const customerName = e.record.get("customerName");
  const customerEmail = e.record.get("email");
  const phone = e.record.get("phone");
  const bedrooms = e.record.get("bedrooms");
  const bathrooms = e.record.get("bathrooms");
  const totalPrice = e.record.get("totalPrice");
  const orderNotes = e.record.get("orderNotes") || "No additional notes";
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "sales@synchrobuild.com.au" }],
    subject: "New Order Received - " + customerName,
    html: "<h2>New Order Submission</h2>" +
          "<p><strong>Order ID:</strong> " + e.record.id + "</p>" +
          "<h3>Customer Details</h3>" +
          "<p><strong>Name:</strong> " + customerName + "</p>" +
          "<p><strong>Email:</strong> " + customerEmail + "</p>" +
          "<p><strong>Phone:</strong> " + phone + "</p>" +
          "<h3>Order Summary</h3>" +
          "<p><strong>Bedrooms:</strong> " + bedrooms + "</p>" +
          "<p><strong>Bathrooms:</strong> " + bathrooms + "</p>" +
          "<p><strong>Total Price:</strong> $" + totalPrice + "</p>" +
          "<p><strong>Additional Notes:</strong> " + orderNotes + "</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "orders");