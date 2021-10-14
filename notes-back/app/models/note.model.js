// module.exports = mongoose => {
//     var schema = mongoose.Schema(
//       {
//         title: String,  
//         content: String,
//         author: String
//       },
//       { timestamps: true }
//     );
  
//     schema.method("toJSON", function() {
//       const { __v, _id, ...object } = this.toObject();
//       object.id = _id;
//       return object;
//     });
  
//     const Note = mongoose.model("Note", schema);
//     return Note;
//   };
  