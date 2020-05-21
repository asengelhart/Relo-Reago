class TranslationsController < ApplicationController
  def index
    lang_abbreviations = ["eo", "en"]
    if lang_abbreviations.include?(params[:lang]) && params[:word]
      translation = Translation.get_start_by_lang(params[:lang], params[:word])
      if translation
        render json: TranslationSerializer.new(translation).render_many()
      else
        render json: {message: "No translation exists / Traduko ne ekzistas"}
      end
    end
  end

  def show
    translation = Translation.find_by(id: params[:id])
    if translation
      render json: TranslationSerializer.new(translation).render_one_with_descriptions()
    else
      render json: {message: "Translation not found / Traduko ne troviĝis"}, status: :not_found
    end
  end

  def update
    # Only allow votes to change by one in either direction
    translation = Translation.find_by(id: params[:id])
    if translation.user #only user-submitted translations can be updated
      vote_difference = params[:votes] ? (params[:votes] - translation.votes) : 0
      if vote_difference > 0
        translation.update(votes: translation.votes + 1)
      elsif vote_difference < 0
        translation.update(votes: translation.votes - 1)
      end
      if translation.save
        render json: TranslationSerializer.new(translation).render_one_with_descriptions()
      else
        render json: {message: "Could not update translation / Ne eblis ĝisdatigi tradukon"}, status: :unprocessable_entity
      end
    end
  end
end
