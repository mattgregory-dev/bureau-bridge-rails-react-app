Rails.application.config.session_store :cookie_store,
  key: "_bureau_bridge_session",
  expire_after: 15.minutes,
  same_site: :lax,
  secure: Rails.env.production?
