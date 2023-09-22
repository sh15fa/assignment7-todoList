import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialog({editValue,valueId,taskList}) {
  const [editTask,setEditTask]=React.useState(editValue);
  const[status,setStatus]=React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const editHandller=(id)=>{
    if(editTask===''){
      setStatus(false);
    }
    else{ 
      setStatus(true);
      const taskUpdate= taskList.map((taskk)=>{
      if(taskk.id===id){
         return {...taskk,
          taskName:editTask}
      }
      return taskk;
    })
    localStorage.setItem('tasks',JSON.stringify(taskUpdate));
    handleClose();}

    
   
  }

  return (
    <div>
    <button className="submit-edits" onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your Task here please...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Task"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={editValue}
            onChange={(e)=>{
              setEditTask(e.target.value);
              setStatus(true);
            }}
          />
          {!status && editTask===''&&  <div className="validate">Please Write a task it must not be empty</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>editHandller(valueId)}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
