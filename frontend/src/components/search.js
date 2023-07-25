import 'bootstrap/js/dist/dropdown';
import "../assets/styles/search.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = (prop) => {
  const onChange = prop.onChange;

  return (
    <div className="search">
        <div className="input-group">
            <div className="form-group">
                <SearchIcon className="search-icon"/>
                <input type="text" id="search" className="search-input" placeholder="Search" onChange={onChange}/>
            </div>
        </div>
    </div>
  )
}

export default Searchbar