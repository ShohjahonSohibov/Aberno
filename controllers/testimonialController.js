const Testimonial = require('../models/Testimonial');

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({ message: 'Testimonial created successfully', testimonial });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10, sortRate = 'asc', sortByCreatedAt = 'desc' } = req.query;
    let query = {}
  
    if (isActive) {
      query["isActive"] = isActive
    } 

    const skip = (page - 1) * limit;

    let sort = {};
    sort['_id'] = sortByCreatedAt === 'asc' ? 1 : -1;
    if (sortRate) {
      sort['rate'] = sortRate === 'asc' ? 1 : -1;
    }

    const testimonials = await Testimonial.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort);

    const counts = await Testimonial.countDocuments(query)

    res.json({counts, testimonials});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSingleTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonial = await Testimonial.findById({_id: id});
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonial.findById({_id: id});
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.fullnameUz = req.body.fullnameUz || testimonial.fullnameUz;
    testimonial.fullnameRu = req.body.fullnameRu || testimonial.fullnameRu;
    testimonial.fullnameEn = req.body.fullnameEn || testimonial.fullnameEn;
    
    testimonial.titleUz = req.body.titleUz || testimonial.titleUz;
    testimonial.titleRu = req.body.titleRu || testimonial.titleRu;
    testimonial.titleEn = req.body.titleEn || testimonial.titleEn;
    
    testimonial.contentUz = req.body.contentUz || testimonial.contentUz;
    testimonial.contentRu = req.body.contentRu || testimonial.contentRu;
    testimonial.contentEn = req.body.contentEn || testimonial.contentEn;
    
    testimonial.image = req.body.image || testimonial.image;
    testimonial.isActive = req.body.isActive || testimonial.isActive;

    await testimonial.save();

    res.json({ message: 'Testimonial updated successfully', testimonial });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonial = await Testimonial.findById({_id: id});
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.remove();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
