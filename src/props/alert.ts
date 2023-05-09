export default interface AlertProps {
  content: string,
  severity: any, // success, error, warning, info
  showAlert: boolean,
  position?: string,
  callback: Function,
  action?: Function,
  autoHideDuration?: number,
}