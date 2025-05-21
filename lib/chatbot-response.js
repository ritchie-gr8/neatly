const getBotResponseForTopic = (topic) => {
  switch (topic.trim().toLowerCase()) {
    case "room types":
      return "We offer Deluxe, Suite, and Executive rooms to suit your needs. Would you like more details about a specific room type?";
    case "booking":
      return "You can book directly through our website or contact our reservation team. We offer flexible booking options and special rates for extended stays.";
    case "check-in & check-out time":
      return "Our check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in and late check-out may be available upon request.";
    case "payment":
      return "We accept all major credit cards, debit cards, and digital payment methods. Full payment is required at check-in.";
    case "promotion":
      return "We currently have a special weekend package and seasonal promotions. Book directly for the best rates guaranteed!";
    default:
      return null;
  }
};

export default getBotResponseForTopic;
