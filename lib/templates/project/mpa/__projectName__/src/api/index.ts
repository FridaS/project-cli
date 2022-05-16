import Ajax from '@common/utils/ajax';

export default {
  login({ username, password }: {username: string, password: string}) {
    return Ajax.post('/userLogin/login', { username, password });
  },
  logout() {
    return Ajax.post('/userLogin/logout');
  },
  getUserInfo() {
    return Ajax.get<{ name: string, organizationCode: number }>('/userInfo/select');
  },
  getOrganizations() {
    return Ajax.get('/collaboration/organization');
  },
  getDepartments(organizationCode?: string) {
    return Ajax.get('/collaboration/department', { params: { organizationCode } });
  },
  sendEmail({ email, checkStatus }: {email: string, checkStatus: 0 | 1}) {
    // checkStatus: 0 - 无须校验该邮箱是否已注册
    return Ajax.post('/userLogin/sendEmail', { email, checkStatus });
  },
  register(data: unknown) {
    return Ajax.post('/userRegister/registerSubmit', data);
  },
  resetPwd(data: unknown) {
    return Ajax.post('/userLogin/resetPasswordByCode', data);
  },
};
