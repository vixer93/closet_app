class WearsController < ApplicationController
  def index
    @wears = Wear.all.order("created_at DESC")
  end

  def create
    @wear = Wear.new(wear_params)
    @wear.save ? (render json: @wear) : (redirect_to root_path)
  end

  private
  def wear_params
    params.require(:wear).permit(:image, :color, :type, :brand)
  end

end
