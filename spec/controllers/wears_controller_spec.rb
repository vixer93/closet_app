require 'rails_helper'

describe WearsController do
  describe 'GET #index' do
    before do
      @user = create(:user)
    end

    it 'renders the :index template' do
      sign_in @user
      get :index
      expect(response).to render_template :index
    end
  end
end