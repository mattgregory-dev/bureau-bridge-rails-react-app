module Api
  module Partner
    class PingController < ApplicationController
      before_action -> { require_role!(:partner, :admin) }

      def show
        render json: { ok: true }
      end
    end
  end
end
