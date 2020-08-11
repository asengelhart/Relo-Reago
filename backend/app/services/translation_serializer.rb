<<<<<<< HEAD
class TranslationSerializer
  def initialize(translation_object)
    @translation = translation_object
  end

  def render_many
    options = {
      :include => {
        :user => {:only => [:id, :name]}
      },
      :only => [:id, :esperanto, :english, :votes]
    }
    @translation.to_json(options)
  end

  def render_one_with_descriptions
    options = {
      :include => {
        :descriptions => {
          :include => {
            :user => {:only => [:id, :name]}
          },
          :only => [:id, :content, :votes, :created_at]
        },
        :user => {:only => [:id, :name]}
      },
      :only => [:id, :esperanto, :english, :votes]
    }
    @translation.to_json(options)
  end
=======
class TranslationSerializer
  def initialize(translation_object)
    @translation = translation_object
  end

  def render_many
    options = {
      :include => {
        :user => {:only => [:id, :name]}
      },
      :only => [:id, :esperanto, :english, :votes]
    }
    @translation.to_json(options)
  end

  def render_one_with_descriptions
    options = {
      :include => {
        :descriptions => {
          :include => {
            :user => {:only => [:id, :name]}
          },
          :only => [:id, :content, :votes, :created_at]
        },
        :user => {:only => [:id, :name]}
      },
      :only => [:id, :esperanto, :english, :votes]
    }
    @translation.to_json(options)
  end
>>>>>>> e8452eee06d68c5bcf14cb17acd97c705b315fbf
end