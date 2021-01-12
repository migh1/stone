const genericError = 'generic error';
const isMissing = (param) => `${param} is missing`;
const alreadyExists = (param) => `${param} already exists`;
const notFound = (param) => `${param} not found`;
const validationError = (param, values) => {
  const condition = values
    ? `field ${param} must be a valid ${param}: ${values.join(', ')}`
    : `field ${param} must be a valid ${param}`;
  return condition;
};

export default {
  genericError,
  isMissing,
  alreadyExists,
  notFound,
  validationError,
};
