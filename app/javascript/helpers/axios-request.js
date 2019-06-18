import request from 'axios';
import { handleAuthFailure } from './auth';
import Qs from 'qs';

function validateStatus(status) {
  if (status === 401) { handleAuthFailure(); }

  return (status >= 200 && status < 300);
}

export default {
  // GET
  fetchEntities(path, params = {}) {
    return request({
      method: 'GET',
      url: path,
      responseType: 'json',
      params: params,
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'});
      },
      validateStatus: validateStatus,
    });
  },

  fetchEntity(path, params = {}) {
    return request({
      method: 'GET',
      url: path,
      responseType: 'json',
      params: params,
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'});
      },
      validateStatus: validateStatus,
    });
  },

  submitEntity(path, entity = {}) {
    return request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: entity,
      validateStatus: validateStatus,
    });
  },

  patchEntity(path, entity = {}) {
    return request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: entity,
      validateStatus: validateStatus,
    });
  },

  putEntity(path, entity = {}) {
    return request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: entity,
      validateStatus: validateStatus,
    });
  },

  deleteEntity(path, entity = {}) {
    return request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: entity,
      validateStatus: validateStatus,
    });
  },
};
