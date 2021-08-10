import React, { useRef, useEffect, useCallback } from 'react'
import { Formik, Field, Form, FormikHelpers, FieldProps } from 'formik'

import { NetworkError, ValidationError } from '../../errors'
import Button from '../Button'
import PasswordInput from '../PasswordInput'
import styles from './AuthForm.module.css'
import EmailInput from '../EmailInput'

export type AuthFormValues = {
  email: string
  password: string
  formError?: undefined
}

type Props = {
  initialValues?: AuthFormValues
  onSubmit: (values: AuthFormValues) => Promise<void>
}

const AuthForm: React.FC<Props> = ({
  initialValues = {
    email: '',
    password: '',
  },
  onSubmit,
}) => {
  const rootRef = useRef<HTMLFormElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailInputRef?.current?.focus()
  }, [])

  const shakeForm = useCallback(() => {
    rootRef.current?.classList.add(styles.shake)

    setTimeout(() => {
      rootRef.current?.classList.remove(styles.shake)
    }, 400)
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validate={(values) => {
        if (!values.email) {
          return { formError: 'Please enter email' }
        }

        if (values.email.search(/@/) === -1) {
          return { formError: 'Please enter valid email' }
        }

        if (!values.password) {
          return { formError: 'Please enter password' }
        }

        return {}
      }}
      onSubmit={async (values: AuthFormValues, { setSubmitting, setErrors }: FormikHelpers<AuthFormValues>) => {
        try {
          await onSubmit(values)
        } catch (e) {
          console.error(e)

          shakeForm()

          if (e instanceof ValidationError) {
            setErrors({ formError: e.message })
          } else if (e instanceof NetworkError) {
            setErrors({ formError: 'There was a network error, please try again' })
          } else {
            setErrors({ formError: 'Something went wrong' })
          }
        }

        setSubmitting(false)
      }}
    >
      {({ isSubmitting, validateForm, handleSubmit }) => (
        <Form ref={rootRef}>
          <h1>Sign in</h1>
          <Field name="email">
            {({ field, meta }: FieldProps<string>) => (
              <div className={styles.fieldWrap}>
                <label>
                  <span className={styles.fieldLabel}>Email</span>
                  <EmailInput
                    aria-required="true"
                    innerRef={emailInputRef}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        passwordInputRef?.current?.focus()
                      }
                    }}
                    {...field}
                  />
                </label>
              </div>
            )}
          </Field>
          <Field name="password">
            {({ field, meta }: FieldProps<string>) => (
              <div className={styles.fieldWrap}>
                <label>
                  <span className={styles.fieldLabel}>Password</span>
                  <PasswordInput
                    aria-required="true"
                    innerRef={passwordInputRef}
                    error={meta.touched && meta.error}
                    {...field}
                  />
                </label>
              </div>
            )}
          </Field>
          <Field name="formError">
            {({ form, meta }: FieldProps) =>
              form.touched && meta.error ? (
                <div role="alert" aria-atomic="true" id="email-alert" className={styles.validationErrorText}>
                  {meta.error}
                </div>
              ) : (
                <div className={styles.validationErrorPlaceholder} />
              )
            }
          </Field>
          <Button
            inProgress={isSubmitting}
            type="submit"
            onClick={async (e) => {
              e.preventDefault()

              if (!isSubmitting) {
                await validateForm().then(({ formError }) => {
                  if (formError) {
                    shakeForm()
                  }
                })

                handleSubmit()
              }
            }}
          >
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AuthForm
