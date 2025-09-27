import { useEffect } from 'react';



const ExerCard = ({exercise:
    {name, target, equipment, instructions, id}, apiOptions, apiBaseURL}) => {
    let imageResponse = "";

    const fetchImages = async () => {
        imageResponse = await fetch(`${apiBaseURL}/image?exerciseId=${id}&resolution=180`, apiOptions);
    }

    useEffect(() => {
        fetchImages();
    }, [])

    return (
        <div className="exercise-card">
            <img src={imageResponse.url} alt={name} />
            <h3 className="name">{name}</h3>

            <div className="content">

                <p className="target">{target}</p>
                <span className="dot">•</span>
                <p className="equipment">{equipment}</p>

                {instructions.map((instruction, index) => {
                    return <p key={index} className="instruction">{`${index + 1}. ${instruction}`}</p>;
                })}
            </div>
        </div>
    )
}

export default ExerCard;