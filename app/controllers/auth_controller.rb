class AuthController < ApplicationController
  # POST /api/signup
  def signup
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id
      render json: { ok: true, user: { id: user.id, email: user.email } }, status: :created
    else
      render json: { ok: false, errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/login
  def login
    user = User.find_by(email: params[:email].to_s.strip.downcase)

    if user&.authenticate(params[:password].to_s)
      session[:user_id] = user.id
      render json: { ok: true, user: { id: user.id, email: user.email } }
    else
      render json: { ok: false, error: "Invalid email or password" }, status: :unauthorized
    end
  end

  # POST /api/logout
  def logout
    reset_session
    render json: { ok: true }
  end

  # GET /api/me
  def me
    require_auth!
    render json: { ok: true, user: { id: current_user.id, email: current_user.email } }
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end
