
import Image from 'next/image';
import appPreviewImg from '../assets/aplicacao.png';
import logoImg from '../assets/logo.svg';
import avatars from '../assets/avatares.png';
import iconCheckImg from '../assets/iconCheck.svg';
import { api } from '../lib/axios';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({guessCount , poolCount, userCount}: HomeProps) {
  function createPool() {

  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW COPA" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={avatars} alt="avatares" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100" type="text" required placeholder="QUal o nome do seu bolão?" />
          <button className="bg-yellow-500 rounded px-6 py-4 font-bold text-gray-900 text-sm uppercase hover:bg-yellow-600" type="submit">Criar meu bolão</button>
        </form>
        <p className="text-gray-300 mt-4 font-bold text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
          </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6">
          <Image src={iconCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image src={appPreviewImg} quality={100} alt="Exibição da prévia do app" />
    </div>
  )
}

export const getServerSideProps = async () => {

  const [poolCountResponse, guessCountResponse, userCountResponse] =await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])
 
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}

