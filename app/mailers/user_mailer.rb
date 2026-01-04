class UserMailer < ApplicationMailer

  def password_reset(user, raw_token)
    @user = user

    host = ENV.fetch("APP_HOST", "localhost:5173")
    protocol = ENV.fetch("APP_PROTOCOL", Rails.env.production? ? "https" : "http")
    web_origin = "#{protocol}://#{host}"

    @reset_url = "#{web_origin}/reset-password" \
                "?email=#{CGI.escape(user.email)}" \
                "&token=#{CGI.escape(raw_token)}"

    mail(to: user.email, subject: "Reset your password")
  end

  def email_verification(user, raw_token)
    @user = user

    host = ENV.fetch("APP_HOST", "localhost:5173")
    protocol = ENV.fetch("APP_PROTOCOL", Rails.env.production? ? "https" : "http")
    web_origin = "#{protocol}://#{host}"

    @verify_url = "#{web_origin}/verify-email?token=#{CGI.escape(raw_token)}"

    mail(to: @user.email, subject: "Verify your email")
  end
end
