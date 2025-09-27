
import {useState, useEffect} from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search.jsx';
import Spinner from "./components/Spinner.jsx";
import ExerCard from "./components/ExerCard.jsx";

import barbell from "./assets/barbell.png";

// API = application programming interface - allows one software to talk to another
const API_BASE_URL = "https://exercisedb.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
    }
}

const App = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [errMessage, setErrMessage] = useState('') // store an error message to display
    const [exerciseList, setExerciseList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // give delay, waits for user to stop typing for 500ms before updating searchTerm
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchExercises = async (query) => {
        setLoading(true);

        try {
            const endpoint = `${API_BASE_URL}/exercises?`
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error(`Error fetching exercises: ${response.status}`);
            }

            let data = await response.json();
            data = data.filter((exercise) =>
                exercise.name.toLowerCase().includes(query.toLowerCase()) ||
                exercise.equipment.toLowerCase().includes(query.toLowerCase()) ||
                exercise.target.toLowerCase().includes(query.toLowerCase()))

            if (data.response === false) {
                setErrMessage(data.Error || 'Failed to fetch exercises');
                setExerciseList([]);
                return;
            }

            setExerciseList(data || []);

        } catch (error) {
            console.error(`${error}`);
            setErrMessage(`${error}`);
        } finally {
            setLoading(false);
        }
    }

     useEffect(() => {
        fetchExercises(debouncedSearchTerm);
    }, [debouncedSearchTerm])

    return (
        <main>
                <div className="wrapper">

                    <header className="header">
                        <img src={barbell} alt="barbell" />
                        <h1>Find <span className="title-gradient">Optimal Exercises</span> Fast and Easy</h1>
                        <Search searchTerm={ searchTerm } setSearchTerm={ setSearchTerm }/>
                    </header>
                    <section className="exercises">
                        <h2>Exercises</h2>

                        {isLoading ?
                            (<Spinner />) :
                            errMessage ? (
                                <p className="text-red-500">{errMessage}</p>
                            ) : (
                                <ul>
                                    {exerciseList.map((exercise) => (
                                        <ExerCard exercise={exercise} key={exercise.id} apiOptions={API_OPTIONS} apiBaseURL={API_BASE_URL} />
                                    ))}
                                </ul>
                            )}


                    </section>

                </div>

        </main>
    )
}

export default App;

