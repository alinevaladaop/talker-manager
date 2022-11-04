const { readFile } = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const findAllTalkers = async () => {
  const response = await readFile(talkerPath, 'utf-8');
  const talkers = JSON.parse(response);
  return talkers;
};

const findTalkerById = async (idTalker) => {
  const allTalkers = await findAllTalkers();
  const talkerFound = allTalkers.find(({ id }) => id === Number(idTalker));
  return talkerFound;
};

module.exports = {
  findAllTalkers,
  findTalkerById,
};