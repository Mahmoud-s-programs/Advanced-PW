import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';

const SpatialView = lazy(()=>import('../../world/SpatialView'));

export default function SpatialStage({ fallback, className='', ...props }) {
  return <Suspense fallback={<div className={`spatial-stage spatial-loading ${className}`}>{fallback}</div>}><SpatialView {...props} fallback={fallback} className={className} /></Suspense>;
}
SpatialStage.propTypes = { fallback:PropTypes.node,className:PropTypes.string };
