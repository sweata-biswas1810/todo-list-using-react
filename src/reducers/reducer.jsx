const initialdata = {
  list: [],
};

const todoreducer = (state = initialdata, action) => {
  switch (action.type) {
    case "addtodo": {
      const { id, data } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,
          },
        ],
      };
    }

    case "deletetodo": {
      const newlist = state.list.filter((elem) => elem.id !== action.payload);
      return {
        ...state,
        list: newlist,
      };
    }

    case "removetodo":
      return {
        ...state,
        list: [],
      };

    case "updatetodo": {
      const { id, data } = action.payload;
      const updated = state.list.map((item) =>
        item.id === id ? { ...item, data: data } : item
      );
      return {
        ...state,
        list: updated,
      };
    }

    default:
      return state;
  }
};

export default todoreducer;