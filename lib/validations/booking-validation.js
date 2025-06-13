// lib/validations/booking-validation.js

// Individual field validation functions for real-time validation
export const validateField = (fieldName, value, allData = {}) => {
  switch (fieldName) {
    case 'firstName':
      if (!value) return "First name is required";
      if (value.length < 2) return "First name must be at least 2 characters";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "First name can only contain letters and spaces";
      return "";

    case 'lastName':
      if (!value) return "Last name is required";
      if (value.length < 2) return "Last name must be at least 2 characters";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Last name can only contain letters and spaces";
      return "";

    case 'email':
      if (!value) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      return "";

    case 'phone':
      if (!value) return "Phone number is required";
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 9) return "Phone number must be at least 9 digits";
      if (digitsOnly.length > 15) return "Phone number cannot exceed 15 digits";
      return "";

    case 'dateOfBirth':
      if (!value) return "Date of birth is required";
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      let calculatedAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      if (calculatedAge < 18) return "You must be at least 18 years old";
      if (calculatedAge > 120) return "Please enter a valid date of birth";
      return "";

    case 'country':
      if (!value) return "Country is required";
      return "";

    case 'additionalRequest':
      if (value && value.length > 500) return "Additional request cannot exceed 500 characters";
      return "";

    case 'cardNumber':
      if (!value) return "Card number is required";
      const cardNumberClean = value.replace(/\s/g, '');
      if (!/^\d{13,19}$/.test(cardNumberClean)) return "Card number must be 13-19 digits";
      return "";

    case 'cardOwner':
      if (!value) return "Card owner name is required";
      if (value.length < 2) return "Card owner name must be at least 2 characters";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Card owner name can only contain letters and spaces";
      return "";

    case 'expiryDate':
      if (!value) return "Expiry date is required";
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryRegex.test(value)) return "Expiry date must be in MM/YY format";

      const [month, year] = value.split('/');
      const currentDate = new Date();
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);

      if (expiryDate < currentDate) return "Card has expired";
      return "";

    case 'cvc':
      if (!value) return "CVC is required";
      if (!/^\d{3}$/.test(value)) return "CVC must be 3 digits";
      return "";

    default:
      return "";
  }
};

export const validateBasicInfo = (basicInfo) => {
  const errors = {};

  // First Name validation
  if (!basicInfo.firstName) {
    errors.firstName = "First name is required";
  } else if (basicInfo.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  } else if (!/^[a-zA-Z\s]+$/.test(basicInfo.firstName)) {
    errors.firstName = "First name can only contain letters and spaces";
  }

  // Last Name validation
  if (!basicInfo.lastName) {
    errors.lastName = "Last name is required";
  } else if (basicInfo.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  } else if (!/^[a-zA-Z\s]+$/.test(basicInfo.lastName)) {
    errors.lastName = "Last name can only contain letters and spaces";
  }

  // Email validation
  if (!basicInfo.email) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(basicInfo.email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  // Phone validation
  if (!basicInfo.phone) {
    errors.phone = "Phone number is required";
  } else {
    // Remove all non-digits to check length
    const digitsOnly = basicInfo.phone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      errors.phone = "Phone number must be at least 9 digits";
    } else if (digitsOnly.length > 15) {
      errors.phone = "Phone number cannot exceed 15 digits";
    }
  }

  // Date of Birth validation
  if (!basicInfo.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  } else {
    const today = new Date();
    const birthDate = new Date(basicInfo.dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      errors.dateOfBirth = "You must be at least 18 years old";
    } else if (age > 120) {
      errors.dateOfBirth = "Please enter a valid date of birth";
    }
  }

  // Country validation
  if (!basicInfo.country) {
    errors.country = "Country is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSpecialRequests = (specialRequests) => {
  const errors = {};

  // Additional request validation (optional field, but if provided should be reasonable)
  if (specialRequests.additionalRequest && specialRequests.additionalRequest.length > 500) {
    errors.additionalRequest = "Additional request cannot exceed 500 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePaymentMethod = (paymentMethod) => {
  const errors = {};

  if (!paymentMethod.type) {
    errors.type = "Payment method is required";
  }

  // Credit card validation
  if (paymentMethod.type === "credit") {
    const { creditCard } = paymentMethod;

    // Card number validation
    if (!creditCard.cardNumber) {
      errors.cardNumber = "Card number is required";
    } else {
      const cardNumberClean = creditCard.cardNumber.replace(/\s/g, '');
      if (!/^\d{13,19}$/.test(cardNumberClean)) {
        errors.cardNumber = "Card number must be 13-19 digits";
      }
    }

    // Card owner validation
    if (!creditCard.cardOwner) {
      errors.cardOwner = "Card owner name is required";
    } else if (creditCard.cardOwner.length < 2) {
      errors.cardOwner = "Card owner name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(creditCard.cardOwner)) {
      errors.cardOwner = "Card owner name can only contain letters and spaces";
    }

    // Expiry date validation
    if (!creditCard.expiryDate) {
      errors.expiryDate = "Expiry date is required";
    } else {
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryRegex.test(creditCard.expiryDate)) {
        errors.expiryDate = "Expiry date must be in MM/YY format";
      } else {
        const [month, year] = creditCard.expiryDate.split('/');
        const currentDate = new Date();
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);

        if (expiryDate < currentDate) {
          errors.expiryDate = "Card has expired";
        }
      }
    }

    // CVC validation
    if (!creditCard.cvc) {
      errors.cvc = "CVC is required";
    } else if (!/^\d{3}$/.test(creditCard.cvc)) {
      errors.cvc = "CVC must be 3 digits";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Complete booking validation
export const validateCompleteBooking = (bookingData) => {
  const basicInfoValidation = validateBasicInfo(bookingData.basicInfo);
  const specialRequestsValidation = validateSpecialRequests(bookingData.specialRequests);
  const paymentMethodValidation = validatePaymentMethod(bookingData.paymentMethod);

  return {
    isValid: basicInfoValidation.isValid && specialRequestsValidation.isValid && paymentMethodValidation.isValid,
    errors: {
      basicInfo: basicInfoValidation.errors,
      specialRequests: specialRequestsValidation.errors,
      paymentMethod: paymentMethodValidation.errors
    }
  };
};
