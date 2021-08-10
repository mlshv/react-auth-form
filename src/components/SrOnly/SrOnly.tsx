import React from 'react'
import styles from './SrOnly.module.css'

type Props = {
  as?: keyof JSX.IntrinsicElements
} & React.HTMLAttributes<HTMLOrSVGElement>

const SrOnly: React.FC<Props> = ({ as, ...props }) => {
  const Tag = as ?? 'div'

  return <Tag aria-live="polite" className={styles.root} {...props} />
}

export default SrOnly
