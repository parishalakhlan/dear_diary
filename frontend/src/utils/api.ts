import axios, { AxiosResponse } from "axios";

// Define your Journal interface
export interface Journal {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

// Change this if backend runs on a different port / deployed
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});
// Helper function for typed responses
const handleResponse = <T>(response: AxiosResponse<T>): T => response.data;

// Journals API calls with proper typing
export const getJournals = (): Promise<Journal[]> =>
  API.get<Journal[]>("/journals").then(handleResponse);

export const createJournal = (data: {
  title: string;
  content: string;
}): Promise<Journal> =>
  API.post<Journal>("/journals", data).then(handleResponse);

export const getJournalById = (id: string): Promise<Journal> =>
  API.get<Journal>(`/journals/${id}`).then(handleResponse);

export const updateJournal = (
  id: string,
  data: { title: string; content: string }
): Promise<Journal> =>
  API.put<Journal>(`/journals/${id}`, data).then(handleResponse);

export const deleteJournal = (id: string): Promise<void> =>
  API.delete<void>(`/journals/${id}`).then(handleResponse);
