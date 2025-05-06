import { HTTP_STATUS } from "@/constants/http-status";

export const successResponse = ({
  res,
  data,
  message,
  status = HTTP_STATUS.OK,
}) => {
  const response = {};

  if (message) response.message = message;
  if (data) response.data = data;

  return res.status(status).json(response);
};

export const errorResponse = ({
  res,
  message,
  status = HTTP_STATUS.INTERNAL_SERVER_ERROR,
}) => {
  return res.status(status).json({
    message: message,
  });
};
