const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configure multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static('public'));

app.post('/compress', upload.single('image'), async (req, res) => {
    try {
        const compressedImageBuffer = await sharp(req.file.buffer)
            .resize(800) // Example resize width
            .jpeg({ quality: 70 }) // Example compression quality
            .toBuffer();

        const outputPath = path.join(__dirname, 'public', 'compressed.jpg');
        fs.writeFileSync(outputPath, compressedImageBuffer);

        res.json({ url: '/compressed.jpg' });
    } catch (error) {
        res.status(500).send('Error processing image');
    }
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
