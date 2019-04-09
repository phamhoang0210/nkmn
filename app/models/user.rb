class User < ApplicationRecord
    #validate password and password_confirmation
   validates :password, presence: true
   validates_confirmation_of :password
   has_secure_password
   belongs_to :role

end
