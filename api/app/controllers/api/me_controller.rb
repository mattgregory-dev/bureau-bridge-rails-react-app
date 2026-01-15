module Api
  class MeController < ApplicationController
    before_action :require_auth!

    def show
      render json: { id: current_user.id, email: current_user.email, role: current_user.role }
    end
  end
end
