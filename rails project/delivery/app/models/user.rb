class User < ActiveRecord::Base
  has_secure_password
  has_many :orders
  has_many :meals, through: :orders
  validates :name, presence: true
  validates :password, length: { in:1...30 } 


  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.password = SecureRandom.hex
      user.oauth_token = auth.credentials.token
      user.oath_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end


end
