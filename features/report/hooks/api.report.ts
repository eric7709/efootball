import { api } from "@/lib/api/axios";

import type {
  Report,
} from "../types.report";

export const reportRepository = {
  async list(): Promise<Report[]> {
    const response = await api.get<Report[]>("/reports");
    return response.data;
  },
  async getById(id: string): Promise<Report> {
    const response = await api.get<Report>(`/reports/${id}`);
    return response.data;
  },
  async create(input: CreateReportInput): Promise<Report> {
    const response = await api.post<Report>("/reports", input);
    return response.data;
  },
  async update(id: string, input: UpdateReportInput): Promise<Report> {
    const response = await api.patch<Report>(`/reports/${id}`, input);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/reports/${id}`);
  },
};
