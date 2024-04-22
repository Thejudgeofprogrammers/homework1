const { v4: uuid } = require('uuid');
class Book {
  constructor(title = '', description = '', authors = '', favorite = Boolean(), fileCover = '', fileName = '', fileBook = '', id = uuid()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  };
};

const data = {
  many: [
    new Book( 
      "Война и мир",                    // title
      "Роман-эпопея о войне 1812 года", // description
      "Лев Толстой",                    // authors
      true,                             // favorite
      "monkey1.jpg",                    // fileCover X
      "Война и мир",                    // fileName
      "text1.pdf"),                     // fileBook
    new Book(
      "1984", 
      "Антиутопический роман о тоталитарном обществе", 
      "Джордж Оруэлл", 
      false, 
      "monkey2.jpg",  
      "1984",               
      "text2.pdf"),
    new Book(
      "Гарри Поттер и философский камень", 
      "Приключение", 
      "Джоан Роулинг", 
      true,       
      "monkey3.jpg",  
      "Гарри Поттер",
      "text3.pdf"),
    new Book(
      "Мастер и Маргарита", 
      "Роман", 
      "Михаил Булгаков", 
      true,                          
      "monkey4.jpg",  
      "Мастер и Маргарита", 
      "text4.pdf")
  ]
};

module.exports = {
  Book, data
};