import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css';

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "7d55240993d1b77ea3dc3eb4539e060f",
                    language: "pt-BR",
                    page: 1,
                }
            })

            setFilmes(response.data.results.slice(0, 10))
            //console.log(response.data.results);
            setLoading(false);
        }

        loadFilmes();

    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {
                    filmes.map((f) => (
                        <article key={f.id}>
                            <strong>{f.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${f.poster_path}`} alt={f.title}/>
                            <Link to={`/filme/${f.id}`}>Acessar</Link>
                        </article>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;