const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
  {
      reactionId: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      username: {
        type: String,
        ref: 'User',
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
  },
  {
    toJSON: {
      getters: true
    }
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        ref: 'User',
        required: true,
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.lenght;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;