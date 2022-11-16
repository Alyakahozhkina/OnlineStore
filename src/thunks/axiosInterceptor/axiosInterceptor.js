import { toast } from 'react-toastify';
import api from '../../api/api';
import { successToast } from './notificationMessages';

const axiosInterceptor = () => {
  api.interceptors.response.use((response) => {
    if (response.config.url.match(/products/) && response.config.method !== 'get') {
      toast.success(`${successToast(response.config.method)} was successfully completed`);
    }
    return response;
  }, (error) => {
    toast.error(`${error.message}`);
    toast.clearWaitingQueue();
    return Promise.reject(error);
  });
};

export default axiosInterceptor;
