import { Router } from 'express';
import { login } from '../middleware/login';
import { VideoRepository } from '../modules/videos/repositories/VideosRepositories';

const videosRoutes = Router();
const videoRepository = new VideoRepository();


videosRoutes.post('/create-video', login,(request, response)=>{
  videoRepository.create(request,response)
})

videosRoutes.get('/get-video',(request, response)=>{
  videoRepository.getVideos(request,response)
})

videosRoutes.get('/search', (request, response)=>{  
  videoRepository.searchVideos(request,response)
})

 
export { videosRoutes };

