const validators = (obj) => {
  const missingFields = Object.entries(obj)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  return {
    isValid: missingFields.length === 0,
    missingFields: missingFields,
  };
};

module.exports = validators;
