import React from 'react'
import { compose, withStateHandlers } from 'recompose'

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

const withToggle = Name => compose(
  withStateHandlers(
    {
      [`is${Name}Show`]: false
    },
    {
      [`show${Name}`]: () => () => ({
        [`is${Name}Show`]: true
      }),
      [`hide${Name}`]: () => () => ({
        [`is${Name}Show`]: false
      }),
      [`toggle${Name}`]: state => () => ({
        [`is${Name}Show`]: !state[`is${Name}Show`]
      })
    }
  )
)

export default compose(
  withToggle('World'),
  withToggle('Tooltip')
)(ToggleHelloWorld);
