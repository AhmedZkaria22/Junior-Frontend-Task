import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';



function ListView() {

    const [pagNum, setPagNum] = useState(0);
    
    const screenLmts = [7, 16, 7, 8, 0];

    const [dataList, setData] = useState([]);

    const [lis, setLis] = useState(false);


    	
    const fetchData = async () => {
        await axios.get('https://staging.algym.com/api/v1/gyms')
            .then(response => {
                setData(response.data.data);
            }).catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        setLis(true);
        fetchData();
        console.log(dataList);
    }, [lis]);


    /*const finalDt = [
        ...dataList, ...dataList, ...dataList, ...dataList,
        ...dataList, ...dataList, ...dataList, ...dataList,
        ...dataList, ...dataList, ...dataList
    ];*/
    // to test pagination use finalDt[] instead of dataList[]
    // finalDt = many rest of dataList array because dataList is small (length = 2)

  return (
    <div id='ListView'>
        <p className='ListViewHead'>All</p>


        <div className="ListViewItems">
            { dataList.map( (itm, l) =>
                (l >= pagNum && l <= pagNum+screenLmts[0] && l < dataList.length) &&
                    <Link to={`/gyms/${itm.id}`} className="gymItem" key={l}>
                        <div className="gymItem_content">
                            <img src={itm.logo_img_url} alt="" />
                            <p>{itm.name}</p>
                        </div>
                        
                        {
                            itm.is_hot_deal && <p>Hot Deals</p>
                        }
                    </Link>
            ) }
        </div>

        <div className="btnLocation"></div>
        
        <Pagination>
            <Pagination.Prev onClick={ () => setPagNum( (prevPag => (prevPag-screenLmts[3] <= screenLmts[4]) ? screenLmts[4] : prevPag-screenLmts[3] ) ) }
                className={ `${pagNum === 0 ?'paginationDisable' :''}`}> {'< PREVIOS'} </Pagination.Prev>
            
            <Pagination.Item onClick={ () => setPagNum( 0 ) } 
                className={`${pagNum === 0 ?'active' :''}`}>{1}</Pagination.Item>
            <Pagination.Item onClick={ () => setPagNum( screenLmts[3] ) } 
                className={ `${pagNum === screenLmts[3] || pagNum === dataList.length-2 - screenLmts[2]*2 ?'active' :''} ${dataList.length < screenLmts[3]+1 && 'paginationDisable'}` }>{2}</Pagination.Item>
            <Pagination.Item onClick={ () => setPagNum( screenLmts[3]*2 ) } 
                className={`${pagNum === screenLmts[3]*2 || pagNum === dataList.length-1 - screenLmts[2] ?'active' :''} ${dataList.length < (screenLmts[3]*2)+1 && 'paginationDisable'}`}>{3}</Pagination.Item>
            
            <Pagination.Next onClick={ () => setPagNum( (prevPag => (prevPag+screenLmts[1] > dataList.length-1) ? dataList.length-1 - screenLmts[2] : prevPag+screenLmts[3] ) ) }
                className={ `${pagNum >= dataList.length-1 - screenLmts[2] ?'paginationDisable' :''}`}> {'NEXT >'} </Pagination.Next>
        </Pagination>
    </div>
  )
}

export default ListView