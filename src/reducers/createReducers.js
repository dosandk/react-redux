export const createReducers = reducerObj => {
  return Object.keys(reducerObj).reduce((accum, reducerName) => {
    accum[reducerName] = createReducer(reducerObj[reducerName]);

    return accum;
  }, {});
};

export const createReducer = handlers => {
  return (state = null, action) => {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

