module Api
  class EmailVerificationsController < ApplicationController
    def create
      email = params[:email].to_s.strip.downcase
      user = User.find_by("LOWER(email) = ?", email)

      # Always respond ok to avoid user enumeration
      if user && !user.email_verified?
        # Add back when you reconnect email verification
        # token = user.generate_email_verification!
        # UserMailer.email_verification(user, token).deliver_now
      end

      render json: { ok: true }
    end

    def confirm
      email = params[:email].to_s.strip.downcase
      token = params[:token].to_s

      user = User.find_by("LOWER(email) = ?", email)
      unless user
        render json: { ok: false, error: "Invalid link" }, status: :unprocessable_entity
        return
      end

      # Add back when you reconnect email verification
      # if user.verify_email!(token)
      #   render json: { ok: true }
      # else
      #   render json: { ok: false, error: "Invalid or expired link" }, status: :unprocessable_entity
      # end

      # Demo-safe default
      render json: { ok: true }
    end
  end
end
