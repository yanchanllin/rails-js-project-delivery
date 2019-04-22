class OrderSerializer < ActiveModel::Serializer
    attributes :id, :meal_id, :user_id, :quantity
    belongs_to :user
    belongs_to :meal
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