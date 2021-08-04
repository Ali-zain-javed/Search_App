import './Result.css';
import Pager from '../Pagination/Pagination.js'
function Result(props) {
    /**
  *In result component result show in table and pagination render 
  *
 */
    const { error = null, result = {}, SearchAgian = () => { } } = props;
    const { items = [], incomplete_results = true, total_count = 0 } = result || {}

    ///this method call on click page number in pagination then this function fetch new Items
    const fetchNewItem = (pageNumber) => {
        props.searchResult("", pageNumber)
    }
    return (
        <div className="Outer">
            {error && <div className="error">{error}</div>}
            <button className="button" style={{
                width: "144px",
                float: "right"
            }} onClick={SearchAgian}>Back to Search</button>
            <table id="user">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>User Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {error == null && items && items.map((item, index) => <tr key={index}>
                        <td><img src={item.avatar_url} alt="loading..." width="100" height="70" /></td>
                        <td>{item.login}</td>
                        <td>{item.type}</td>
                    </tr>)}
                </tbody>
            </table>

            {items.length == 0 && <div style={{ textAlign: "center", marginTop: "20px" }}>No Record Found</div>}
            <div style={{ marginTop: "11px" }}>
                <Pager
                    currentPage={props.pageDetails && props.pageDetails.currentPage || 1}
                    pageLimit={props.pageDetails && props.pageDetails.limit || 30}
                    totalRecords={total_count}
                    onPageChanged={fetchNewItem || {}}
                />
            </div>
        </div>
    );
}

export default Result;
