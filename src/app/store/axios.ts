"use client"
import axios from "axios";

export const shallowRouting: any = {shallow: true}

export const axiosl = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

axiosl.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =  "Bearer " + token;
  }
  return config;
});