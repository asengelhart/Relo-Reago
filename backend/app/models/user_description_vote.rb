class UserDescriptionVote < ApplicationRecord
  belongs_to :user
  belongs_to :description

  # Has boolean field :upvoted; if false, this record indicates a downvote

  def change_vote_if_needed(is_upvote)
    if self.upvoted ^ is_upvote # XOR operator
      self.update(upvoted: is_upvote)
      self.save
    end
  end

end
