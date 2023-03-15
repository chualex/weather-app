import { useState } from 'react';
import SearchIcon from "./Icons/search-24.png";
import { Button, Form, Icon, Input } from 'semantic-ui-react';
const Search = ({ onSearch }) => {

    const [searchInput, setSearchInput] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (searchInput) {
            onSearch(searchInput);

            setSearchInput('');
        }
    };

    return (
        <Form className='search-form' onSubmit={onSubmit} >
            <div className='row' >
                <Icon name='search' className='' />
                <Input type='text' placeholder='Search' className='search-input' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <Input type='submit' value='GO' />
            </div>

        </Form>
    );
};

export default Search;
