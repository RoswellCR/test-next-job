import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useState, useEffect } from 'react';
import { Notification, Post } from '../../interfaces/index';
import axios from 'axios';


type IProps = {
  setNotification: (msg: Notification) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  editObj: Post;
  setDataApi: (arr: Post[]) => void;
  setEditObj: (post: Post) => void;
  dataApi: Post[];
};

const FormDialog:FC<IProps> = (props) => {
  
  const { setNotification , setIsOpen, isOpen, editObj, setDataApi, setEditObj, dataApi,  } = props;
  
  const [value, setValue] = useState<string>("");

  const END_POINT = 'https://jsonplaceholder.typicode.com/posts';

  //recover data title
  useEffect(() => {
    console.log('use effect '+editObj.title)
    if (editObj.title) {
      setValue(editObj.title);
    }
  }, [editObj.title])

  // UPDATE POST
  const updatePost = async () => {
    const updateObj ={ 
      title: value,
      body:'test',
      userId: 1,
      id: 1
      } as Post;
    //console.log('llega al modal'+ JSON.stringify(updateObj))
    await axios.put(`${END_POINT}/${updateObj.id}`)
    const tempDataApi = [...dataApi];
    const index = tempDataApi.findIndex(post => post.id===updateObj.id);
    tempDataApi[index] = updateObj;
    setDataApi(tempDataApi);
        setNotification({
          msg: "Post Updated Successfully",
          color: "success",
        });
      }
      
      // CREATE POST
      const createPost = async () => {
        const min = 100;
        const max = 1000;
        const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(randomNum)
    
        const post:Post = {
          title: value,
          body: 'test body empty',
          id: randomNum,
          userId: randomNum
        }
        
        await axios.post(END_POINT, post);
        setDataApi([post, ...dataApi])
        setNotification({ msg: "Post Added Successfully", color: "success" });
      }    


  
  const handleClose = () => {
    setIsOpen(false);
    setValue("");
    setEditObj({userId: 0, title: "", body: "", id: 0});
  };

  const onSubmit = async () => {
    if (editObj.title) {
      await updatePost();
    } else {
      await createPost();
    }
    handleClose();
  };

  return (
    <div>
      
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{editObj.title ? "Update Post" : "Add New Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
             try not to leave the field empty
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Post title"
            type="text"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e)=> setValue(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Add Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default FormDialog;