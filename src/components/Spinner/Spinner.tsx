import React from 'react'
import cn from 'classnames'
import styles from './Spinner.module.css'

type Props = {
  className?: string
}

const Spinner: React.FC<Props> = ({ className }) => {
  return <div className={cn(styles.root, className)} />
}

export default Spinner
