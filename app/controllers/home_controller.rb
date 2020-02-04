class HomeController < ApplicationController
  def index
  end

  def recommend
    @buyma_image_info = scraping_buyma(search_word, current_user.gender)
    render json: @buyma_image_info
  end

  private

  def search_word
    favorite_brands = Wear.group(:brand).having('count(*)>=2').pluck(:brand)
    favorite_brands.sample
  end


  def scraping_buyma(search_word, gender)
    gender_key = gender=="male" ? "-C1002F1" : "-F1"

    url = "https://www.buyma.com/r/#{gender_key}/#{search_word}/"
    charset = nil
    html = open(url) do |f|
      charset = f.charset
      f.read
    end

    doc = Nokogiri::HTML.parse(html, nil, charset)
    image_info = []
    doc.css('.product_img.js-ecommerce-action > .js-track-search-action.js-ecommerce-item-click').first(10).each do |a|
      image = {}
      image[:href] = "https://www.buyma.com#{a.attr('href')}"
      image[:src] = a.css('img').attr('src').text
      image_info << image
    end
    return image_info
  end
end
