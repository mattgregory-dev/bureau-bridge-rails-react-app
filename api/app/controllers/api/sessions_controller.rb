module Api
  class SessionsController < ApplicationController
    # POST /api/login
    def create
      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { ok: true }
      else
        render json: { ok: false, error: "invalid_credentials" }, status: :unauthorized
      end
    end

    # POST /api/logout
    def destroy
      reset_session
      render json: { ok: true }
    end
  end
end
