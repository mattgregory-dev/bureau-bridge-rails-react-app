# /src/api/app/controllers/api/auth_controller.rb
class Api::AuthController < ApplicationController

  def signup
    user = User.new(signup_params)

    if user.save
      token = user.generate_email_verification!
      UserMailer.email_verification(user, token).deliver_now

      render json: { ok: true }, status: :created
    else
      render json: {
        ok: false,
        errors: user.errors.to_hash(true),
        messages: user.errors.full_messages,
      }, status: :unprocessable_entity
    end
  end

  # POST /api/login
  def login
    user = User.find_by("lower(email) = ?", params[:email].to_s.strip.downcase)

    unless user&.authenticate(params[:password].to_s)
      render json: { error: "invalid email or password" }, status: :unauthorized
      return
    end

    # BLOCK UNVERIFIED USERS HERE
    unless user.email_verified?
      render json: { error: "email_not_verified" }, status: :forbidden
      return
    end

    # ONLY VERIFIED USERS GET A SESSION
    session[:user_id] = user.id
    render json: { ok: true }
  end

  # POST /api/logout
  def logout
    reset_session
    render json: { ok: true }
  end

  # GET /api/me
  def me
    return render json: { error: "unauthorized" }, status: :unauthorized unless current_user
    render json: { id: current_user.id, email: current_user.email, role: current_user.role }
  end

  private

  def signup_params
  base = params[:auth].presence || params
  base.permit(:email, :password, :password_confirmation)
  end
end
