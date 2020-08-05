import React from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
  bookedSeats: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server": {
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
        bookedSeats: action.bookedSeats,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };
  if (!state) {
    return <div>loading</div>;
  } else {
    return (
      <SeatContext.Provider
        value={{
          state,
          actions: {
            receiveSeatInfoFromServer,
          },
        }}
      >
        {children}
      </SeatContext.Provider>
    );
  }
};
