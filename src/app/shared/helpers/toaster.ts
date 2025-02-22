export const showToaster = (msg: string,toaster:any,type?:string)=> {
  if(type) {
    toaster[type](msg, '', {
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 2000,
    });
    return;
  }
  toaster.success(msg, '', {
    progressBar: true,
    progressAnimation: 'increasing',
    timeOut: 2000,
  });
}
