# Code Citations

## License: unknown
https://github.com/Koushith/Periple/blob/45d7382d41a5fabef5730549d7ce6538db1ba3b5/backend/middlewares/authMiddlware.js

```
= async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next()
```


## License: unknown
https://github.com/MiguelARam27/knightfinder/blob/0be5429a0a0fd72dc0f15d492991eb8b132d092d/backend/middleware/authMiddleware.js

```
= async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next()
```


## License: unknown
https://github.com/jarthur22/proshop-tutorial/blob/730ac634716f06db5ae596c245b2ff6f03c6f04b/backend/utils/utils.js

```
= async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next()
```


## License: unknown
https://github.com/UCSD-CodingCompadre/Tutoring-Ticket-System-MERN-Fullstack-Web-Application/blob/7504b016d2d7105eae49e3a9741db3e1c55f8aac/server/middleware/authMiddleware.js

```
= async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next()
```


## License: unknown
https://github.com/Jisu70/mern-stack-chat-app/blob/acb0aefaffe7dd98d6f3fd1a302db89c7ede70bd/backend/middleware/authMiddleware.js

```
= async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next()
```


## License: unknown
https://github.com/deHypeChief/igbo-site/blob/955faeae7cd41f22fe10e9d14931522d5eb1721f/server/db/middleware/authMiddleware.js

```
= async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next()
```
