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
        render json: DescriptionSerializer.new(description).render_one()
      else
        render json: {message: "Could not update description / Ne eblis ĝisdatigi priskribon"}, status: :unprocessable_entity
      end
    end
  end

  def show
    description = Description.find_by(id: params[:id])
    if description
      render json: DescriptionSerializer.new(description).render_one()
    else
      render json: {message: "Description not found / Priskribo ne troviĝis"}
    end
  end

  def create
    description = Description.new(user_id: params[:user_id], translation_id: params[:translation_id], content: params[:content])
    description.update(votes: 0)
    if description.save
      render json: DescriptionSerializer.new(description).render_one()
    else
      render json: {message: "Could not create description / Ne eblis krei priskribon"}, status: :unprocessable_entity
    end
  end
end
