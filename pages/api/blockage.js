import dbConnect from '../../lib/dbConnect';
import Blockage from '../../models/Blockage';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const blockage = await Blockage.create(req.body);
        res.status(201).json({ success: true, data: blockage });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}