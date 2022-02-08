import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Input} from 'semantic-ui-react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import RestarauntCard from './RestarauntCard';
import { Link,Route,Routes } from "react-router-dom";
export default function Restaurants(props) {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        axios.get('https://localhost:5001/api/Customer/ViewAllRestaraunts/')
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }
    return (
        <div>
            <Input className='searchbar' icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
            <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {searchInput.length > 1 ? (
                    filteredResults.map((item,index) => {
                        return (
                            <RestarauntCard userId={props.id} restaurantId={item.restaurantId} restaurantName={item.restaurantName} city={item.city} phoneNumber={item.phoneNumber} key={index} item={item}/>
                        )
                    })
                ) : (
                    APIData.map((item,index) => {
                        return (
                            <RestarauntCard userId={props.id} restaurantId={item.restaurantId} restaurantName={item.restaurantName} city={item.city} phoneNumber={item.phoneNumber} key={index} item={item}/>
                        )    
                    })
                )}
                </Grid>
                </Container>
        </div>
    )
}