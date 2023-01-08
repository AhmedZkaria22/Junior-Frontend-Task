import React, { useEffect, useMemo, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import gym from '../../../assets/images/gym.svg';
import { Accordion, Breadcrumb, Pagination, useAccordionButton } from 'react-bootstrap';
import axios from 'axios';

import '../../../style/pages/gym.css';

// CustomToggle : functional componet to add custom accordion toggle
function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, (event) =>
        event.target.classList.toggle('collapsed')
    );
  
    return (
      <button
        type="button"
        className='accordion-button'
        onClick={(e) => decoratedOnClick(e)}
      >
        {children}
      </button>
    );
}



function Gym() {

    const [id, setId] = useState(null);
    useMemo( () => {    
        if(window !== undefined){
            setId( parseInt(
                window.location.href.trim().slice(window.location.href.trim().lastIndexOf('/')+1, window.location.href.trim().length)
            ) );
        }
        console.log(id);
    }, [])


    const [data, setData] = useState([]);
    const [dataClasses, setDataClasses] = useState([]);

    const [lis, setLis] = useState(false);
        
    const fetchData = async () => {
        await axios.get(`https://staging.algym.com/api/v1/gyms/${id}`)
            .then(response => {
                setData(response.data.data);
            }).catch(error => {
                console.log(error);
            })
    }



    // await axios.get(`https://staging.algym.com/api/v1/gyms/${id}/gym_classes`)
    // prev api end point not get data : data = [] , id = id of info tab to each item
    
    // so i used the following        
    const fetchDataClasses = async () => {
        await axios.get(`https://staging.algym.com/api/v1/gyms/1/gym_classes`)
            .then(response => {
                console.log( response.data.data );
                setDataClasses(response.data.data);
            }).catch(error => {
                console.log(error);
            })
    }
  


    useEffect(() => {
        setLis(true);
        fetchData();
        fetchDataClasses();        
    }, [lis]);
    

  return (
    <div id='Gym_Details' className='gymDetails'>
        <div className="gymDetails_header">
            
            <Breadcrumb className='header_bread'>
                <>{ typeof dataClasses[0] !== 'undefined' && 
                    <Breadcrumb.Item href="/">{`${dataClasses[0]['class_type']} gym`}</Breadcrumb.Item>
                }</>
                <Breadcrumb.Item active>{data.name}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="headerWrap">
                <div className="header_bio">
                    <div className="header_bio_fig">
                        <img src={data.logo_img_url}  alt='img' />
                    </div>
                    <div className="header_bio_content">
                        <h2>{data.name}</h2>
                        <p>
                            <img src={data.logo_img_url}  alt='img' />
                            {data.district}
                        </p>
                    </div>
                </div>

                <button className='header_btn'>becoma a member</button>
            </div>
        </div>

        <>{ typeof dataClasses[0] !== 'undefined' && console.log(data, dataClasses[0], dataClasses[0]['class_type'])}</>


        <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">

            <Tab eventKey="info" title="Info" className='infoTab'>
                <h3>General info.</h3>
                <div className="infoWrap">
                    <div className="infoWrap_container">
                        <div className="infoWrap_item">
                            <img src={gym} alt="" />
                            <p className="infoWrap_item_head">Location</p>
                            <p>{data.address}</p>
                        </div>
                        <div className="infoWrap_item">
                            <img src={gym} alt="" />
                            <p className="infoWrap_item_head">Members should be</p>
                            <p>{data.gender_type}</p>
                        </div>
                    </div>

                    <>{
                        typeof data.gym_hours !== 'undefined' &&
                        data.gym_hours.filter( (item) => item.from !== null ).length !== 0 &&
                        <>
                        <div className="infoWrap_item">
                            <img src={gym} alt="" />
                            <p className="infoWrap_item_head">Opening hours</p>
                            {
                                data.gym_hours && data.gym_hours.map( (hr, h) => {
                                    return(
                                        hr.gym_hour_days.filter( (item) => item.day !== null ).length !== 0 &&
                                        <p className='infoWrap_item_contFlx'>
                                            <span>{
                                                hr.gym_hour_days.map( (dys, d) => {
                                                    return(
                                                        <span>{dys.day}{d !== hr.gym_hour_days.length - 1 && ', '}</span>
                                                    )
                                                } )
                                            }</span>
                                            
                                            <span>{hr.from}</span>
                                        </p>

                                    )
                                } )
                            }
                        </div>
                        </>
                    }</>
                </div>

                {
                    typeof data.description !== null &&                    
                    <>
                        <h3>About {data.name}</h3>
                        <p className='aboutDesc'>{data.description}</p>
                    </>
                }

                <>{
                    typeof data.tags !== 'undefined' &&
                    data.tags.filter( (item) => item.name !== null ).length !== 0 &&
                    <>
                
                    <h3>Tags</h3>
                    <div className="tagsWrap">
                        {
                            data.tags && data.tags.map( (tg, t) => {
                                return(
                                    tg.name !== null && <span>{tg.name}</span>
                                )
                            } )
                        }
                    </div>
                    </>
                }</>

                <>{
                    typeof data.facilities !== 'undefined' &&
                    data.facilities.filter( (item) => item.name !== null ).length !== 0 &&
                    <>

                    <h3>Facilities</h3>
                    <div className="facilitiesWrap">
                        {
                            data.facilities.map( (fct, f) => {
                                return(
                                    fct.name !== null &&
                                    <div className="facility" key={f}>
                                        <div className="facility_img">
                                            <img src={fct.icon_url} alt="" />
                                        </div>
                                        <p>{fct.name}</p>
                                    </div>
                                )
                            } )

                        }
                    </div>

                    </>
                }</>

                <>{
                    typeof data.gym_social_medias !== 'undefined' &&
                    data.gym_social_medias.filter( (item) => item.social_media_url !== null ).length !== 0 &&
                    <>
                    <h3>Contact us</h3>                                
                    <div className="socialWrap">
                        {
                            data.gym_social_medias.map( (cnt, c) => {
                                return(
                                    cnt.social_media_url !== null &&
                                    <a className="social" key={c} href={cnt.social_media_url}>
                                        <img src={cnt.icon_url} alt="" />
                                    </a>
                                )
                            } )
    
                        }
                    </div>     
                    </>
                }</>

            </Tab>

            <Tab eventKey="photos" title="Photos" disabled></Tab>

            <Tab eventKey="classes" title="Classes" className='classesTab'>    
                <Accordion>
                    <>{
                        dataClasses.map( (dcl, d) => {
                            return(
                                typeof dcl !== 'undefined' &&
                                <div className='accordion-item' key={d}>
                                    <div className="accordion-head">
                                        <h3>{dcl.name}</h3>
                                        <p className='Places'>3 Places remaining</p>
                                        <p className='Description'>{dcl.description}</p>
                                        <div className="sessionsCount">
                                            <p className='count'>{dcl.sessions_number} Sessions</p>
                                            <p className='price'>{dcl.price} SAR</p>
                                        </div>
                                        <CustomToggle eventKey="0"></CustomToggle>
                                    </div>

                                    <Accordion.Collapse eventKey='0'>
                                    <div className='accordion-body'>
                                        <p className="sessionConsume">
                                            Sessions should be consumed within <span>{dcl.consume_within} Months</span>
                                        </p>
                                        <div className="sessionSchedule">
                                            <p>Schedule</p>
                                            <div className="sessionSchedule_container">
                                            {
                                                dcl.gym_class_hours && dcl.gym_class_hours.map( (hr, h) => {
                                                    return(
                                                        <div className="sessionSchedule_item">                                                
                                                            <div className="schedule_days">{
                                                                hr.gym_class_hour_days.map( (dys, d) => {
                                                                    return(
                                                                        <span>{dys.day}{d !== hr.gym_class_hour_days.length - 1 && ', '}</span>
                                                                    )
                                                                } )
                                                            }</div>
                                                            <div className="schedule_time">{hr.from}</div>
                                                        </div>
            
                                                    )
                                                } )
                                            }
            
                                            </div>
                                        </div>
                                    </div>
                                    </Accordion.Collapse>

                                    <button className='classJoin'>join now</button>
                                </div>
                                )
                        } )
                    }</>

                    <Pagination>
                        <Pagination.Prev className='paginationDisable'> {'< PREVIOS'} </Pagination.Prev>
                        <Pagination.Item className='active'> 1 </Pagination.Item>
                        <Pagination.Next className='paginationDisable'> {'NEXT >'} </Pagination.Next>
                    </Pagination>
                </Accordion>


            </Tab>
                        
            <Tab eventKey="packeges" title="Packeges" disabled></Tab>
            <Tab eventKey="reviews" title="Reviews" disabled></Tab>
                
        </Tabs>

    </div>
  )
}

export default Gym