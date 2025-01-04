//näyttää yhden tv sarjan
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Episodes from '../components/Episodes';
import Cast from '../components/Cast';
import ShowDetails from '../components/ShowDetails';

function ShowPage() {
    const { showid } = useParams();
    const navigate = useNavigate();
    const [, setSelectedSeason] = useState(1); 
    const [displayEpisodes, setDisplayEpisodes] = useState(true); 
    const [displayCast, setDisplayCast] = useState(false); 

    const goBack = () => {
        navigate(-1); 
    };

    const handleFetchEpisodes = () => {
        setDisplayEpisodes(true); 
        setDisplayCast(false); 
    };

    const handleFetchCast = () => {
        setDisplayEpisodes(false); 
        setDisplayCast(true); 
    };
    
    return (
        <div className='showpage'>
            <button className='button' onClick={goBack}>← Takaisin</button>
            <ShowDetails showid={showid} />
            <div className='buttons'>
                <button className='button' onClick={handleFetchEpisodes}>Jaksot</button>
                <button className='button' onClick={handleFetchCast}>Näyttelijät</button>
            </div>
            {displayEpisodes ? (
                <Episodes showid={showid} setSelectedSeason={setSelectedSeason} />
            ) : null}
            {displayCast ? (
                <Cast showid={showid} />
            ) : null}
        </div>
    );
}

export default ShowPage;
