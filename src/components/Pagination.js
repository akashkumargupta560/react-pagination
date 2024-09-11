import { useEffect, useState } from "react";
import  axios from "axios"
import  './Pagination.css';

 function Pagination(){

    const [tableData, setTableData] = useState();
    const [currentPage, setCurrentPage] = useState(1)
    const [rowPerPage, setRowPage] = useState(10);
    const indexOfLastItem = currentPage * rowPerPage;
    const indexOfFirstItem = indexOfLastItem - rowPerPage;
    const currentItems = tableData?.users?.slice(indexOfFirstItem,indexOfLastItem);
    const totalPage = Math.ceil(tableData?.total/rowPerPage)
    useEffect(() =>{
        axios?.get('https://dummyjson.com/users?limit=0')
        .then((response) =>{
            setTableData(response?.data)
        })
    },[]);

    const handlePrev =() =>{
        setCurrentPage((prev) => Math.max(prev-1,1))
    }
    const handleNext = () =>{
        setCurrentPage((next) => Math.min(next+1, totalPage))
    }
    const handlePageClick = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }
    return(
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>maidenName</th>
                        <th>phone</th>
                        <th>email</th>
                        <th>gender</th>
                        <th>weight</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems?.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.firstName}</td>
                                    <td>{product.lastName}</td>
                                    <td>{product.maidenName}</td>
                                    <td>{product.phone}</td>
                                    <td>{product.email}</td>
                                    <td>{product.gender}</td>
                                    <td>{product.weight}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="pagination">
                <button className="" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                {Array.from({length:totalPage},(_, index) =>(
                    <button className={currentPage === index+1 ? 'active': ''} onClick={() =>handlePageClick(index+1)}>{index+1}</button>
                ))}
                <button className="" onClick={handleNext} disabled={currentPage === totalPage}>Next</button>
            </div>
        </div>
        
    )
}
export default Pagination