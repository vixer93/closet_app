class ApplicationController < ActionController::Base
  PUBLIC_PATH      = Rails.root.join('public').to_s
  TMP_UPLOADS_PATH = Rails.root.join('public/uploads/tmp').to_s

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up,        keys: [:name, :gender])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :gender])
  end
end
