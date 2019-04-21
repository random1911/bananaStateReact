import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

const Translate = ({ t, id, options }) => <Fragment>{t(id, options)}</Fragment>;

Translate.propTypes = {
  t: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.object
};

export default translate("translations")(Translate);
