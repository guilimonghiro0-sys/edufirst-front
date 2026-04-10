import apiClient from './client';

export interface SchoolDto {
  id: string;
  name: string;
  code: string;
  region: string;
}

export const fetchSchools = async () => {
  const { data } = await apiClient.get<SchoolDto[]>('/schools');
  return data;
};
