import { HTTP_STATUS } from "@/constants/http-status";

export const successResponse = ({
  res,
  data,
  message,
  status = HTTP_STATUS.OK,
}) => {
  const response = {
    success: true
  };

  if (message) response.message = message;

  if (data && typeof data === 'object') {
    Object.assign(response, data);
  } else if (data !== undefined) {
    response.value = data;
  }

  return res.status(status).json(response);
};

export const errorResponse = ({
  res,
  message,
  error,
  status = HTTP_STATUS.INTERNAL_SERVER_ERROR,
}) => {
  const response = {
    success: false,
    message: message || 'An error occurred'
  };

  if (error) {
    response.error = error;
  }

  return res.status(status).json(response);
};
