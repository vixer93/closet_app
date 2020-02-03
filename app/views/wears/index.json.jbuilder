json.set! :wear do
  json.array! @wears do |wear|
    json.extract wear, :id, :image, :color, :type, :brand
  end
end