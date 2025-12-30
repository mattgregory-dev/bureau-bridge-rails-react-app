class ApplicationController < ActionController::API
  include ActionController::Cookies

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def require_auth!
    return if current_user
    render json: { error: "unauthorized" }, status: :unauthorized and return
  end

  def require_role!(*roles)
    require_auth!
    allowed = roles.map(&:to_s)
    return if allowed.include?(current_user.role)

    render json: { error: "forbidden" }, status: :forbidden and return
  end

end
