const hapi = require('@hapi/hapi');
const routes = require('./src/routes')

const init = async () => {
    const server=hapi.server({
        port: 5000,
        host: 'localhost',
        routes:{
            cors:{
                origin:['*'],
            },
        },
});

server.route(routes);

// server start
await server.start()
console.log(`server berjalan di ${server.info.uri}`);
};

init();