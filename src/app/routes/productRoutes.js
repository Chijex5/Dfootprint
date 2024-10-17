import express from 'express';
import multer from 'multer';
import { uploadToGoogleDrive } from '../../lib/googleDriveHelper.js';
import { db } from '../../lib/db.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const query = `SELECT * FROM products WHERE status = 'active'`;
    const [products] = await db.query(query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});


// POST: Add a new product with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, section } = req.body;
  console.log(name, price, section)

  if (!name || !price || !section || !req.file) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  

  try {
    const file = req.file; // Image file uploaded
    const folderName = name; // Create folder with product name
    const driveResponse = await uploadToGoogleDrive(file, folderName);

    const imageUrl = driveResponse.webViewLink; // Get Google Drive public URL
    const query = `INSERT INTO products (name, price, section, image_url, status, created_at, updated_at) 
                   VALUES (?, ?, ?, ?, 'active', NOW(), NOW())`;
    await db.query(query, [name, price, section, imageUrl]);

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product' });
  }
});


// PATCH a product
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, section, image_url, status } = req.body;

  try {
    const query = `UPDATE products 
                   SET name = ?, price = ?, section = ?, image_url = ?, status = ?, updated_at = NOW() 
                   WHERE id = ?`;
    await db.query(query, [name, price, section, image_url, status, id]);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating product' });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM products WHERE id = ?`;
    await db.query(query, [id]);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

export default router;
