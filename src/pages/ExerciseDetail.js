import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {fetchData, exerciseOptions, youtubeOptions} from '../utils/fetchData';
import { Box } from '@mui/material'
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentMuscleExercises, setEquipmentMuscleExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,exerciseOptions);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExerciseData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,exerciseOptions);
      setTargetMuscleExercises(targetMuscleExerciseData);

      const equipmentMuscleExerciseData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,exerciseOptions);
      setEquipmentMuscleExercises(equipmentMuscleExerciseData);
      
    }
    fetchExerciseData()
  }, [id])
  return (
    <Box>
      <Detail exerciseDetail = {exerciseDetail} />
      <ExerciseVideos exerciseVideos = {exerciseVideos} name = {exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises = {targetMuscleExercises} equipmentMuscleExercises = {equipmentMuscleExercises} />
    </Box>
  )
}

export default ExerciseDetail