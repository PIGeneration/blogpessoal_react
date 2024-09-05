import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate()

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if(usuario.token !== ''){
            navigate("/home")
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        handleLogin(usuarioLogin)
    }

    console.log(JSON.stringify(usuarioLogin))

    return (
        <>
            <div className="place-items-center grid grid-cols-1 lg:grid-cols-2 h-screen font-bold">

                <form className="flex flex-col justify-center items-center gap-4 w-1/2" 
                    onSubmit={login}
                >
                    <h2 className="text-5xl text-slate-900">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 p-2 rounded"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 p-2 rounded"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="flex justify-center bg-indigo-400 hover:bg-indigo-900 py-2 rounded w-1/2 text-white">

                         {isLoading ?

                            <RotatingLines
                                strokeColor='white'
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />

                            :

                            <span>Entrar</span>

                        }
                        
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}

                        <Link to='/cadastro' className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="lg:block hidden fundoLogin"></div>
            </div>
        </>
    );
}

export default Login;