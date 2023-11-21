const ApiError = require("../exceptions/api-error");
const { validateAccessToken } = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) next(ApiError.UnAuthError());

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) next(ApiError.UnAuthError());

    const userData = validateAccessToken(accessToken);
    if (!userData) next(ApiError.UnAuthError());

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnAuthError());
  }
};
