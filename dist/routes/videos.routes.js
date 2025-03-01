"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const login_1 = require("../middleware/login");
const VideosRepositories_1 = require("../modules/videos/repositories/VideosRepositories");
const videosRoutes = (0, express_1.Router)();
exports.videosRoutes = videosRoutes;
const videoRepository = new VideosRepositories_1.VideoRepository();
videosRoutes.post('/create-video', login_1.login, (request, response) => {
    videoRepository.create(request, response);
});
videosRoutes.get('/get-video', (request, response) => {
    videoRepository.getVideos(request, response);
});
videosRoutes.get('/search', (request, response) => {
    videoRepository.searchVideos(request, response);
});
