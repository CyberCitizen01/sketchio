const users = [];

const createRoom = ({ sid, name }) => {
  console.log("called createRoom");
  if (!name) return { error: "Username required." };

  const room = Math.random().toString(36).substr(2, 6);

  const existingUser = users.find((user) => user.room === room);

  if (existingUser) {
    if (existingUser.sid === sid) return { user: existingUser };
    return createRoom({ sid, name });
  }

  return addUser({ sid, room, name });
};

const checkRoom = (room, name) => {
  if (!room) return { error: "Room required." };
  const usersInRoom = getUsersInRoom(room);

  if (usersInRoom.length === 0) {
    return { error: "Room not found." };
  }

  const existingUser = usersInRoom.find((user) => user.name === name);

  if (existingUser) {
    return { error: "Username Taken" };
  }

  return { room };
};

const addUser = ({ sid, room, name, points = 0, word = null }) => {
  if (!name || !room) return { error: "Username and room are required." };

  name = name.trim();
  room = room.trim();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    if (existingUser.sid === sid) return { user: existingUser };
    return { error: "Username is taken." };
  }

  const user = { sid, room, name, points, word };

  users.push(user);
  console.log("in adduser:", user);

  return { user };
};

const removeUser = (sid) => {
  const index = users.findIndex((user) => user.sid === sid);
  console.log("in removeUser:", sid);
  if (index !== -1) return users.splice(index, 1)[0];
};

const updateUser = (user) => {
  const result = removeUser(user.sid);
  console.log("in updateUser:", result);
  if (result !== undefined) return addUser(user);
};

const getUserById = (sid) => users.find((user) => user.sid === sid);

const getUserByName = (name) => users.find((user) => user.name === name);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const ScoreIncrement = (user) => {
  user.points = user.points + 10
}

module.exports = {
  createRoom,
  checkRoom,
  addUser,
  removeUser,
  updateUser,
  getUserById,
  getUserByName,
  getUsersInRoom,
  ScoreIncrement,
};
