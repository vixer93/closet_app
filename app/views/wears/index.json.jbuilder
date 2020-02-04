json.set! :wear do
  json.array! @wears do |wear|
    # json.extract wear, :id, :image, :color, :type, :brand
    # json.image_name wear.image
    json.id wear.id
    json.brand wear.brand
  end
end