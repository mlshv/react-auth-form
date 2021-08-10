import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import Spinner from '../Spinner'
import styles from './Button.module.css'

type Props = { inProgress?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = ({ inProgress, children, ...props }) => {
  return (
    <button className={styles.root} {...props}>
      <span className={cn(styles.children, { [styles.transparent]: inProgress })}>{children}</span>
      {inProgress && <Spinner className={styles.spinner} />}
    </button>
  )
}

export default Button
