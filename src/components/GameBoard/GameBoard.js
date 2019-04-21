import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { MapWrapper, MapGrid } from "./GameBoardStyled";
import Tile from "./Tile";

const GameBoard = ({ store }) => {
  const { gameMap } = store;
  const { width, height } = gameMap;
  const renderTile = tile => (
    <Tile
      key={tile.id}
      borders={tile.borders}
      players={tile.players}
      {...tile}
    />
  );
  return (
    <MapWrapper>
      <MapGrid width={width} height={height}>
        {gameMap.tiles.map(renderTile)}
      </MapGrid>
    </MapWrapper>
  );
};

GameBoard.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(GameBoard));
