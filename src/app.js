const express = require('express');
const bodyParser = require('body-parser');
const assetRoutes = require('./routes/assetRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/assets', assetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});