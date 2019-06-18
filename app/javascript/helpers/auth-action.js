import requestsManager from './axios-request';
import { getAjaxError } from './applicationHelper';
import { message } from 'antd';

// === Begin functions for action process
function setIsProcessing(actiontype, payload = {}) {
  return {
    type: `${actiontype}_PROCESS`,
    payload,
  };
}

function processSuccess(actiontype, payload) {
  return {
    type: `${actiontype}_SUCCESS`,
    payload,
  };
}

function processFailure(actiontype, error) {
  return {
    type: `${actiontype}_FAILURE`,
    error,
  };
}
// === End functions for action process

export function fetchRecords(
  dispatch,
  actiontype,
  url,
  params,
  options,
) {
  options = Object.assign({}, {
    successcallback: () => {},
    context: {}
  }, options);

  dispatch(setIsProcessing(actiontype, params));

  return (
    requestsManager
      .fetchEntities(url, {...params, ...(options.context || {})})
      .then(res => {
        dispatch(processSuccess(actiontype, res.data));
        options.successcallback(res);
      })
      .catch(error => {
        message.error(getAjaxError(error));
        dispatch(processFailure(actiontype, error));
      })
  );
}

// GET entity_names/1
export function fetchRecord(
  dispatch,
  actiontype,
  url,
  id,
  options
) {
  options = Object.assign({}, {
    successcallback: () => {},
    context: {},
    params: {},
  }, options);

  dispatch(setIsProcessing(actiontype));

  return (
    requestsManager
      .fetchEntity(url, {...(options.params || {}), ...(options.context || {})})
      .then(res => {
        dispatch(processSuccess(actiontype, res.data, id));
        options.successcallback(res);
      })
      .catch(error => {
        message.error(getAjaxError(error));
        dispatch(processFailure(actiontype, error));
      })
  );
}

// POST entity_names
export function submitRecord(
  dispatch,
  actiontype,
  url,
  entity,
  options,
) {
  options = Object.assign({}, {
    successcallback: () => {},
    context: {}
  }, options);

  dispatch(setIsProcessing(actiontype, entity));

  return (
    requestsManager
      .submitEntity(url, {...entity, ...(options.context || {})})
      .then(res => {
        dispatch(processSuccess(actiontype, res.data));
        options.successcallback(res);
      })
      .catch(error => {
        message.error(getAjaxError(error));
        dispatch(processFailure(actiontype, error));
      })
  );
}

// POST entity_names
export function uploadRecord(
  dispatch,
  actiontype,
  url,
  entity,
  options,
) {
  options = Object.assign({}, {
    successcallback: () => {},
    context: {}
  }, options);

  dispatch(setIsProcessing(actiontype, entity));
  return (
    requestsManager
      .uploadEntity(url, {...entity, ...(options.context || {})})
      .then(res => {
        dispatch(processSuccess(actiontype, res.data));
        options.successcallback(res);
      })
      .catch(error => {
        message.error(getAjaxError(error));
        dispatch(processFailure(actiontype, error));
      })
  );
}

// POST entity_names/creates
export function submitRecords(
  dispatch,
  actiontype,
  url,
  entities,
  options
) {
  options = Object.assign({}, {
    successcallback: () => {},
    context: {}
  }, options);

  dispatch(setIsProcessing(actiontype, entities));

  return (
    requestsManager
      .submitEntities(url, {...entities, ...(options.context || {})})
      .then(res => {
        dispatch(processSuccess(actiontype, res.data));
        options.successcallback(res);
      })
      .catch(error => {
        message.error(getAjaxError(error));
        dispatch(processFailure(actiontype, error));
      })
  );
}

// PUT/PATCH entity_names/1
export function updateRecord(
  dispatch,
  actiontype,
  url,
  entity,
  options
) {
  options = Object.assign({}, {
    successcallback: () => {},
    failurecallback: () => {},
    context: {}
  }, options);

  dispatch(setIsProcessing(actiontype, entity));

  return (
    requestsManager
      .patchEntity(url, {...entity, ...(options.context || {})})
      .then(res => {
        dispatch(processSuccess(actiontype, res.data));
        options.successcallback(res);
      })
      .catch(error => {
        message.error(getAjaxError(error));
        dispatch(processFailure(actiontype, error));
        options.failurecallback(entity);
      })
  );
}

// DELETE entity_names/1
export function deleteRecord(
  dispatch,
  actiontype,
  url,
  id,
  options
) {
  options = Object.assign({}, {
    successcallback: () => {},
    context: {}
  }, options);

  dispatch(setIsProcessing(actiontype, id));

  return (
    requestsManager
      .deleteEntity(url, {...(options.context || {})})
      .then(res => {
        dispatch(processSuccess(actiontype, id));
        options.successcallback(res);
      })
      .catch(error => {
        message.error(getAjaxError(error));
        dispatch(processFailure(actiontype, error));
      })
  );
}
// === End base actions
