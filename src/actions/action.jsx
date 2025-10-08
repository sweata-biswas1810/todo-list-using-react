export const addtodo = (data) => {
  return {
    type: "addtodo",
    payload: {
      id: new Date().getTime().toString(),
      data: data,
    },
  };
};

export const deletetodo = (id) => {
  return {
    type: "deletetodo",
    payload: id,
  };
};

export const removetodo = () => {
  return {
    type: "removetodo",
  };
};
