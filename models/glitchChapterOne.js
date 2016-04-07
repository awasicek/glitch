var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var glitchChapterOneSchema = new Schema({
    dialognumber: Number,
    notes: String,
    textone: String,
    texttwo: String,
    textthree: String,
    responseone: String,
    responsetwo: String,
    responsethree: String,
    responsefour: String,
    responsefive: String
})

var GlitchChapterOne = mongoose.model('GlitchChapterOne', glitchChapterOneSchema)

module.exports = GlitchChapterOne
