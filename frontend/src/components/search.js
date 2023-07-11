import 'bootstrap/js/dist/dropdown';
import "../assets/styles/search.css"
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <div className="search">
        <div className="input-group">
            <div className="form-group">
                <SearchIcon className="search-icon"/>
                <input type="text" id="search" className="search-input" placeholder="Search"/>
            </div>

            <div class="btn-group">
              <button type="button" class="btn btn-danger" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action
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