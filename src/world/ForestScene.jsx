import PropTypes from 'prop-types';
import { Component, Suspense, lazy } from 'react';
import { useJourney } from './useJourney';

const ForestCanvas = lazy(()=>import('./ForestCanvas'));

class SceneBoundary extends Component {
  state={failed:false};
  static getDerivedStateFromError() {return {failed:true};}
  componentDidCatch() {this.props.onFailure();}
  render() {return this.state.failed?null:this.props.children;}
}

export default function ForestScene() {
  const { active, reducedMotion, quality, webgl, reportSceneFailure } = useJourney();
  return <div className='forest-world observatory-world' data-chapter={active} data-quality={quality} data-motion={reducedMotion?'still':'animated'} data-webgl={webgl?'available':'fallback'} aria-hidden='true'>
    <div className='forest-fallback' /><div className='forest-vignette' /><div className='forest-reading-shade' /><div className='forest-twilight' />
    {webgl && <SceneBoundary onFailure={reportSceneFailure}><Suspense fallback={null}><ForestCanvas /></Suspense></SceneBoundary>}
    <div className='film-grain' />
  </div>;
}
SceneBoundary.propTypes={children:PropTypes.node.isRequired,onFailure:PropTypes.func.isRequired};
