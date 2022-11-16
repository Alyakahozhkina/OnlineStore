export const findAuthUser = (userList, user) => userList.find((elem) => elem.email === user.email);

export const checkPasswordUser = (userList, user) => {
  return userList.find((elem) => elem.email === user.email && elem.password === user.password);
};
