import * as React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/lib/utils'

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground ' +
    'border border-input bg-background text-base md:text-sm ' +
    'rounded-md shadow-xs outline-none transition-[color,box-shadow] ' +
    'flex w-full min-w-0 px-3 py-1 ' +
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ' +
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ' +
    'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      size: {
        sm: 'h-10', // 40px
        md: 'h-12', // 48px
        lg: 'h-14', // 56px
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

type IconNode =
  | React.ReactNode
  | ((props: {className?: string}) => React.ReactNode)

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  startIcon?: IconNode
  endIcon?: IconNode
  clearable?: boolean
  togglePassword?: boolean
  eyeIcon?: React.ReactNode
  eyeOffIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      type,
      startIcon,
      endIcon,
      clearable = false,
      togglePassword = false,
      eyeIcon,
      eyeOffIcon,
      onChange,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

    const [isPasswordVisible, setPasswordVisible] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(
      () => (props.defaultValue as string)?.length > 0 || false
    )

    const isPassword = togglePassword && type === 'password'
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value?.length > 0)
      onChange?.(e)
    }

    const renderIcon = (icon?: IconNode) =>
      typeof icon === 'function' ? icon({className: 'size-4 shrink-0'}) : icon

    const rightCount =
      Number(Boolean(endIcon)) +
      Number(Boolean(clearable)) +
      Number(Boolean(isPassword))
    const withStart = Boolean(startIcon)
    const pl = withStart ? 'pl-10' : 'pl-3'
    const pr = rightCount >= 2 ? 'pr-16' : rightCount === 1 ? 'pr-10' : 'pr-3'
    const isPlain = !startIcon && !endIcon && !clearable && !isPassword

    const inputEl = (
      <input
        ref={innerRef}
        type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
        data-slot='input'
        className={cn(
          inputVariants({size}),
          isPlain ? '' : [pl, pr],
          className
        )}
        onChange={handleChange}
        {...props}
      />
    )

    if (isPlain) return inputEl

    return (
      <div
        data-slot='input-wrapper'
        className={cn('relative flex items-center', {
          'h-10': size === 'sm',
          'h-12': !size || size === 'md',
          'h-14': size === 'lg',
        })}
      >
        {startIcon && (
          <span
            aria-hidden='true'
            className='absolute left-3 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0'
          >
            {renderIcon(startIcon)}
          </span>
        )}

        {inputEl}

        {endIcon && (
          <span
            aria-hidden='true'
            className={cn(
              'absolute right-3 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0',
              rightCount >= 2 ? 'translate-x-[-1.5rem]' : ''
            )}
          >
            {renderIcon(endIcon)}
          </span>
        )}

        {clearable && (
          <button
            type='button'
            aria-label='Limpar campo'
            onClick={() => {
              if (innerRef.current) {
                innerRef.current.value = ''
                setHasValue(false)
                innerRef.current.dispatchEvent(
                  new Event('input', {bubbles: true})
                )
                innerRef.current.dispatchEvent(
                  new Event('change', {bubbles: true})
                )
                innerRef.current.focus()
              }
            }}
            className={cn(
              'absolute right-3 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              endIcon || isPassword ? 'translate-x-[-1.5rem]' : ''
            )}
            style={{display: hasValue ? 'inline-flex' : 'none'}}
          >
            <svg viewBox='0 0 20 20' fill='currentColor' className='size-4'>
              <path
                fillRule='evenodd'
                d='M10 8.586 5.707 4.293 4.293 5.707 8.586 10l-4.293 4.293 1.414 1.414L10 11.414l4.293 4.293 1.414-1.414L11.414 10l4.293-4.293-1.414-1.414L10 8.586z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        )}

        {isPassword && (
          <button
            type='button'
            aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
            onClick={() => setPasswordVisible((v) => !v)}
            className={cn(
              'absolute right-3 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              endIcon || clearable ? 'translate-x-[-1.5rem]' : ''
            )}
          >
            {isPasswordVisible ? eyeOffIcon : eyeIcon}
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
