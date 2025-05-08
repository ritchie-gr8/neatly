export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  return res.status(200).json({
    message: "create lawe",
  });
}