import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate('/temas')
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {

            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('Tema atualizado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar o Tema!', 'erro')
                }
            }

        } else {

            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('Tema cadastrado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar o Tema!', 'erro')
                }
            }

        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="flex flex-col justify-center items-center mx-auto container">
            <h1 className="my-8 text-4xl text-center">

                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="flex flex-col gap-4 w-1/2"
                onSubmit={gerarNovoTema}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 p-2 rounded"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="flex justify-center bg-indigo-400 hover:bg-indigo-800 mx-auto py-2 rounded w-1/2 text-slate-100"
                    type="submit">

                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
        </div>
    );
}

export default FormTema;