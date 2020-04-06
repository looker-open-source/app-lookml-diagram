import React, { useState } from "react";
import {
  Flex,
} from "@looker/components";
import styled from "styled-components";

const Main = styled(Flex)`
  height: 100vh;
  background-color: #ff000021;
  color: red;
`

export const NoModelsAvailable = () => {
  return (
    <Main alignItems="center" justifyContent="center" flexDirection="column">
      <div>Error: No Models Available</div>
      <div>Are all the explores on your model hidden?</div>
    </Main>
  )
};
