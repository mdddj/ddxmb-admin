import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

// 属性
type Props = {
  title?: String
  message?: String
  isShow: boolean
  handleClose: () => void
}

// 成功弹窗提醒
const ResultSuccessDialog: React.FC<Props> = (datas: Props) => {


  return <>

    <Dialog
      open={datas.isShow}
      keepMounted
      onClose={datas.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{datas.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {datas.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={datas.handleClose} color="primary">
          取消
        </Button>
        <Button onClick={datas.handleClose} color="primary">
          同意
        </Button>
      </DialogActions>
    </Dialog>

  </>

}

export default ResultSuccessDialog;
