export const failAction = (error, statusCode) => {
  return { statusCode, data: null, error };
};

export const successAction = (data, message, statusCode) => {
  return { statusCode, data, message };
};
