import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.css';
import axios from 'axios';

export const CarDetails = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/viewcars');
      const carDetails = response.data.carDetails.map((car) => ({
        ...car,
        bulletPoints: JSON.parse(car.bulletPoints),
      }));
      setCars(carDetails);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deletecars/${id}`);
      fetchCarDetails();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = async (id, updatedData) => {
    try {
      await axios.patch(`http://localhost:8080/updatecars/${id}`, { data: updatedData });
      fetchCarDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditButtonClick = async (id) => {
    const updatedData = {
      color: 'New Color',
      mileage: 'New Mileage',
      price: 'New Price',
    };
    await handleEdit(id, updatedData);
  };
  return (
    <div className="car-details-container">
      <h1 className="title">Car Details</h1>
      <div className="details">
        {cars.map((car) => (
          <Card sx={{ maxWidth: 345 }} key={car._id}>
            {car.image && (
              <CardMedia
                sx={{ height: 200 }}
                image={`http://localhost:8080/uploads/${car.image}`}
                title={car.title}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {car.title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                <b>Color:</b> {car.color}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                <b>Mileage:</b> {car.mileage}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                <b>Price:</b> {car.price}
              </Typography>
             
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {car.bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
            </CardContent>
            <CardActions >
              <Button size="small" className="card-actions" onClick={() => handleEditButtonClick(car._id)}>Edit</Button>
              <Button size="small" className="card-actions" onClick={() => handleDelete(car._id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};
