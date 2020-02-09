require 'httpclient'
require 'base64'
require 'json'

class GoogleCloudVision
  def initialize(file_path)
    @endpoint_uri = "https://vision.googleapis.com/v1/images:annotate?key=#{ENV['GOOGLE_VISION_API_KEY']}"
    @file_path = file_path
  end


  def request
    http_client = HTTPClient.new
    content = Base64.strict_encode64(File.new(@file_path, 'rb').read)
    response = http_client.post_content(@endpoint_uri, request_json(content), 'Content-Type' => 'application/json')
    JSON.parse(response)['responses'].first
  end

  def request_json(content)
    {
      requests: [{
        image: {
          content: content
        },
        features: [{
          type: "LABEL_DETECTION",
          maxResults: 10
        },
        {
          type: "IMAGE_PROPERTIES",
          maxResults: 10
        }]
      }]
    }.to_json
  end
end
