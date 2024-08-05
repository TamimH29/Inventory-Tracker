'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/firebase'
import {Box, Link, Typography, Modal, Stack, TextField, Button, Container, Grid} from '@mui/material'
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log({res});
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('');
        router.push('/inventory')
    }catch(e){
        console.error(e)
    }
  };

  function goToSignUp(){
    router.push('/sign-up')
    }

    function goHome(){
        router.push('/')
    }

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
    <Typography variant="h4" fontFamily="fantasy" position="absolute" top = "2.5%" left="2%" 
        sx={{transform: "translate(30%, 40%)" }} border="2px solid" p={2} onClick={()=>goHome()}>
            PantryPlan
    </Typography>

    <Button variant="contained" position="absolute" top = "2.5%" left="91%" 
        sx={{transform: "translate(650%, -795%)" }} onClick={()=>goToSignUp()}>
            Sign Up
    </Button>

    <Box
        position="absolute" top = "50%" left="50%" 
        width={400}
        height={500}
        bgcolor="white"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        gap={3}
        border="2px solid"
        sx={{
            transform: "translate(-50%, -50%)" ,
        }}
    >
        <Typography textAlign="center" variant="h4">Sign In</Typography>
        <TextField 
          id="outlined-search" label="Email"  
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}>
        </TextField>
        <Button 
          onClick={handleSignIn}
          variant="contained"
        >
          Sign In
        </Button>
    </Box>
    </Grid>
  );
};

export default SignIn;