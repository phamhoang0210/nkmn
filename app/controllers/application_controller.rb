class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def authorize record
     require_login
  end

  before_action :require_login
  def require_login
    unless require_login?
      render json: {status:'You not loggin!'}
    end
  end

  #login
  def log_in user
    session[:user_id] = user.id
  end
  #logout
  def log_out
    session.delete :user_id
  end

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_login?
    current_user.present?
  end
end
