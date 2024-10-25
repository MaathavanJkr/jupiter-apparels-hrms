import axiosInstance from '../axiosConfig';
import { EDRData, GERData, TLDData } from '../types/types';

export const fetchEDRReportData = async (EDRData: EDRData) => {
  try {
    const response = await axiosInstance.get(
      `/report/employee/dept/${EDRData.department}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
};

export const fetchTLDReportData = async (TLDData: TLDData) => {
  try {
    const response = await axiosInstance.get(`/report/totalleaves`, {
      params: {
        start_date: TLDData.startdate,
        end_date: TLDData.enddate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
};

export const fetchGERReportData = async (GERData: GERData) => {
  try {
    const response = await axiosInstance.get(`/report/count`, {
      params: {
        group: GERData.group,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
};
