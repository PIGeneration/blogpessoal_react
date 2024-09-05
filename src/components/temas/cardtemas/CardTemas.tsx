import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

interface CardTemasProps{
    tema: Tema
}

function CardTemas({ tema }: CardTemasProps) {
    return (
        <div className='flex flex-col justify-between border rounded-2xl overflow-hidden'>
            <header className='bg-indigo-800 px-6 py-2 font-bold text-2xl text-white'>
                Tema
            </header>

            <p className='bg-slate-200 p-8 h-full text-3xl'>{tema.descricao}</p>

            <div className="flex">

                <Link to={`/editartema/${tema.id}`}
                    className='flex justify-center items-center bg-indigo-400 hover:bg-indigo-800 py-2 w-full text-slate-100'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`}
                    className='flex justify-center items-center bg-red-400 hover:bg-red-700 w-full text-slate-100'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTemas