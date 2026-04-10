import apiClient from './client';

export interface RegistrationPayload {
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birthDate: string;
  parentName: string;
  parentEmail: string;
  relationship: string;
  schoolId: string;
}

export interface UpdateRegistrationStatusPayload {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
}

export const submitRegistration = async (payload: RegistrationPayload) => {
  const { data } = await apiClient.post('/registrations', payload);
  return data;
};

export const fetchRegistrations = async (schoolId?: string, status?: string) => {
  const params: Record<string, string> = {};
  if (schoolId) params.schoolId = schoolId;
  if (status) params.status = status;
  const { data } = await apiClient.get('/registrations', { params });
  return data;
};

export const updateRegistrationStatus = async (id: string, payload: UpdateRegistrationStatusPayload) => {
  const { data } = await apiClient.patch(`/registrations/${id}/status`, payload);
  return data;
};
