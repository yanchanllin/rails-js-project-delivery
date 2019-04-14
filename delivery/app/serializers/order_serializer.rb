class OrderSerializer < ActiveModel::Serializer
    attributes :quantity
    
    belongs_to :meal
  belongs_to :user
  has_many :comments

    # def comment_list
    #   object.comments.map do |comment|
    #     {
    #       id: comment.id,
    #       user: {
    #         id: comment.user_id,
    #         name: User.find(comment.user_id).name
    #       },
    #       content: comment.content
    #     }
    #   end
    # end
  end