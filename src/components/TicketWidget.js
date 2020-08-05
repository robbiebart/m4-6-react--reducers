import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import { ReactComponent as SeatAvailable } from "../assets/seat-available.svg";

const TicketWidget = () => {
  const {
    state: { seats, numOfRows, seatsPerRow, bookedSeats, hasLoaded },
  } = useContext(SeatContext);
  // console.log("numOfRows", numOfRows);
  // console.log("seatsPerRow", seatsPerRow);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  if (!hasLoaded) {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>
              <RowName>Row</RowName> <RowLetter>{rowName}</RowLetter>
            </RowLabel>
            <SeatWrapperWrapper>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                return (
                  <SeatWrapper key={seatId}>
                    {bookedSeats[seatId] ? (
                      <StyledSeatUnavailable />
                    ) : (
                      <SeatAvailable />
                    )}
                  </SeatWrapper>
                );
              })}
            </SeatWrapperWrapper>
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 1px solid #ccc; */
  border-radius: 3px;
  padding: 8px;
  width: -webkit-fit-content;
  height: -webkit-fit-content;
  width: -moz-fit-content;
  height: -moz-fit-content;
`;

const RowName = styled.span`
  display: inline;
  /* border: solid white 2px; */
  width: 100%;
  padding: 0px 5px 0px 0px;
`;
const RowLetter = styled.span`
  display: inline;
  /* border: solid white 2px; */
  /* width: 100%; */
  /* padding: 0px 5px 0px 0px */
`;
const Row = styled.div`
  display: flex;
  position: relative;
  /* border: 2px solid red; */
  width: 100%;
`;

const RowLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 5em;
  font-weight: bold;
  /* border: 2px solid blue; */
  padding: 0% 2%;
`;

const SeatWrapperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #eee;
  border-bottom: 2px solid #ddd;

  /* &:not(:last-of-type) {
    border-bottom: 5px solid black;
  } */
`;

const SeatWrapper = styled.div`
  /* border: 2px solid green; */
  /* background: #eee; */
  padding: 5px;
`;

const StyledSeatUnavailable = styled(SeatAvailable)`
  filter: grayscale(0.9);
`;

export default TicketWidget;
