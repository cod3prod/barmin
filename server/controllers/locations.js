import Location from "../models/location.js";

const getAll = async (req, res) => {
  const locations = await Location.find({});
  res.json(locations);
};

const create = async (req, res) => {
  const location = new Location(req.body);
  location.image = req.file.secure_url;
  await location.save();
  res.json({ success: true, redirect: location._id });
};

const getWithReviews = async (req, res) => {
  const location = await Location.findById(req.params.id).populate("reviews");
  res.json(location);
};

const update = async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.json({ success: true });
};

const remove = async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndDelete(id);
  res.json({ success: true });
};

const getDetails = async (req, res) => {
  const location = await Location.findById(req.params.id);
  res.json(location);
};

export default { getAll, create, getWithReviews, update, remove, getDetails };
