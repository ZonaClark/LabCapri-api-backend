export const batchUsers = async (keys, models) => {
  const users = await models.User.findAll({
    where: {
      id: keys
    },
  });

  // Map the keys in the same order as the retrieved entities (users).
  return keys.map(key => users.find(user => user.id === key));
};
