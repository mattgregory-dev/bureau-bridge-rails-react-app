class User < ApplicationRecord
  has_secure_password

  before_validation :normalize_email

  validates :email,
           presence: true,
           uniqueness: { case_sensitive: false },
           format: { with: URI::MailTo::EMAIL_REGEXP }

  validate :password_strength, if: -> { password.present? }

  RESET_TOKEN_TTL = 2.hours
  EMAIL_VERIFICATION_TOKEN_TTL = 24.hours

  enum :role, { consumer: 0, partner: 1, admin: 2 }

  # ---- Password reset ----

  def generate_password_reset!
    raw = SecureRandom.urlsafe_base64(32)
    digest = BCrypt::Password.create(raw)

    update!(
      reset_password_token_digest: digest,
      reset_password_sent_at: Time.current
    )

    raw
  end

  def password_reset_expired?
    reset_password_sent_at.blank? || reset_password_sent_at < RESET_TOKEN_TTL.ago
  end

  def valid_reset_token?(raw)
    return false if reset_password_token_digest.blank?
    BCrypt::Password.new(reset_password_token_digest) == raw
  rescue BCrypt::Errors::InvalidHash
    false
  end

  def clear_password_reset!
    update!(
      reset_password_token_digest: nil,
      reset_password_sent_at: nil
    )
  end

  # ---- Email verification ----

  def generate_email_verification!
    raw = SecureRandom.urlsafe_base64(32)
    digest = BCrypt::Password.create(raw)

    update!(
      email_verification_token_digest: digest,
      email_verification_sent_at: Time.current
    )

    raw
  end

  def email_verification_expired?
    email_verification_sent_at.blank? ||
      email_verification_sent_at < EMAIL_VERIFICATION_TOKEN_TTL.ago
  end

  def valid_email_verification_token?(raw)
    return false if email_verification_token_digest.blank?
    BCrypt::Password.new(email_verification_token_digest) == raw
  rescue BCrypt::Errors::InvalidHash
    false
  end

  def verify_email!
    update!(
      email_verified_at: Time.current,
      email_verification_token_digest: nil,
      email_verification_sent_at: nil
    )
  end

  def email_verified?
    email_verified_at.present?
  end

  private

  def normalize_email
    self.email = email.to_s.strip.downcase
  end

  def password_strength
    if password.length < 12
      errors.add(:password, "must be at least 12 characters")
    end

    unless password.match?(/[A-Za-z]/) && password.match?(/\d/)
      errors.add(:password, "must include at least one letter and one number")
    end

    if password.match?(/\s/)
      errors.add(:password, "must not contain spaces")
    end
  end
end
