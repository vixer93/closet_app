FactoryBot.define do

 factory :wear do
   image      {Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/test.jpg'))}
   color      {"#e1e0e9"}
   wtype      {"Shirt"}
   brand      {"RalphLauren"}
   brightness {0.79}
   chroma     {0.04}
   hue        {246.67}
 end
end