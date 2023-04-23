import { Request, Response } from 'express';

const currentUser: API.CurrentUser = {
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  userid: '0001',
  email: 'john.doe@example.com',
  signature: 'Keep going!',
  title: 'Software Engineer',
  group: 'Engineering',
  tags: [{ key: '1', label: 'JavaScript' }],
  notifyCount: 12,
  unreadCount: 5,
  country: 'USA',
  access: 'admin',
  geographic: {
    province: { label: 'California', key: '1' },
    city: { label: 'Los Angeles', key: '2' },
  },
  address: '123 Main Street',
  phone: '+1 555-123-4567',
};

const loginResult: API.LoginResult = {
  status: 'ok',
  type: 'account',
  currentAuthority: 'admin',
};

export default {
  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, username } = req.body;
    if (password === '123456' && username === 'admin') {
      res.send({ success: true, data: loginResult });
    } else {
      res.status(401).send({ success: false, errorMessage: 'Incorrect username or password.' });
    }
  },
  'POST /api/logout': (_: Request, res: Response) => {
    res.send({ success: true, data: null });
  },
  'GET /api/currentUser': (_: Request, res: Response) => {
    res.send({ success: true, data: currentUser });
  },
};
