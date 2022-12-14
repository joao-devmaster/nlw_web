import Image from "next/image"
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logo from '../assets/logo.svg'
import usersAvatarExempleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from "../lib/axios"
import { FormEvent, useState } from "react"

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}
export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

async function createPool(event: FormEvent){
  event.preventDefault()
  try{
   const response =  await api.post('/pools',{
     title: poolTitle,
    })
    const{ code } = response.data

    await navigator.clipboard.writeText(code)
    setPoolTitle("")
    alert('Bolão criado com sucesso ! o código foi copiado para a area de transferencia')
  }catch (err){
    alert('falha ap criar o bolão tente novamente!')

  }
  console.log(poolTitle, "my console")
}
  return (
   <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
    <main>
      <Image quality={100} src={logo} alt="NLW Copoa"/>
      <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
      <div className="mt-10 flex items-center gap-2">
        <Image quality={100} src={usersAvatarExempleImg} alt=""/>
        <strong className="text-gray-100 text-xl">
          <span className="text-ignite-500">+{props.userCount}</span> pessoas já estão usando 
        </strong>
      </div>
      <form onSubmit={createPool} className="mt-10 flex gap-2">
        <input 
        onChange={event=>setPoolTitle(event.target.value)}
        className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray600 text-sm text-gray-100" 
        type="text" 
        required 
        value={poolTitle}
        placeholder="Qual nome do seu boão"/>
        <button 
        className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
        type="submit">Criar bolão</button>
      </form>
      <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas</p>

     <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">

      <div className="flex items-center gap-6">
        <Image quality={100} src={iconCheckImg} alt=""/>
        <div className="flex flex-col">
          <span className="font-bold text-2xl">
            +{props.poolCount}
          </span>
          <span>
            Bolões criados
          </span>
          </div>
        </div>

        <div className="w-px h-14 bg-gray-600" />

        <div  className="flex items-center gap-6">
          <Image quality={100} src={iconCheckImg} alt=""/>
          <div className="flex flex-col">
            <span className="font-bold text-2xl">+{props.guessCount}</span>
            <span>Palpites enviados</span>
          </div>
        </div>
     </div>
    </main>

    <Image src={appPreviewImg} alt="Dois celulares exibindo uma prévia da aplicação movel do nlw copa"
    quality={100}/>

   </div>
  )
}



  
  

