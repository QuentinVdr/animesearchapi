import React, {useState} from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

    const [searchValue, setSearchValue] = useState("");
    const [animes, setAnimes] = useState({});

    function searchAnimeByName() {
        const url = "https://api.jikan.moe/v4/anime?q="+searchValue;
        axios.get(url)
            .then(function(res) {
                setAnimes(res.data.data);
                console.log(res);
            })
            .catch(function(err) { console.log(err) });
    }

    return (
        <div className="App container">
            <div>
                <h1>Search anime by name</h1>
                <label>
                    Name :
                    <input type="text" onChange={e => setSearchValue(e.target.value)}></input>
                </label>
                <button onClick={e => searchAnimeByName()}>Search</button>
            </div>
            <br/>
            { JSON.stringify(animes) !== '{}' ?
                <>
                <row className={"row"}>
                    {animes.map((anime) => {
                        return (
                            <Card className={"card"} border="dark">
                                <Card.Img variant="top" src={anime.images.jpg.image_url}/>
                                <Card.Body>
                                    <Card.Title><b><u>{anime.title}</u></b></Card.Title>
                                    <Card.Text><b>Rating</b> : {anime.rating}</Card.Text>
                                    <Card.Text><b>Duration</b> : {anime.aired.string}</Card.Text>
                                    <Card.Text>For more information : <a href={anime.url} target="_blank" rel="noreferrer">MyAnimeList</a></Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </row>
                </> : <></> }
        </div>
    )
}

export default App;
