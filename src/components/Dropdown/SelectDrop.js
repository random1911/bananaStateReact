import React from 'react'
import PropTypes from 'prop-types'
import Translate from "../Translate/Translate";
import {SelectBody, SelectItem, SelectOption, SelectSeparator} from './DropdownStyled'

const Select = ({useTranslate, closeCallback, items, onSelect, selectedId}) => {
  const renderItems = item => {
    const {separator, name, disabled, id} = item
    if (separator) {
      return (
        <SelectItem key={id}>
          <SelectSeparator />
        </SelectItem>
      )
    }
    const handleClick = () => {
      onSelect(item)
      closeCallback()
    }
    return (
      <SelectItem key={id}>
        <SelectOption onClick={handleClick} disabled={disabled} isSelected={id === selectedId}>
          {useTranslate ? <Translate id={name} /> : name}
        </SelectOption>
      </SelectItem>
    )
  }
  return <SelectBody>{items.map(renderItems)}</SelectBody>
}

Select.propTypes = {
  useTranslate: PropTypes.bool,
  closeCallback: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      value: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      separator: PropTypes.bool,
    }),
  ])).isRequired,
}

export default Select
