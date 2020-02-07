json.array! @wears do |wear|
  json.id    wear.id
  json.image wear.image.url
  json.color wear.color
  json.type  wear.wtype
  json.brand wear.brand
end
