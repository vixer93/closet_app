require_relative './../commonclass/google_api'

class WearsController < ApplicationController
  include WearsHelper

  def index
    @wears = Wear.all.order("created_at DESC")
  end

  def create
    @wear = Wear.new(wear_params)
    if @wear.valid?
      img_rec = GoogleCloudVision.new("/Users/usudashin/Projects/closet_app/public#{@wear.image.url}")
      result = response_analysis(img_rec.request)
      @wear.wtype = result[:label]
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
    params.require(:wear).permit(:image, :color, :brand, :wtype).merge(user_id: current_user.id)
  end

  def response_analysis(response)
    color = response['imagePropertiesAnnotation'].first[1]['colors'].first['color']
    if response['labelAnnotations'].first['description'] != 'Clothing'
      return {label: response['labelAnnotations'].first['description'], color: color}
    end

    description = []

    response['labelAnnotations'].each do |label|
      description << label['description']
    end

    if description.include? 'Dress shirt' || 'Shirt'
      {label: 'Shirt', color: color}
    elsif description.include? 'Trousers' || 'Suit trousers'
      {label: 'Pants', color: color}
    elsif description.include? 'Jacket'
      {label: 'Jacket', color: color}
    elsif description.include? 'Outerwear'
      {label: 'Outer', color: color}
    end

  end

end
