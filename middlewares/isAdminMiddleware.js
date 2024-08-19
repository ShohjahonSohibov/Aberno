const Admin = require('../models/Admin');

const isAdminMiddleware = async (req, res, next) => {
      const admin = await Admin.findById({_id: req.user._id});
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      } 
      if (admin.type != "admin") {
      return res.status(403).json({ message: 'Access denied' });
    } 

    next();
};
  
module.exports = isAdminMiddleware;
  