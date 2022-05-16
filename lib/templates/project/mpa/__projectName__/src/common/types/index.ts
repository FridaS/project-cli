import AccountForm from '@components/accountForm.vue';

export type ValidatorCB = (err?: Error) => void
export type AccountFormInst = InstanceType<typeof AccountForm>

export interface Organization {
  name: string,
  organizationCode: string,
}

export interface Department {
  NAME: string,
  DEPARTMENTCODE: string
}

export interface CommonDialogOptions {
  title: string,
  clazz: string,
  type: '' | 'warning',
  showClose: boolean,
  buttons: string[],
  buttonsDisabled: boolean[],
  beforeCloseNoClose?: boolean
}