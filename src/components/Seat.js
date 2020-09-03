import React, { useContext } from "react";
import seat from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";
import styled from "styled-components";
import { BookingContext } from "../components/BookingContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Seat = ({
  state,
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

  if (state.seats.isBooked === true) {
    return (
      <StyledTippy
        key={`tippy-${seatId}`}
        content={`Row ${rowIndex}, Seat ${seatIndex} -$
            ${price}`}
      >
        <Button disabled={status}>
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
            beginBookingProcess(rowIndex, seatIndex, price);
          }}
          disabled={status}
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

  &:disabled img {
    filter: grayscale(100%);
  }
`;

export default Seat;
