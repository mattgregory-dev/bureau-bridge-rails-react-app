module Api
  module CreditReport
    class CreditReportController < ApplicationController
      before_action -> { require_role!(:consumer, :admin) }, only: :full
      before_action -> { require_role!(:partner, :admin) },  only: :limited

      def full
        render json: {
          view: "full",
          consumer_id: current_user.id,
          data: { score: 720, tradelines: ["..."], inquiries: ["..."] }
        }
      end

      def limited
        render json: {
          view: "limited",
          data: { score_band: "700-749" }
        }
      end
    end
  end
end
