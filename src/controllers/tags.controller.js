const { responseHandler, asyncHandler } = require('../helpers');
const { tagsService } = require('../services');
const { TagsRepository } = require('../repositories');

exports.getTags = asyncHandler(async (req, res) => {
  try {
    await tagsService.retrieveAll((err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.getSingleTag = asyncHandler(async (req, res) => {
  try {
    await tagsService.retrieveOne(req.params.tagname, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.insert = async (req, res) => {
  const mapNewTags = [
    {
      tagname: 'xml',
      description: 'XML (Extensible Markup Language) is a structured document format defining text encoding rules. When using this tag include additional tags such as programming language, tool sets, XML technologies being used, and other tags describing the environment of the problem posted. XML flexibility lends to a wide variety of uses for human and machine data transfer so be specific as to tools and libraries.',
    },
  ];

  const test = await TagsRepository.bulkCreate(mapNewTags);
  res.json(test);
};
