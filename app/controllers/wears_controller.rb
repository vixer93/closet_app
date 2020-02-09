class WearsController < ApplicationController
include WearsHelper
require_relative './../commonclass/google_api'

  def index
    @wears = Wear.all.order("created_at DESC")
  end

  def create
    @wear = Wear.new(wear_params)
    if @wear.valid?
      img_rec = GoogleCloudVision.new("/Users/usudashin/Projects/closet_app/public#{@wear.image.url}")
      result = img_rec.request
      @wear.wtype = result[:label]['description']
      @wear.color = rgb_to_hex(result[:color]['red'], result[:color]['green'], result[:color]['blue'])
    end
    @wear.save ? (render json: @wear) : (redirect_to root_path)
  end

  def update
    @wear = Wear.find(params[:id])
    if @wear.update(wear_params)
    else
      redirect_to root_path
    end
  end

  def destroy
    @wear = Wear.find(params[:id])
    if @wear.destroy
      Dir.rmdir("/Users/usudashin/Projects/closet_app/public/uploads/wear/image/#{params[:id]}")
    else
      redirect_to root_path
    end
  end

  private
  def wear_params
    params.require(:wear).permit(:image, :color, :brand, :wtype)
  end

end
