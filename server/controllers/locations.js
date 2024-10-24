import Location from "../models/location.js";

const getAll = async (req, res) => {
  const locations = await Location.find({});
  console.log("locations loaded");
  res.json(locations);
};

const convertImages = (req, res) => {
  const images = req.results.map((result) => ({
    url: result.secure_url,
    public_id: result.public_id,
  }));
  console.log("images converted");
  res.status(200).json(images);
};

const deleteImages = (req, res) => {
  console.log("images deleted");
  res.status(200).json({ message: "Images deleted successfully" });
}

const create = async (req, res) => {
  const location = new Location(req.body);
  await location.save();
  console.log(`${location._id} created successfully`);
  res.json({
    message: "Location created successfully",
    redirect: location._id,
  });
};

const getWithReviews = async (req, res) => {
  const location = await Location.findById(req.params.id).populate("reviews");
  res.json(location);
};

const update = async (req, res) => {
  const { id } = req.params;
  const images = [];
  for (let i = 0; i < req.files.length; i++) {
    const image = {
      url: req.results[i].secure_url,
      public_id: req.results[i].public_id,
    };
    images.push(image);
  }
  await Location.findByIdAndUpdate(id, {
    ...req.body,
    images: images,
  });
  console.log(`${id} updated successfully`);
  res.json({ message: "Successfully updated the location" });
};

const remove = async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndDelete(id);
  console.log(`${id} deleted successfully`);
  res.json({ message: "Location deleted successfully" });
};

const getDetails = async (req, res) => {
  const location = await Location.findById(req.params.id);
  res.json(location);
};

export default { getAll, create, getWithReviews, update, remove, getDetails, convertImages, deleteImages };
