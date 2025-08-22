import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/lib/utils'

const buttonVariants = cva(
  // base
  'inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-sm font-medium outline-none transition-all active:scale-[.99] disabled:pointer-events-none disabled:opacity-50 ' +
    // radius + shadow tokens
    'rounded-lg [box-shadow:var(--shadow-xs)] ' +
    // svg normalization
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " +
    // focus + invalid (usa tokens ring/destructive)
    'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      variant: {
        // Primary
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',

        // Perigo
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',

        // Borda/Neutro (usa card/background/border tokens)
        outline:
          'border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground ' +
          'dark:bg-transparent dark:hover:bg-input/50',

        // Secundário (usa secondary tokens)
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',

        // Fantasma (sem borda)
        ghost:
          'text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',

        // Link
        link: 'text-primary underline-offset-4 hover:underline',
      },

      size: {
        // 40px alto — Figma “sm”
        sm: 'h-10 px-4 has-[>svg]:px-3 rounded-md',

        // 48px alto — Figma “md”
        default: 'h-12 px-5 has-[>svg]:px-4',

        // 56px alto — Figma “lg”
        lg: 'h-14 px-6 has-[>svg]:px-5 rounded-xl',

        // Ícone quadrado
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {asChild?: boolean}) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({variant, size}), className)}
      {...props}
    />
  )
}

export {Button, buttonVariants}
