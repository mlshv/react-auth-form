import React from 'react'
import styles from './EmailInput.module.css'

type Props = {
  error?: string | boolean
  innerRef?: React.RefObject<HTMLInputElement>
} & React.HTMLProps<HTMLInputElement>

const EmailInput: React.FC<Props> = ({ error, innerRef, ...props }) => {
  return (
    <input
      className={styles.root}
      ref={innerRef}
      autoComplete="email"
      aria-invalid={Boolean(error)}
      {...props}
    />
  )
}

export default EmailInput
