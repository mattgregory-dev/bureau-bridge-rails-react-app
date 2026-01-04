class ApplicationController < ActionController::API
  include ActionController::Cookies

  private

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = User.find_by(id: session[:user_id])
  end

  def require_auth!
    unless current_user
      render json: { error: "unauthorized" }, status: :unauthorized
      return
    end
  end

  def require_role!(*roles)
    require_auth!
    return unless current_user

    allowed = roles.map(&:to_s)
    return if allowed.include?(current_user.role)

    render json: { error: "forbidden" }, status: :forbidden
  end
end
