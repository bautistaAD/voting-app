import 'bootstrap/js/dist/dropdown';
import "../assets/styles/search.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Search = () => {
  return (
    <div className="search">
        <div className="input-group">
            <div className="form-group">
                <SearchIcon className="search-icon"/>
                <input type="text" id="search" className="search-input" placeholder="Search"/>
            </div>

            <div className="filter-btn">
              <button type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <FilterAltIcon/>
                Filter
              </button>
              <div class="dropdown-menu">
                <option class="dropdown-item" >Action</option>
                <option class="dropdown-item" >Another action</option>
                <option class="dropdown-item" >Something else here</option>
              </div>
            </div>

        </div>
    </div>
  )
}

export default Search