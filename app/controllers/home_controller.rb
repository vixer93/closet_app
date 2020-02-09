class HomeController < ApplicationController
  def index
  end

  def recommend
    @buyma_image_info = scraping_buyma(search_word, current_user.gender)
    render json: @buyma_image_info
  end

  def outfit
    if current_user.gender == "male"
      @cordi_image_info = scraping_d_colle
    else
      @cordi_image_info = scraping_iqon
    end
    render json: @cordi_image_info
  end

  private

  def search_word
    favorite_brands = Wear.group(:brand).having('count(*)>=2').pluck(:brand)
    favorite_brands.sample
  end


  def scraping_buyma(word, gender)
    gender_key = gender=="male" ? "-C1002F1" : "-F1"
    word.gsub!(/[[:space:]]/, '%20')

    url = "https://www.buyma.com/r/#{gender_key}/#{word}/"
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

  def scraping_d_colle
    url = "https://clubd.co.jp/wp/post-category/stylebook"

    charset = nil
    html = open(url) do |f|
      charset = f.charset
      f.read
    end

    doc = Nokogiri::HTML.parse(html, nil, charset)
    image_info = []
    doc.css('article > a').first(10).each do |a|
      image = {}
      image[:href] = a.attr('href')
      image[:src] = a.css('figure > img').attr('src').text
      image_info << image
    end
    return image_info
  end

  def scraping_iqon
    url = "https://www.iqon.jp/sets/new/"

    charset = nil
    html = open(url) do |f|
      charset = f.charset
      f.read
    end

    doc = Nokogiri::HTML.parse(html, nil, charset)
    image_info = []
    doc.css('.set-box > a').first(10).each do |a|
      image = {}
      image[:href] = "https://www.iqon.jp#{a.attr('href')}"
      image[:src] = a.css('img').attr('src').text
      image_info << image
    end
    return image_info
  end
end
