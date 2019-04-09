class Api::V01::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, :require_login, only: [:new, :create, :destroy]
  def new
  end

  def create
    user = User.find_by email: params[:session][:email]
    if user && user.authenticate(params[:session][:password])
      log_in user
      current_user
      render json: {status: 'Login Success'}
    else
      render json: {status: status, errors: 'Not Login'}
    end
  end

  def destroy
    log_out
    render json: {status: status, message: 'Logout success'}
  end
end
