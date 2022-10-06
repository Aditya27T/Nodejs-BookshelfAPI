const {nanoid} = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
    const{
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    }= request.payload;

    if (!name){
        const response = h 
        .response({
            status:'fail',
            message:'Gagal menambahkan buku. Mohon isi nama buku'
        })
        .code(400);
        return response;
    }
    if (readPage > pageCount){
        const response = h 
        .response({
            status:'fail',
            message:'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        .code(400);
        return response;
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    
    const newbook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt,
    }
    
    // menambahkan buku
    
    books.push(newbook);
    
    const success = books.filter((book) => book.id === id).length > 0;
    
    if (success) {
        const response = h.response({
            status:'success',
            message:'Buku berhasil ditambahkan',
            data:{
                bookId: id, 
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status:'error',
        message:'Buku gagal ditambahkan'
    })
    response.code(500);
    return response;
} 

getallBooksHandler = (request, h) => {
    const { name, reading, finished } =request.query;
    if (!name && !reading && !finished ){
        const response = h 
        .response({
            status:'success',
            data:{
                books: books.map((book)=>({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                })),
            },
        })
        .code(200);
        return response;
    }
    if(name){
        filterBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        const response = h
        .response({
          status: 'success',
          data: {
            books: filterBooks.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        })
        .code(200);
      return response;
    }

    if(reading){
        const filteredBooksREading = books.filter(
            (book) => Number(book.reading) === Number(reading)
        );
        const response = h
        .response({
          status: 'success',
          data: {
            books: filteredBooksREading.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        })
        .code(200);
      return response;
    }

    if(finished){
        const filteredBooksfinished = books.filter(
            (book) => Number(book.finished) === Number(finished)
        );
        const response = h
        .response({
          status: 'success',
          data: {
            books: filteredBooksfinished.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        })
        .code(200);
      return response;
    }
}

getallBooksbyID = (request, h) => {
    const {id} = request.params;

    const book1 = books.filter((n) => n.id === id)[0];

    if (book1 !== undefined){
        return{
            status:'success',
            data: {
                book: book1,
            },
        };
    }
    const response = h.response({
        status:'fail',
        message:'Buku tidak ditemukan'
    })
    response.code(404);
    return response;
}

updateHandler = (request, h) =>{
    const {id} = request.params;

    const{ 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    
    const updatedAt = new Date().toISOString();
    
    const index = books.findIndex((book) => book.id === id);
    
    if (index !== -1) {
        if (!name){
            const response = h 
            .response({
                status:'fail',
                message:'Gagal memperbarui buku. Mohon isi nama buku'
            })
            .code(400);
            return response;
        }
        if (readPage > pageCount){
            const response = h 
            .response({
                status:'fail',
                message:'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            })
            .code(400);
            return response;
        }
        const finished = pageCount === readPage;
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt,
        };
        return {
            status: 'success',
            message: 'Buku berhasil diperbarui',
          };
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });   
      response.code(404);
      return response;
}

deletehandler = (request, h) =>{
    const {id} = request.params;

    const index = books.findIndex((book) => book.id === id);

    if(index !== -1){
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
          });
          response.code(200);
          return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });   
      response.code(404);
      return response;
    
}

module.exports={
    addBooksHandler,
    getallBooksHandler,
    getallBooksbyID,
    updateHandler,
    deletehandler
}