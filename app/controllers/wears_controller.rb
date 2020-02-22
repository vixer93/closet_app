require_relative './../commonclass/google_api'

class WearsController < ApplicationController
  include WearsHelper

  def index
    @wears = Wear.where(user_id: current_user.id).order("created_at DESC")
  end

  def create
    @wear = Wear.new(wear_params)
    if @wear.valid?
      download_image_tmp(@wear.image.url)
      img_rec = GoogleCloudVision.new("#{TMP_UPLOADS_PATH}/tmp_image_#{current_user.id}.jpg")
      result = response_analysis(img_rec.request)
      File.delete("#{TMP_UPLOADS_PATH}/tmp_image_#{current_user.id}.jpg")

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
      @wear.hue = wear_hue(result[:color]['red'],
                           result[:color]['green'],
                           result[:color]['blue'])
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
      Dir.rmdir("#{PUBLIC_PATH}/uploads/wear/image/#{params[:id]}")
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
    description = []
    color = response['imagePropertiesAnnotation'].first[1]['colors'].first['color']

    if response['labelAnnotations'].first['description'] != 'Clothing'
      return {label: response['labelAnnotations'].first['description'], color: color}
    end

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

  def choice_advise(wear)

    advise = {
               pale:        ["淡い色で優しさを感じさせます。同トーンの色と合わせれば色数が多くてもまとまります。"],
               light:       ["明るい印象を与えてくれる色です。ベージュやライトグレーと合わせるとまとまります。黒をアクセントとして使用してもいいですね！"],
               vivid:       ["かなり鮮やかな色です。他の服の色を黒でまとめて鮮やかさを活かしましょう！"],
               grayish:     ["少しくすみがかった、優しい色合いです。ライトグレーやベージュと合わせてミルキーコーデにしたり、黒や紺でメリハリをつけてもいいですね！"],
               soft:        ["柔らかな印象で程よく明るさを演出してくれます。ダークグレーやベージュが相性良く、馴染みます。"],
               strong:      ["一つで主役になれる色の強さです。他の服はグレー、ネイビー、ブラック、ベージュでまとめると発色が活きます。"],
               dark_grayish:["暗めで落ち着いた色のため、多くの色と相性が良いです。原色系の小物を挟んだり、ダーク系でまとめてモードな雰囲気も楽しめます！",],
               dark:        ["少しくすみ掛かった色合いで、こなれた雰囲気を出してくれます。彩度の低い服と相性が良いです。"],
               deep:        ["深みのある色合いです。暗めの色ですが主張が強いため、同系色でまとめたり、ブラック系と合わせましょう！"]
             }

    if wear.brightness <= 0.3
      case
        when wear.chroma <= 0.3
          advise[:dark_grayish].first
        when wear.chroma <= 0.5
          advise[:dark].first
        when wear.chroma <= 1
          advise[:deep].first
      end
    elsif wear.brightness <= 0.6
      case
        when wear.chroma <= 0.3
          advise[:grayish].first
        when wear.chroma <= 0.5
          advise[:soft].first
        when wear.chroma <= 1
          advise[:strong].first
      end
    else
      case
        when wear.chroma <= 0.3
          advise[:pale].first
        when wear.chroma <= 0.5
          advise[:light].first
        when wear.chroma <= 1
          advise[:vivid].first
      end
    end
  end
end
