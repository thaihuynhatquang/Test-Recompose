import React from 'react'
import { compose, withHandlers, withState, renameProp } from 'recompose'

const ToggleHelloWorld = props => {
  const {
    isWorldShow,
    showWorld,
    hideWorld,
    toggleWorld,
    isTooltipShow,
    showTooltip,
    hideTooltip
  } = props
  return <div>
    {isWorldShow && 'Hello world'}
    <button onClick={showWorld}>Show</button>
    <button onClick={hideWorld}>Hide</button>
    <button onClick={toggleWorld}>Toggle</button>

    <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>Hover me!</div>
    {isTooltipShow && <div>Yay!</div>}
  </div>
}

const withToggle = compose(
  withState(
    'status',
    'setStatus',
    false
  ),
  withHandlers({
    show: ({ setStatus }) => () => setStatus(true),
    hide: ({ setStatus }) => () => setStatus(false),
    toggle: ({ setStatus, status }) => () => setStatus(!status)
  }),
  renameProp(
    'status',
    'isShow'
  )
)

export default withToggle(ToggleHelloWorld);
