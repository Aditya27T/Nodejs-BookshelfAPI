const {
    addBooksHandler,
    getallBooksHandler,
    getallBooksbyID,
    updateHandler,
    deletehandler
} = require('./handler')

const routes = [
    {
        method: 'POST', 
        path:'/books',
        handler: addBooksHandler
    },
    {
        method: 'GET', 
        path:'/books',
        handler: getallBooksHandler
    },
    {
        method: 'GET', 
        path:'/books/{id}',
        handler: getallBooksbyID
    },
    {
        method: 'PUT', 
        path:'/books/{id}',
        handler: updateHandler
    },
    {
        method: 'DELETE', 
        path:'/books/{id}',
        handler: deletehandler
    },
    {
        method: '*',
        path: '/{any*}',
        handler: () => 'Halaman Tidak Ditemukan'
    }

]

module.exports = routes;