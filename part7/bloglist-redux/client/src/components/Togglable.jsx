import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { StyledButton } from './styledComponents'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <div style={showWhenVisible}>
        <StyledButton onClick={toggleVisibility}>cancel</StyledButton>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable