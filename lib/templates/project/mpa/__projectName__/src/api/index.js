import Ajax from '@common/utils/ajax';

export default {
  login({ username, password }) {
    return Ajax.post('/userLogin/login', { username, password });
  },
  logout() {
    return Ajax.post('/userLogin/logout');
  },
  getUserInfo() {
    return Ajax.get('/userInfo/select');
  },
  getOrganizations() {
    return Ajax.get('/collaboration/organization');
  },
  getDepartments(organizationCode) {
    return Ajax.get('/collaboration/department', { params: { organizationCode } });
  },
  sendEmail({ email, checkStatus }) {
    // checkStatus: 0 - 无须校验该邮箱是否已注册
    return Ajax.post('/userLogin/sendEmail', { email, checkStatus });
  },
  register(data) {
    return Ajax.post('/userRegister/registerSubmit', data);
  },
  resetPwd(data) {
    return Ajax.post('/userLogin/resetPasswordByCode', data);
  },
};
