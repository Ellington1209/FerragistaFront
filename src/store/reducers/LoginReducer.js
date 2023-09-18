const initialState = {
    user: {
      id: "",
      group_id: 1,
      name: "",
      email: "",
      telefone: "",
      email_verified_at: "",
   
    },
  };
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
  
          user: action.user,
        };
      default:
        return state;
    }
  };