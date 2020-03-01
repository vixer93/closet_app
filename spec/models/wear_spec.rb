require 'rails_helper'

describe Wear do
  describe '#create' do
    context 'valid pattern' do

      it 'is valid' do
        user = create(:user)
        wear = build(:wear, user_id: user.id)
        wear.valid?
        expect(wear).to be_valid
      end

      it 'is valid without color' do
        user = create(:user)
        wear = build(:wear, color: "", user_id: user.id)
        wear.valid?
        expect(wear).to be_valid
      end

      it 'is valid without wtype' do
        user = create(:user)
        wear = build(:wear, wtype: "", user_id: user.id)
        wear.valid?
        expect(wear).to be_valid
      end

      it 'is valid without brand' do
        user = create(:user)
        wear = build(:wear, brand: "", user_id: user.id)
        wear.valid?
        expect(wear).to be_valid
      end

      it 'is valid without brightness' do
        user = create(:user)
        wear = build(:wear, brightness: "", user_id: user.id)
        wear.valid?
        expect(wear).to be_valid
      end

      it 'is valid without chroma' do
        user = create(:user)
        wear = build(:wear, chroma: "", user_id: user.id)
        wear.valid?
        expect(wear).to be_valid
      end

      it 'is valid without hue' do
        user = create(:user)
        wear = build(:wear, hue: "", user_id: user.id)
        wear.valid?
        expect(wear).to be_valid
      end
    end

    context 'invalid pattern' do

      it 'is invalid without image' do
        user = create(:user)
        wear = build(:wear, image: "", user_id: user.id)
        wear.valid?
        expect(wear.errors[:image]).to include("can't be blank")
      end

      it 'is invalid without user_id' do
        user = create(:user)
        wear = build(:wear)
        wear.valid?
        expect(wear.errors[:user]).to include("must exist")
      end
    end
  end
end