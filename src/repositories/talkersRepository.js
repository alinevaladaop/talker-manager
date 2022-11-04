const { readFile, writeFile } = require('fs').promises;
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

const createNewPerson = async (name, age, talk) => {
  const talkers = await findAllTalkers();
  const id = Number(talkers[talkers.length - 1].id) + 1;
  talkers.push({ id, name, age, talk });
  await writeFile(talkerPath, JSON.stringify(talkers));
  return id;
};

module.exports = {
  findAllTalkers,
  findTalkerById,
  createNewPerson,
};