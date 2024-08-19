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
    sort['createdAt'] = sortByCreatedAt === 'asc' ? 1 : -1;
    if (sortRate) {
      sort['rate'] = sortRate === 'asc' ? 1 : -1;
    }

    const testimonials = await Testimonial.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort);

    res.json(testimonials);
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
  const { fullname, title, content, image } = req.body;

  try {
    const testimonial = await Testimonial.findById({_id: id});
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (fullname) testimonial.fullname = fullname;
    if (title) testimonial.title = title;
    if (content) testimonial.content = content;
    if (image) testimonial.image = image;

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
