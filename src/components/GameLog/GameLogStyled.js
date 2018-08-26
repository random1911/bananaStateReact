import styled from 'styled-components'
import {getColor} from '../GameContainer/GameContainerStyled'

export const Container = styled.div`
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
`
export const Scroll = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const List = styled.ul`
  padding: 5px 0;
  margin: 0;
  list-style: none;
  flex: none;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
export const MessageBody = styled.li`
  padding: 0 20px;
  margin: 5px 0;
  display: flex;
  align-items: baseline;
`
export const Turn = styled.div`
  flex: none;
  border-radius: 5px;
  padding: 3px 5px;
  color: #fff;
  background: ${p => p.theme.colors.borderColor()};
  margin-right: 5px;
  line-height: 1;
`
export const Caption = styled.div`
  font-weight: bold;
  display: inline;
  ${p => (p.color ? `color: ${getColor(p)}` : '')};
  margin-right: 5px;
`
export const MessageText = styled.div`
  flex: 1;
`