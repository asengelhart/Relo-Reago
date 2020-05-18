class DescriptionsController < ApplicationController
  def update
    description = Description.find_by(id: params[:id])
    if description
      vote_change = params[:votes] ? (params[:votes] - description.votes) : 0
      if vote_change > 0
        description.update(votes: description.votes + 1)
      elsif vote_change < 0
        description.update(votes: description.votes - 1)
      end
      if description.save
        render json: DescriptionSerializer(description).render_one()
      else
        render json: {message: "Could not update description / Ne eblis ĝisdatigi priskribon"}, status: :unprocessable_entity
      end
    end
  end

  def create
    description = Description.new(description_params)
    description.update(votes: 0)
  end
end
