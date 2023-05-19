import { api } from '../api/axios';
import axios from 'axios';
import { Supervisor } from '../entities/supervisor';
import { VITE_CLOUD_IMAGES_NAME, VITE_UPLOAD_PRESET } from '../constants';

const PATH = '/supervisors';

export class SupervisorService {

  async create(
    registration: string,
    name: string,
    password: string,
    role: Number,
    imageURL: string,
  ): Promise<Supervisor> {

    const supervisorData = {
      registration: registration,
      name: name,
      password: password,
      role: role,
      imageURL: imageURL,
    };

    try {
      const response = await api.post<Supervisor>(PATH, supervisorData);
      const createdSupervisor: Supervisor = response.data;
      return createdSupervisor;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create supervisor');
    }
  }

  async fetchAll (): Promise<Supervisor[]> {
      const {data} = await api.get<Supervisor[]>(PATH)
      return data
  }

  async uploadToCloudinary(image) {

    try {
      // upload image to Cloudinary
      const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${VITE_CLOUD_IMAGES_NAME}/image/upload`;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", VITE_UPLOAD_PRESET);
      formData.append("cloud_name", VITE_CLOUD_IMAGES_NAME);
      const response = await axios.post(cloudinaryUploadUrl, formData);
  
      // get the URL of the uploaded image from Cloudinary
      const cloudinaryImageURL = response.data.secure_url;
  
      return cloudinaryImageURL;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id_supervisor: string): Promise<void> {
    try {
      const response = await api.delete(`${PATH}/${id_supervisor}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete supervisor');
    }
  }  

}