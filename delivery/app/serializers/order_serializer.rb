class OrderSerializer < ActiveModel::Serializer
    attributes :quantity, :meal_id, :user_id
    
    has_many :comments

    def comment_list
      object.comments.map do |comment|
        {
          id: comment.id,
          user: {
            id: comment.user_id,
            name: User.find(comment.user_id).name
          },
          content: comment.content
        }
      end
    end
  end