import React, { useEffect, useState } from "react";
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

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data))
      .then(() => setStatus("idle"));
  }, [receiveSeatInfoFromServer]);
  // console.log("state", state);

  return (
    <Wrapper>
      <GlobalStyles />
      {status === "idle" && (
        <>
          This venue has {numOfRows} rows!
          <TicketWidget />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
