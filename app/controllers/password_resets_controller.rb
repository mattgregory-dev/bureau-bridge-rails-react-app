class PasswordResetsController < ApplicationController
  # POST /api/password_resets
  # Body: { email }
  def create
    user = User.find_by(email: params[:email].to_s.strip.downcase)

    # Always return ok to avoid email enumeration
    if user
      raw = user.generate_password_reset!
      UserMailer.password_reset(user, raw).deliver_later
    end

    render json: { ok: true }
  end

  # POST /api/password_resets/confirm
  # Body: { token, email, password, password_confirmation }
  def confirm
    email = params[:email].to_s.strip.downcase
    token = params[:token].to_s

    user = User.find_by(email: email)
    return render json: { ok: false, error: "Invalid token" }, status: :unprocessable_entity unless user
    return render json: { ok: false, error: "Invalid token" }, status: :unprocessable_entity if user.password_reset_expired?
    return render json: { ok: false, error: "Invalid token" }, status: :unprocessable_entity unless user.valid_reset_token?(token)

    user.password = params[:password].to_s
    user.password_confirmation = params[:password_confirmation].to_s

    if user.save
      user.clear_password_reset!
      session[:user_id] = user.id
      render json: { ok: true }
    else
      render json: { ok: false, errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
