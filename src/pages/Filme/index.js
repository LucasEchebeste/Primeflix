import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './filme-info.css';
import { toast } from 'react-toastify';

import api from '../../services/api';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "7d55240993d1b77ea3dc3eb4539e060f",
                    language: "pt-BR",
                }
            })
            .then((response)=> {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {
                console.log('filme nao encontrado');
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log('componente foi desmontado');
        }

    }, [navigate,  id])

    const salvarFilme = () => {
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
   
        if(hasFilme){
            toast.warn("Esse filme já está na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
   
    }

    if(loading){
        <div className="filme-info">
            <h1>Carregando detalhes...</h1>
        </div>
    }

    return(
        <div className="filme-info"><h1>{filme.title}</h1>

            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} rel="external" target="blank">
                        Trailer
                    </a>
                </button>
            </div>
        
        </div>
    )
}

export default Filme;