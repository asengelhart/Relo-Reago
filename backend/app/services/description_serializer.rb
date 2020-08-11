<<<<<<< HEAD
class DescriptionSerializer
  def initialize(description_object)
    @description = description_object
  end

  def render_one
    options = {
      :include => {
        :user => {:only => [:id, :name]}
      },
      :only => [:id, :content, :votes, :created_at, :translation_id]
    }
    @description.to_json(options)
  end
=======
class DescriptionSerializer
  def initialize(description_object)
    @description = description_object
  end

  def render_one
    options = {
      :include => {
        :user => {:only => [:id, :name]}
      },
      :only => [:id, :content, :votes, :created_at, :translation_id]
    }
    @description.to_json(options)
  end
>>>>>>> e8452eee06d68c5bcf14cb17acd97c705b315fbf
end