import styled from "styled-components";

export const getColor = p => {
  const color = p.color;
  if (!color) {
    return "#ccc";
  } else {
    const computedColor = p.theme.colors[color];
    return computedColor();
  }
};

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  border: 4px solid ${p => getColor(p)};
  transition: border-color ${p => p.theme.transition};
`;

export const WrapperMain = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

export const WrapperBottom = styled.div`
  border-top: 1px solid ${p => p.theme.colors.borderColor()};
  display: flex;
  flex: none;
`;
