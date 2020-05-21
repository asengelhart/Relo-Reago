class SessionsController < ApplicationController
  def create
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      session[:id] = user.id
      render json: user.to_json(:only => [:id, :name])
    else
      puts "Login failed"
      render json: {message: "Login failed / Ensaluti malsukcesis"}, status: :unauthorized
    end
  end

  def show
    render json: current_user.to_json(:only => [:id, :name])
  end

  def destroy
    session[:id] = nil
    render json: nil.to_json()
  end
end
