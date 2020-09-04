import React, { useContext } from "react";
import seat from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";
import styled from "styled-components";
import { BookingContext } from "../components/BookingContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Seat = ({
  seatId,
  rowIndex,
  seatIndex,
  width,
  height,
  price,
  status,
}) => {
  const {
    actions: { beginBookingProcess },
  } = useContext(BookingContext);

  const { state } = React.useContext(SeatContext);
  // console.log(state);
  if (state.seats[seatId].isBooked === true) {
    return (
      <StyledTippy
        key={`tippy-${seatId}`}
        content={`Row ${rowIndex + 1}, Seat ${seatIndex + 1} -$
            ${state.seats[seatId].price}`}
      >
        <Button disabled={state.seats[seatId].isBooked}>
          <img
            alt="unavailable seat"
            src={seat}
            style={{ filter: "grayscale(100%)" }}
          />
        </Button>
      </StyledTippy>
    );
  } else {
    return (
      <StyledTippy
        key={`tippy-${seatId}`}
        content={
          <span>
            Row {rowIndex + 1}, Seat {seatIndex + 1} -$
            {state.seats[seatId].price}
          </span>
        }
      >
        <Button
          onClick={() => {
            beginBookingProcess({
              seatId,
              price: state.seats[seatId].price,
            });
          }}
          disabled={false}
        >
          <img alt="available seat" src={seat} />
        </Button>
      </StyledTippy>
    );
  }
};

const StyledTippy = styled(Tippy)`
  background: #222;
`;

const Button = styled.button`
  position: relative;
  cursor: pointer;
`;

/*

if (state.seats.isBooked === true) {
    return (
      <StyledTippy
        key={`tippy-${seatId}`}
        content={`Row ${rowIndex}, Seat ${seatIndex} -$
            ${price}`}
      >
        <Button disabled={false}>
          <img
            alt="unavailable seat"
            src={seat}
            style={{ filter: "grayscale(100%)" }}
          />
        </Button>
      </StyledTippy>
    );
  } else {
    return (
      <StyledTippy
        key={`tippy-${seatId}`}
        content={
          <span>
            Row {rowIndex}, Seat {seatIndex} -$
            {state.seats.price}
          </span>
        }
      >
        <Button
          onClick={() => {
            beginBookingProcess({ seatId });
          }}
          disabled={status}
        >
          <img alt="available seat" src={seat} />
        </Button>
      </StyledTippy>
    );
  }

*/

export default Seat;
