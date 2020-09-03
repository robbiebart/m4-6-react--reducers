import React, { useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";

function App() {
  const {
    state,
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, [receiveSeatInfoFromServer]);
  console.log("state", state);
  return (
    <Wrapper>
      <GlobalStyles />
      This venue has {numOfRows} rows!
      <TicketWidget />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
