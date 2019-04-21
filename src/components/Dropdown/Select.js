import React from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

const Select = props => <Dropdown type="select" {...props} />;

Select.propTypes = {
  useTranslate: PropTypes.bool,
  selected: PropTypes.object,
  closeTimeout: PropTypes.number,
  customHead: PropTypes.func,
  onSelect: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        value: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool
      }),
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        separator: PropTypes.bool
      })
    ])
  ).isRequired,
  headerWidth: PropTypes.string
};

export default Select;
