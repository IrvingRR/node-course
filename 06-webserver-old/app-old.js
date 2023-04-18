const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename=list.csv');
    res.writeHead(202, { 'Content-Type': 'application/csv' });

    res.write('id, name\n');
    res.write('1, Irving\n');
    res.write('2, Pedro\n');
    res.write('3, Manuel\n');
    res.write('4, Gerardo\n');
    res.write('5, Andrea\n');
    res.end();
});

server.listen(8080);

console.log('Listening in the port', 8080);