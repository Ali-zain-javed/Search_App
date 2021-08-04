import { useState } from 'react'
import Result from './Result/Result.js'
import Search from './Search/Search.js'

function MainComponent() {
    /**
    *state managed through hooks ,in which search flag and result will save
    *In Error response error will handle 
   */
    const [appState, setAppState] = useState({
        searched: false,
        result: [],
        error: null,
    })
    //In this state search username will save 
    const [searchString, setSearchString] = useState("")
    //In hooks page details will save 
    const [pageDetail, setPageDetail] = useState({
        currentPage: 1,
        limit: 20,
    })
    const SearchAgian = () => {
        setAppState({ searched: false, result: {}, error: null })
    }

    /**
  *In this method search against username will handle 
  *and on chnage page number ,this method will again call then save result and pass to reult component
 */
    const searchResult = (userName = "", pageNumber = 1) => {
        if (userName !== "") {
            setSearchString(userName)
        }
        else {
            setPageDetail({ ...pageDetail, currentPage: pageNumber })
            userName = searchString;
        }
        try {
            fetch(`https://api.github.com/search/users?q=${userName}&&page=${pageNumber}&&per_page=${pageDetail.limit}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        ///in case of error in result then error will show
                        if (result.message) {
                            setAppState({ ...appState, error: result.message })
                        }
                        ///succefull result saved in result state will pass in result component
                        else {
                            setAppState({ error: null })
                            setAppState({ result: result, searched: true })
                        }

                    },
                    // Note: it's important to handle errors here
                    //errors will save in hooks state and will pass to child components
                    (error) => {
                        setAppState({ error: "Failed To Search", searched: false })
                    }
                )
        }
        catch (ex) {
            setAppState({ error: ex, searched: false })
        }
    }
    return (
        <div className="App">
            {appState.searched === false && <Search error={appState.error} searchResult={searchResult} />}
            {appState.searched === true && <Result result={appState.result} SearchAgian={SearchAgian} pageDetails={pageDetail} error={appState.error} searchResult={searchResult} />}
        </div>
    );
}

export default MainComponent;
