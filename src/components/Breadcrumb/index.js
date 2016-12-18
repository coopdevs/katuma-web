import React, { PropTypes } from 'react';

const BreadcrumbItem = ({ children, isActive}) => {
  const activeClass = isActive ? 'active' : '';

  return (<li className={activeClass}>{children}</li>);
};

BreadcrumbItem.PropTypes = {
  children: PropTypes.any.isRequired,
  isActive: PropTypes.bool,
};

const Breadcrumb = ({ children }) => {
  return (<ol className="breadcrumb">{children}</ol>);
};

Breadcrumb.PropTypes = {
  children: PropTypes.any.isRequired,
};

export default { Breadcrumb, BreadcrumbItem };
