import styled from "styled-components";

export const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

export const Head = styled.button`
  ${p => p.theme.mixins.resetButtonStyles()};
  font-size: 16px;
  font-weight: 300;
  line-height: 1;
  display: inline-flex;
  padding: 0 10px;
  align-items: center;
  height: 40px;
  ${p => p.width && `width: ${p.width}`};
  transition: color 0.2s ease-in-out;
  &:hover {
    background: ${p => p.theme.colors.banana()};
  }
  &:focus {
    ${p => p.theme.mixins.focusOutline()};
  }
`;

export const CurrentValue = styled.span`
  margin: 0 5px 0 0;
  flex: 1;
  text-align: left;
`;
// TODO: get own style!
export const Arrow = styled.span`
  width: 16px;
  height: 16px;
  position: relative;
  flex: none;
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 1px;
    background: #464646;
    transition: transform 0.25s ease;
    top: 8px;
  }
  &:before {
    right: 0;
    transform: rotate(${p => (p.open ? "" : "-")}50deg);
  }
  &:after {
    left: 0;
    transform: rotate(${p => (p.open ? "-" : "")}50deg);
  }
`;

export const SelectBody = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;
  flex: 0 1 auto;
  border-radius: 2px;
  background: #fff;
  border: 1px solid ${p => p.theme.colors.borderColor()};
`;
export const SelectItem = styled.li`
  margin: 0;
  padding: 0;
`;
export const SelectSeparator = styled.div`
  border-bottom: 1px solid ${p => p.theme.colors.borderColor()};
  margin: 2px 5px;
`;
export const SelectOption = styled.button`
  ${p => p.theme.mixins.resetButtonStyles()};
  font-size: 16px;
  font-weight: 300;
  line-height: 1;
  display: inline-flex;
  padding: 0 5px;
  align-items: center;
  height: 40px;
  width: 100%;
  color: ${p => (p.isSelected ? "blue" : "black")};
  &:hover {
    background-color: ${p => p.theme.colors.coast()};
  }
  &:focus {
    ${p => p.theme.mixins.focusOutline()};
  }
`;
