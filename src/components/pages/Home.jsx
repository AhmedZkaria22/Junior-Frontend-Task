import React from 'react'
import { Button, Form } from 'react-bootstrap';

import '../../style/pages/home.css'
import ListView from './ListView';

function Home() {
  return (
    <section id="Home">
        <div className="homeNav">
            <Form className="d-flex searchForm">
                <Form.Control type="search" placeholder="Search by gym name, facilities"
                    className="me-2" aria-label="Search"
                />
                <Button className='filterBtn invColor'>filter</Button>
                <Button variant="outline-success" className='submitBtn' type='submit'>Find Gyms</Button>
            </Form>

            <Button className='switchBtn'>switch to map view</Button>
        </div>        

        <ListView />
    </section>
  )
}

export default Home