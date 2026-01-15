Rails.application.routes.draw do
  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    # basic health
    get "health", to: "health#show"

    # auth
    post "signup", to: "auth#signup"
    post "login",  to: "auth#login"
    post "logout", to: "auth#logout"
    get  "me",     to: "auth#me"

    # password reset
    post "password_resets",         to: "password_resets#create"
    post "password_resets/confirm", to: "password_resets#confirm"

    # role-based namespaces
    namespace :admin do
      get "ping", to: "ping#show"
    end

    namespace :partner do
      get "ping", to: "ping#show"
    end

    # credit report
    namespace :credit_report do
      get "full",    to: "credit_report#full"
      get "limited", to: "credit_report#limited"
    end

    post "email_verifications",         to: "email_verifications#create"
    post "email_verifications/confirm", to: "email_verifications#confirm"
  end
end
