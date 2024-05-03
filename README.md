db.books.insertMany(
  {
    title: "Букварь",
    description: "Книга с буквами",
    authors: ["Балашов Е.Н"]
  },
  {
    title: "Сказки",
    description: "Книга для детей",
    authors: ["Киплинг Р.Д"]
  }
)

db.books.find({title: "Сказки"})

db.books.updateOne(
  { _id: ObjectId("id")},
  { $set: {description: "remake", authors: ["new Author1", "new Author2"]}}
)
