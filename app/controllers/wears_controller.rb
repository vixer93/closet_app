require_relative './../commonclass/google_api'

class WearsController < ApplicationController
  include WearsHelper

  def index
    @wears = Wear.where(user_id: current_user.id).order("created_at DESC")
  end

  def create
    @wear = Wear.new(wear_params)
    if @wear.valid?
      img_rec = GoogleCloudVision.new("/Users/usudashin/Projects/closet_app/public#{@wear.image.url}")
      result = response_analysis(img_rec.request)

      @wear.wtype = result[:label]
      @wear.color = rgb_to_hex(result[:color]['red'],
                               result[:color]['green'],
                               result[:color]['blue']
                              )
      @wear.brightness = wear_brightness(result[:color]['red'],
                                         result[:color]['green'],
                                         result[:color]['blue']
                                        )
      @wear.chroma = wear_chroma(result[:color]['red'],
                                 result[:color]['green'],
                                 result[:color]['blue']
                                )
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

  def advise
    wear = Wear.find(params[:id])
    @advise = choice_advise(wear)
    render json: @advise
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

  def wear_brightness(red, green, blue)
    revision_rate = {r: 0.9, g: 0.8, b: 0.4}

    r_after_rev = red   * revision_rate[:r]
    g_after_rev = green * revision_rate[:g]
    b_after_rev = blue  * revision_rate[:b]

    bright = ([r_after_rev, g_after_rev, b_after_rev].max / 255).round(2)
  end

  def wear_chroma(red, green, blue)
    max_val = [red, green, blue].max
    min_val = [red, green, blue].min
    chroma = ((max_val - min_val) / max_val.to_f).round(2)
  end

  def choice_advise(wear)
    if wear.chroma >= 0.40
      return "色鮮やかな洋服です。\n色の主張が強いため、他の服を黒でまとめて鮮やかさを活かしましょう！"
    elsif wear.brightness >= 0.50 && wear.chroma < 0.4
      return "淡い色の洋服です。\nライトグレーやベージュと合わせてミルキーコーデにしたり、
              黒系と合わせてメリハリをつけてもいいですね！"
    elsif wear.brightness < 0.5
      return "比較的落ち着いた色です。\nどの洋服とも相性が良いです。
              \n原色系の小物を挟んだり、ダーク系でまとめてモードな雰囲気も楽しめます！"
    end
  end

end
