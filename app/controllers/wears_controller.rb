class WearsController < ApplicationController

require_relative './../commonclass/google_api'

  def index
    @wears = Wear.all.order("created_at DESC")
  end

  def create
    @wear = Wear.new(wear_params)
    if @wear.valid?
      img_rec = GoogleCloudVision.new("/Users/usudashin/Projects/closet_app/public#{@wear.image.url}")
      @wear.wtype = img_rec.request['description']
    end
    @wear.save ? (render json: @wear) : (redirect_to root_path)
  end

  private
  def wear_params
    params.require(:wear).permit(:image, :color, :brand)
  end

end
