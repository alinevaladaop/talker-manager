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

const updatePerson = async (idToUpdate, nameUpdate, ageUpdate, talkUpdate) => {
  const talkers = await findAllTalkers();
  const talkerFound = talkers.find(({ id }) => id === Number(idToUpdate));
  talkerFound.name = nameUpdate;
  talkerFound.age = ageUpdate;
  talkerFound.talk = talkUpdate;
  await writeFile(talkerPath, JSON.stringify(talkers));
};

const deletePerson = async (idToDelete) => {
  const talkers = await findAllTalkers();
  const indexToDelete = talkers.findIndex(({ id }) => id === Number(idToDelete));
  talkers.splice(indexToDelete, 1);
  await writeFile(talkerPath, JSON.stringify(talkers));
};

module.exports = {
  findAllTalkers,
  findTalkerById,
  createNewPerson,
  updatePerson,
  deletePerson,
};