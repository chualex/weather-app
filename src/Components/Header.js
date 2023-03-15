
const Header = ({location}) => {
    return (
        <div className="container">
            <header>
            <h1>{location.name}, {location.region}</h1>
            </header>
        </div>
    )
}

export default Header
