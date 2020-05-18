class UsersController < ApplicationController
  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user.to_json({:only => [:id, :name]})
    end
  end

  def create
    user = User.new(name: params[:name], password: params[:password])
    if user.save
      session[:id] = user.id
      render json: user.to_json({only => [:id, :name]})
    else
      render json: {@user.errors.full_messages}, status: :unprocessable_entity
    end
  end
end
