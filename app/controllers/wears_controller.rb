class WearsController < ApplicationController
  def index
  end

  def create
    @wear = Wear.new(wear_params)
    @wear.save ? (render :json) : (render :index)
  end

  private
  def wear_params
    params.require(:wear).permit(:image, :color, :type, :brand)
  end
end
