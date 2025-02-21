export const showToaster = (msg: string,toaster:any)=> {
  toaster.success(msg, '', {
    progressBar: true,
    progressAnimation: 'increasing',
    timeOut: 2000,
  });
}
