import React, { useState } from 'react'
import cn from 'classnames'

import { CrossedEyeIcon, EyeIcon } from '../icons'
import styles from './PasswordInput.module.css'
import SrOnly from '../SrOnly'

type Props = {
  error?: string | boolean
  innerRef?: React.RefObject<HTMLInputElement>
} & React.HTMLProps<HTMLInputElement>

const PasswordInput: React.FC<Props> = ({ error, innerRef, ...props }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  return (
    <div className={styles.passwordInputWrap}>
      <SrOnly as="p" id="password-text">
        {isPasswordShown ? 'Password shown.' : 'Password hidden.'}
      </SrOnly>
      <input
        className={styles.passwordInput}
        ref={innerRef}
        type={isPasswordShown ? 'text' : 'password'}
        autoComplete="current-password"
        aria-required="true"
        aria-describedby="password-alert"
        aria-invalid={Boolean(error)}
        {...props}
      />

      <button
        className={cn(styles.showPasswordButton, { [styles.hidden]: !props.value })}
        type="button"
        role="switch"
        tabIndex={props.value ? 0 : -1}
        aria-checked={isPasswordShown}
        title={isPasswordShown ? 'Hide password' : 'Show password'}
        aria-label={isPasswordShown ? 'Hide password' : 'Show password'}
        onClick={(e) => {
          e.preventDefault()
          setIsPasswordShown((v) => !v)
        }}
      >
        {isPasswordShown ? <CrossedEyeIcon /> : <EyeIcon />}
      </button>
    </div>
  )
}

export default PasswordInput
