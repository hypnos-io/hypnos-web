import { api } from '../api/axios';
import axios from 'axios';
import { Leader } from '../entities/leader';
import { VITE_CLOUD_IMAGES_NAME, VITE_UPLOAD_PRESET } from '../constants';
import { RolesEnum } from '../use_cases/authorization/roles';

const PATH = '/leaders';

export class LeaderService {

  async create(
    registration: string,
    name: string,
    password: string,
    role: RolesEnum,
    imageURL: string
  ): Promise<Leader> {

    const leaderData = {
      registration: registration,
      name: name,
      password: password,
      role: role,
      imageURL: imageURL,
    };

    try {
      const response = await api.post<Leader>(PATH, leaderData);
      const createdLeader: Leader = response.data;
      return createdLeader;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create leader');
    }
  }

  async fetchAll (): Promise<Leader[]> {
      const {data} = await api.get<Leader[]>(PATH)
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

  async delete(id_leader: string): Promise<void> {
    try {
      const response = await api.delete(`${PATH}/${id_leader}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete leader');
    }
  }  

}