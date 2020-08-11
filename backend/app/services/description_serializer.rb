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
end