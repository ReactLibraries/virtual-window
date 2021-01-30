import styled from "styled-components";

type Props = { frameSize: number };
export const Root = styled.div<Props>`
  position: relative;
  overflow: hidden;
  flex: 1;
  background: white;
  &[data-state="normal"] {
    border: ${(p) => p.frameSize}px solid;
  }
`;
