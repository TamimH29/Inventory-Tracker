'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {auth} from '@/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import {Box, Link, Typography, Modal, Stack, TextField, Button, Container, Grid} from '@mui/material'
import { collection, getDocs, query, getDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [user] = useAuthState(auth);
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');
  const userCollection = user? user.email: 'test';

  if(!user){
    router.push('/');
  }

  const updateInventory = async() =>{
    const snapshot = query(collection(firestore, userCollection));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    });
    setInventory(inventoryList);
  }

  const addItem = async(item) => {
    const docRef = doc(collection(firestore, userCollection), item);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity+1});
      }
    else{
      await setDoc(docRef, {quantity:1});
    }

    await updateInventory();
  }

  const subtractItem = async(item) => {
    const docRef = doc(collection(firestore, userCollection), item);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const {quantity} = docSnap.data();
      if(quantity === 1){
        await deleteDoc(docRef);
      }
      else{
        await setDoc(docRef, {quantity: quantity-1});
      }
    }

    await updateInventory();
  }

  const removeItem = async(item) => {
    const docRef = doc(collection(firestore, userCollection), item);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        await deleteDoc(docRef);
    }

    await updateInventory();
  }

  const handleOpen = ()=>setOpen(true);
  const handleClose = ()=>setOpen(false);

  useEffect(()=>{
    updateInventory()
  }, []);

  return (
    <Grid 
        width="100vw" 
        height="100vh" 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center"
        gap={1}
        bgcolor="bisque"
        fontFamily="initial"
    >
        <Typography variant="h2" fontFamily="fantasy" position="absolute" top = "4%" left="20%%" 
            sx={{transform: "translate(0%, -10%)" }} border="2px solid" p={2}>
            PantryPlan
        </Typography>

      <Button variant="contained" position="absolute" top="2.5%" left="91%" p={2} borderRadius={2}
      onClick = {()=>{
        signOut(auth)
      }}
      sx={{
        transform: "translate(650%, -220%)" ,
      }}>
        Sign Out
      </Button>

      <Typography 
          fullWidth
          variant="h2" 
          bgcolor="black"
          color="white" 
          width="90vw"
          height = "100px"
          textAlign="center"
          border = "4px solid gray"
          paddingTop="10px">
            Items
      </Typography>

      <Box position="absolute" top="4%" left="2%" fontSize={20} bgcolor="black" color="white" p={2} borderRadius={2}>
        {user? user.email: ""}
      </Box>

    <Box gap={0} border="4px solid black">
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute" top = "50%" left="50%" 
          
          width={400}
          bgcolor="white"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)" ,
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
            variant='outlined'
            fullWidth 
            value={itemName}
            onChange={(e)=>{
              setItemName(e.target.value)
            }}/>
            <Button variant="contained" 
            onClick={()=>{
              addItem(itemName)
              setItemName("")
              handleClose()
            }}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box 
        width="90vw"
        fullWidth
        height="100px"
        bgcolor="beige"
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        gap={5}>
          <Button variant="contained" onClick={()=>{handleOpen()}}>
            Add New Item
          </Button>
          <TextField variant="outlined" placeholder="Search"
          value={searchItem} 
          onChange={(e)=>{
            setSearchItem(e.target.value)
          }}>
          Search
        </TextField>
        </Box>

      <Box 
      bgcolor="black"
      >

        <Stack fullWidth height="300px" spacing={0} overflow="auto" gap={0.25}>
            {
              searchItem === "" ?
              inventory.map(({name, quantity})=>(
                <Box key={name} width="100%" minHeight="50px"
                display="flex" justifyContent="space-between" alignItems="center"
                bgcolor="white" p={5}>
                  <Typography variant="h4" maxWidth="400px">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Stack display="flex" flexDirection="row" justifyContent="space-evenly" gap={8}>
                  <Typography variant="h4">
                    Qty:{quantity}
                  </Typography>
                  <Button color="success" fontSize="100px" variant="contained" onClick={()=>{addItem(name)}}>
                    <Typography variant="h5">+</Typography>
                  </Button>
                  <Button color="success" fontSize="100px" variant="contained" onClick={()=>{subtractItem(name)}}>
                    <Typography variant="h5">-</Typography>
                  </Button>
                  <Button color="error" variant="contained" onClick={()=>{removeItem(name)}}>
                    Remove
                  </Button>
                  </Stack>
                </Box>
              )):
              inventory.map(({name, quantity})=>(
                name.startsWith(searchItem) || name.toLowerCase().startsWith(searchItem)?
                <Box key={name} width="100%" minHeight="50px"
                display="flex" justifyContent="space-between" alignItems="center"
                bgcolor="white" p={5}>
                  <Typography variant="h4" maxWidth="400px">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Stack display="flex" flexDirection="row" justifyContent="space-evenly" gap={8}>
                  <Typography variant="h4">
                    Qty:{quantity}
                  </Typography>
                  <Button color="success" variant="contained" onClick={()=>{addItem(name)}}>
                    <Typography variant="h5">+</Typography>
                  </Button>
                  <Button color="success" fontSize="100px" variant="contained" onClick={()=>{subtractItem(name)}}>
                    <Typography variant="h5">-</Typography>
                  </Button>
                  <Button color="error" variant="contained" onClick={()=>{removeItem(name)}}>
                    Remove
                  </Button>
                  </Stack>
                </Box>:
                <Box key={name}></Box>
              ))
            }
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}
