/* #issue hard-coding */
import DeepMerge from 'deep-merge/multiple';
import { browserHistory } from 'react-router';
import qs from 'qs';
import { notification } from 'antd';

// Get errors messages from response
export function parseError(error) {
  const response = error.response;
  let alertMessages = ['System error!'];

  if (response) {
    switch(response.status){
      case 401:
        alertMessages = response.data.errors;
        break;
      case 404:
        alertMessages = [error.message];
        break;
      case 403:
        break;
      case 422:
        alertMessages = response.data;
        break;
    }
  }

  return {
    messages: alertMessages,
    type: 'error'
  };
}

// #issue message is not string or array
export function getAjaxError(error) {
  const response = error.response;
  let message;

  if (response) {
    switch(response.status){
      case 400:
        message = response.data && (response.data.error || response.data) || `${response.status}`;
        break;
      case 401:
        message = error.message;
        break;
      case 403:
        message = response.data && (response.data.errors || response.data) || `${response.status}`;
        break;
      case 422:
        message = response.data || `${response.status}`;
        break;
      case 500, 404:
        message = response.data && (response.data.error || response.data) || `${response.status}`;
        break;
    }
  } else {
    message = error.message;
  }

  if ((typeof message === 'string')
    || (Array.isArray(message) && isStringArray(message))) {
    return message;
  } else {
    return 'error occurred';
  }
}

export function isStringArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'string') {
      return false;
    }
  }

  return true;
}

// Init format message
export function createSuccessAlert(message) {
  return {
    messages: [message],
    type: 'success'
  };
}

export function getParams(filters, location = null, option = {}) {
  let params = {};

  if (filters) {
    // fetch page params
    const page = filters.getIn(['paging', 'page']);
    if (page) { params.page = page; }

    // fetch orders filters params
    const orders = filters.get('orders');
    if (orders && orders.size > 0) { params.orders = orders.toArray(); }

    // fetch fields params
    const fields = filters.get('fields');
    if (fields) { params.fields = fields; }

    // fetch compconds
    const compconds = filters.get('compconds');
    if (compconds) { params.compconds = compconds.toJS(); }

    // fetch searches
    const searches = filters.get('searches');
    if (searches) { params = Object.assign({}, params, searches.toJS()); }
  }

  return mergeDeep([
    params,
    getUrlQuery(location),
    option
  ]);
}

// Get params from filters (immutable)
export function getFilterParams(filters, location = null, option = {}) {
  return getParams(filters, location, option);
}

// Get params from filters (immutable) & sync url
export function getFilterParamsAndSyncUrl(filters, location, option = {}, isclear = false) {
  const params = isclear ? option : getParams(filters, location, option);

  syncUrlQuery(location, params);

  return params;
}

// Sync url with query params
export function syncUrlQuery(location, params) {
  const searchString = qs.stringify(
    params,
    { arrayFormat: 'bracket', encode: true }
  );

  browserHistory.push({
    pathname: location.pathname,
    search: `?${searchString}`
  });
}

// Get query params of url
export function getUrlQuery(location) {
  if(location && location.search) {
    return qs.parse(location.search.replace(/^\?/, ''));
  } else {
    return {};
  }
}

// Merge deep json object
export function mergeDeep(objs = []) {
  const merge = DeepMerge(function (a, b) {
    return b;
  });

  return merge(objs);
}

// Return class name with record state
export function rowClassName(record) {
  if(record.isUpdating) {
    return 'table-row-status--updating';
  } else if (record.isDeleting) {
    return 'table-row-status--deleting';
  }
}

// Get config for table pagination
export function getDefaultTablePagination(currentPage, totalPage){
  return {
    showQuickJumper: true,
    total: totalPage,
    current: currentPage,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };
}

// Get config for table title pagination
export function getDefaultTableTitlePagination(currentPage, totalPage){
  return {
    showQuickJumper: false,
    total: totalPage,
    current: currentPage,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
  };
}

// Flat messages object
export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value       = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

// Notify
export function notify(noti, nextNoti) {
  if(nextNoti && !nextNoti.equals(noti)) {
    nextNoti.get('messages').forEach(message => {
      notification[nextNoti.get('type')]({
        message: message,
      });
    });
  }
}

// #issue
export function selectFilterOption(input, option) {
  return (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0);
}

export function numberToCurrency(price, unit = ' đ', delimiter = ',') {
  if(price) {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + delimiter) + unit;
  } else {
    return price;
  }
}

export function isEnvironment() {
  return (process.env.NODE_ENV === 'test');
}

export function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

export function replaceStr(str, params) {
  if (str) {
    return str.replace(/\:([a-zA-Z_][0-9a-zA-Z_]*)/g, function(all, p1) {
      return params[p1] || all;
    });
  }
}

export function appendQuery(path, params) {
  let query = qs.stringify(params, { arrayFormat: 'bracket', encode: true });

  return query && `${path}?${query}` || path;
}

export function cleanArray(actual) {
  let newArray = new Array();

  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }

  return newArray;
}
