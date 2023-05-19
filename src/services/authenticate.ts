import { Http2Server } from 'http2';
import validUsers from '../../databaseUsers.json';
import socketServices from './socket';

export default function authenticateUserAndSocket(app: any, httpServer: any): void {
    app.post('/', (req: any, res: any) => {
        console.log(req.body);
        const { username, password } = req.body;

        // Perform validation against your authentication system (e.g., check against a database)
        function validateUsernameAndPassword(
            username: string,
            password: string,
        ) {
            const matched = validUsers.find((user) => {
                return user.username === username && user.password === password;
            });
            return matched;
        }

        const validatedUser = validateUsernameAndPassword(username, password);

        if (validatedUser) {
            res.status(200).json({ message: 'Login successful' });
            console.log('sent');
            socketServices(httpServer, username);
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
}
