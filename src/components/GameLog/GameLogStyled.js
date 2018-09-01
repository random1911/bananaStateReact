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
  padding: 0 20px 0 5px;
  display: flex;
  align-items: baseline;
`
export const Turn = styled.div`
  flex: none;
  border-radius: 4px;
  padding: 2px 4px;
  color: #fff;
  background: ${p => p.theme.colors.borderColor()};
  margin-right: 2px;
  line-height: 1;
`
export const Caption = styled.span`
  display: inline-block;
  line-height: 1;
  border-radius: 4px;
  padding: 2px 5px;
  ${p => (!p.color ? '' : `
  color: #fff;
  background: ${getColor(p)};
  `)};
  margin-right: 4px;
`
export const MessageText = styled.div`
  flex: 1;
`