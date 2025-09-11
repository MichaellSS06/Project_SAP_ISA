import axios from 'axios';

const sapApi = axios.create({
    baseURL: 'http://192.168.249.68:8000/api/registros/'})
    //https://a465-190-108-81-197.ngrok-free.app
    //const API_URL = 'http://10.0.2.2:8000/...'; // ← esto es para emulador Android (NO Expo Go)
    //const API_URL = 'http://192.168.1.100:8000/...'; // ← cambia por tu IP real


export const getAllAvisos = ({st, fecha_inicio, fecha_fin}:{
  st: string;
  fecha_inicio: string;
  fecha_fin: string;
}) => sapApi.get(`/filtrar/?st=${st}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`);