import { app, connectDatabase, initDatabase, server, clearUnusedLinks } from './refs';
import './utils/keep-alive';

connectDatabase();
// initDatabase();
const port = process.env.PORT || 4000;
server.listen(port, () => console.log('SERVER STARTED SUCCESSFULLY!'));

clearUnusedLinks();
