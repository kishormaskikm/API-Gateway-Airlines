const { UserService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const AppError = require('../utils/errors/app-error');

const { error } = require("../utils/common/error-response");

async function signUp(req, res) {
    try {
      const user = await UserService.signUp({
        email: req.body.email,
        password : req.body.password
      });
  
      SuccessResponse.data = user;
      
  
      return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }

  async function signin(req, res) {
    try {
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

  

  module.exports = {
    signUp,
    signin
  }