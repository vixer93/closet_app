json.array! @wears do |wear|
  json.id    wear.id
  json.image wear.image.url
  json.color wear.color
  json.type  wear.type
  json.brand wear.brand
end
