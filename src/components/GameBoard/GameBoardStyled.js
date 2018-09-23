import styled from "styled-components";

export const MapWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
`;

export const MapGrid = styled.div`
  margin: 20px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(${p => p.width}, ${p => p.theme.sizes.tile});
  grid-template-rows: repeat(${p => p.height}, ${p => p.theme.sizes.tile});
`;

const getBorders = ({ borders }) => `
  ${borders.top ? "border-top-style: solid;" : ""}
  ${borders.bottom ? "border-bottom-style: solid;" : ""}
  ${borders.left ? "border-left-style: solid;" : ""}
  ${borders.right ? "border-right-style: solid;" : ""}
`;

export const TileBody = styled.div`
  position: relative;
  background: #f5f5f5;
  border: 2px none #999;
  z-index: 1;
  grid-row: ${p => p.position.y};
  grid-column: ${p => p.position.x};
  ${p => getBorders(p)};
`;
export const TileNumber = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 5px;
  font-size: 12px;
  line-height: 1;
  border-radius: 10px;
  background: #fff;
  color: #000;
  border: 1px solid;
`;
export const TileCaption = styled.div`
  margin: 20px 10px 10px;
  text-align: center;
`;
export const TileDescription = styled.div`
  margin: 10px;
  font-size: 12px;
`;
export const TileChips = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 5px;
`
export const Chip = styled.div`
  display: inline-flex;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: ${p => p.theme.colors[p.color]()};
`;
export const BasicActionsWrapper = styled.div`
  flex: none;
  padding: 20px;
  border-left: 1px solid ${p => p.theme.colors.borderColor()};
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    padding: 10px;
    margin: 10px;
  }
`;
