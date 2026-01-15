class ApplicationMailer < ActionMailer::Base
  default from: ENV["MAILER_FROM"] || "noreply@bureaubridge.com"
  layout "mailer"
end
