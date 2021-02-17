const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Comment = require('./comment');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});
  // create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);
const Comment = model('Comment', CommentSchema);
// export the Pizza model
module.exports = Pizza, Comment;