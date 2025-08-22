'use client'

import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {toast} from 'sonner'

import {createClient} from '@/lib/supabase/client'
import {signUpSchema, signUpType} from '@/lib/validations/auth'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent} from '@/components/ui/card'

import EyeIcon from '@/icons/eye.svg'
import EyeOffIcon from '@/icons/eye-off.svg'
import DNMSTechHubLogo from '../dnms-tech-hub-logo'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
  })

  const handleSignUp = async (data: signUpType) => {
    const {email, password, confirmPassword} = data
    const supabase = createClient()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const {error} = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/feed`,
        },
      })

      if (error) throw new Error(error.message)

      router.push('/')
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ops, alguma coisa deu errado. Por favor, tente novamente!'
      )
    }
  }

  return (
    <div
      className='size-full flex items-center justify-center p-4'
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1920 1024\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(96 1.5614e-14 7.303e-14 51.2 960 512)\\\'><stop stop-color=\\\'rgba(246,233,254,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(201,170,243,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(246,233,254,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')",
      }}
    >
      <Card className='w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg'>
        <CardContent className='p-0'>
          <div className='flex flex-row'>
            <div className='flex-1 p-6'>
              <div className='max-w-md mx-auto space-y-6'>
                <DNMSTechHubLogo className='h-12 w-[41px]' />
                <div className='space-y-1'>
                  <h1 className='text-xl font-medium text-[#090909]'>
                    Crie sua conta e comece a colaborar
                  </h1>
                  <p className='text-sm text-[#5d5d5d]'>
                    Comece hoje a fazer parte do movimento que une fé e
                    tecnologia.
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(handleSignUp)}
                  className='space-y-5'
                >
                  <div className='space-y-3'>
                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-[#5d5d5d]'>
                        E-mail
                      </Label>
                      <Input
                        {...register('email')}
                        type='email'
                        placeholder='Digite seu e-mail'
                        className='border-[#e7e7e7] text-sm placeholder:text-[#5d5d5d]'
                      />
                      {errors.email && (
                        <p className='text-sm text-red-800'>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-[#5d5d5d]'>
                        Senha
                      </Label>
                      <div className='relative'>
                        <Input
                          {...register('password')}
                          type='password'
                          placeholder='********'
                          className='border-[#e7e7e7] text-sm placeholder:text-[#5d5d5d] pr-10'
                          eyeIcon={EyeIcon}
                          eyeOffIcon={EyeOffIcon}
                        />
                        {errors.password && (
                          <p className='text-sm text-red-800'>
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-[#5d5d5d]'>
                        Repita sua senha
                      </Label>
                      <div className='relative'>
                        <Input
                          {...register('confirmPassword')}
                          type='password'
                          placeholder='********'
                          className='border-[#e7e7e7] text-sm placeholder:text-[#5d5d5d] pr-10'
                          eyeIcon={EyeIcon}
                          eyeOffIcon={EyeOffIcon}
                        />
                        {errors.confirmPassword && (
                          <p className='text-sm text-red-800'>
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <Link
                      href={'/forgot-password'}
                      className='text-sm text-[#6100e5] underline hover:no-underline'
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className='space-y-3'>
                    <Button
                      type='submit'
                      className='w-full h-12 bg-[#ba92ee] hover:bg-[#a67ee6] text-[#090909] font-medium'
                    >
                      Cadastrar
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      asChild
                      className='w-full h-12 border-[#e7e7e7] text-[#5d5d5d] font-medium hover:bg-gray-50'
                    >
                      <Link href={'/login'}>Entrar</Link>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex-1 relative min-h-[500px]'>
              <div
                className='absolute inset-0 bg-cover bg-center rounded-lg'
                style={{backgroundImage: `url('/jesus.png')`}}
              >
                <div
                  className='absolute inset-0 flex items-center justify-center'
                  style={{
                    transform: 'rotate(143.59deg)',
                  }}
                >
                  <div
                    className='w-full h-[386px] flex items-center justify-center'
                    style={{
                      transform: 'rotate(13.708deg)',
                    }}
                  >
                    <div
                      className='w-full h-[386px] flex items-center justify-center'
                      style={{
                        transform: 'rotate(53.44deg)',
                      }}
                    >
                      <div className='w-full h-[386px]' />
                    </div>
                  </div>
                </div>
                <div className='absolute bottom-5 right-5 bg-white p-4 rounded w-[362px] shadow-lg'>
                  <h3 className='font-semibold text-[#090909] text-sm mb-1'>
                    Colossenses 3:23
                  </h3>
                  <p className='text-sm text-[#5d5d5d]'>
                    {`"Tudo o que fizerem, façam de todo o coração, como para o
                    Senhor, e não para os homens."`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
