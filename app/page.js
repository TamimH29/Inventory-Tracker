'use client'
import {Box, Link, Typography, Modal, Stack, TextField, Button, Container, Grid} from '@mui/material';
import { useRouter } from 'next/navigation';
import {useState, useEffect} from 'react' 

export default function Base(){
    const router = useRouter();

    function goToSignUp(){
        router.push('/sign-up')
    }

    function goToSignIn(){
        router.push('/sign-in')
    }

    return(
        <Grid 
        width="100vw" 
        height="100vh" 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center"
        gap={1}
        fontFamily="initial"
        bgcolor="bisque"
        >
        
        <Button variant="contained" position="absolute" top = "2.5%" left="91%" 
        sx={{transform: "translate(650%, -795%)" }} onClick={()=>goToSignIn()}>
            Sign In 
        </Button>

        <Button variant="contained" position="absolute" top = "2.5%" left="91%" 
        sx={{transform: "translate(740%, -920%)" }} onClick={()=>goToSignUp()}>
            Sign Up
        </Button>

        <Typography variant="h4" fontFamily="fantasy" position="absolute" top = "2.5%" left="2%" 
        sx={{transform: "translate(30%, 40%)" }} border="2px solid" p={2}>
            PantryPlan
        </Typography>

        <Box
            position="absolute" top = "50%" left="50%" 
            width={600}
            height={400}
            bgcolor="black"
            color="white"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            gap={3}
            border="10px solid"
            sx={{
                transform: "translate(-50%, -50%)" ,
            }}
        >
            <Typography textAlign="center" variant="h1" fontFamily="revert">Welcome to</Typography>
            <Typography textAlign="center" variant="h1" fontFamily="fantasy">PantryPlan</Typography>
        </Box>
        </Grid>
      );
}