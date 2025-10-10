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

export const updatetodo = (id, newData) => {
  return {
    type: "updatetodo",
    payload: { id, data: newData },
  };
};
