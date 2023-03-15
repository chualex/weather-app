const SavedLocations = ({ locations, onSaveLocationClcked }) => {
    return (
        <>
            {locations.map((location, index) => (<h3 key={index} style={{cursor: "pointer"}} onClick={() => onSaveLocationClcked(location)}>{location.name}, {location.region}</h3>))}
        </>
    )
}

export default SavedLocations
