import React, {useEffect, useState} from 'react'
import Pagination from '@mui/material/Pagination'
import {Box, Typography, Stack} from '@mui/material'

import {fetchData, exerciseOptions} from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
const Exercises = ({exercises, bodyPart, setExercises}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  useEffect(() => {
    const fetchExercisesData = async () =>{
      let exerciseData = [];
      
      if (bodyPart === 'all'){
        exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises' , exerciseOptions);
      }
      else{
        exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/name/${bodyPart}`, exerciseOptions);
      }
      setExercises(exerciseData);
    }
    fetchExercisesData();
  }, [bodyPart]);

  const paginate = (event, value) =>{
    setCurrentPage(value);

    window.scrollTo({top : 1800 , behavior : 'smooth'})
  }
  return (
    <Box id = "exercises" sx={{mt:{lg : '110px'}}} mt='50px' p='20px'>
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
        <Stack direction='row' sx={{gap : {lg : '110px' , xs : '50px'}}} flexWrap='wrap' justifyContent='center'>
          {currentExercises.map ((exercise, i) =>(
            <ExerciseCard key={i} exercise={exercise} />
          ))}
        </Stack>
        <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
          {exercises.length > 9 &&(
            <Pagination color="standard" shape="rounded" defaultPage={1} count={Math.ceil(exercises.length / exercisesPerPage)} page={currentPage} onChange={paginate} size="large"
            />
          )}
        </Stack>
    </Box>
  )
}

export default Exercises