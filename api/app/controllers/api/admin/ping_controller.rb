module Api
  module Admin
    class PingController < ApplicationController
      before_action -> { require_role!(:admin) }

      def show
        render json: { ok: true }
      end
    end
  end
end
