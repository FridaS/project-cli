import Ajax from './ajax';

export default {
  test(params: unknown) { // test
    return Ajax.post('/test', params);
  },
};
