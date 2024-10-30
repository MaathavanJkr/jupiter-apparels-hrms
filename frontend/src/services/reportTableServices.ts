import axiosInstance from '../axiosConfig';
import { EDRData, GERData, TLDData } from '../types/types';

export const fetchEDRReportData = async (EDRData: EDRData) => {
  try {
    const response = await axiosInstance.get(
      `/report/employee/dept/${EDRData.department}`,
    );
    console.log(response.data);
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
    const response = await axiosInstance.get(`/report/employee`, {
      params: {
        group: GERData.group,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
};

export const fetchCAReportData = async (custom_attribute_number: number, custom_attribute_value: string) => {
  try {
    const response = await axiosInstance.post(`/report/custom`, {
      attribute_number: custom_attribute_number,
      attribute_value: custom_attribute_value,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
}