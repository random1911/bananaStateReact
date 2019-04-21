import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const ModalCloseOnOutside = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ModalContainer = styled.div`
  flex: 0 1 auto;
  background: #fff;
  position: relative;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.header`
  display: flex;
  overflow: hidden;
  background: ${p => p.theme.colors.coast()};
  flex: none;
`;

export const ModalCaption = styled.h2`
  flex: 1;
  padding: 5px 10px;
  margin: 0;
  font-size: 18px;
  line-height: 1;
  color: #fff;
  font-weight: 400;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
`;

export const ModalClose = styled.button`
  flex: none;
  width: 30px;
  height: 30px;
  ${p => p.theme.mixins.resetButtonStyles()};
  position: relative;
  overflow: hidden;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 3px;
    right: 3px;
    height: 2px;
    top: 50%;
    margin-top: -1px;
    background: #fff;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

export const ModalContent = styled.div`
  padding: 10px;
  flex: 0 1 auto;
  overflow-y: auto;
`;
