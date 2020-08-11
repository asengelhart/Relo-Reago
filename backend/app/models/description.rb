class Description < ApplicationRecord
  belongs_to :user
  belongs_to :translation
<<<<<<< HEAD
  has_many :user_description_votes

  def total_votes
    self.user_description_votes.inject(0) do |memo, vote|
      memo = vote.upvoted ? (memo + 1) : (memo - 1)  
      return memo
    end
  end

  def vote(up_down_or_delete, user_id)
    # if up_down_or_delete == 1, it's an upvote
    # elsif it == -1, it's a downvote
    # elsif it == 0, delete the vote
    existing_vote = UserDescriptionVote.find_by(description_id: this.id).where(user_id: user_id)
    if existing_vote
      if up_down_or_delete != 0
        is_upvote = (up_down_or_delete > 0)
        existing_vote.change_vote_if_needed(is_upvote)
      else
        existing_vote.destroy
      end
    else
      if up_down_or_delete != 0
        is_upvote = (up_down_or_delete > 0)
        UserDescriptionVote.create(description_id: this.id, user_id: user_id, upvoted: is_upvote)
      end
    end
  end
end
=======
end
>>>>>>> e8452eee06d68c5bcf14cb17acd97c705b315fbf
