import React,{ useState } from 'react';
import './Search.css';

function SearchComponent(props) {
  /**
 *In search component username serach and pass to Main component container
 *
*/
  const { error = null } = props;
  const [userName, setUserName] = useState("")

  ///this method set username
  const setUserNameMethod = (e) => {
    setUserName(e.target.value)
  }
  //this method submit the search string to parent mthod search result
  const Submit = (e) => {
    const { searchResult = () => { } } = props;
    searchResult(userName)
    e.preventDefault();
  }
  return (
    <div className="App">
      {error && <div className="error">{error}</div>}
      <form onSubmit={Submit}>
        <div className="container">
          <label><b>Username</b>
            <input type="text" placeholder="Enter Username" name="uname" required value={userName} onChange={setUserNameMethod}></input></label>
          <button type="submit" >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SearchComponent;
