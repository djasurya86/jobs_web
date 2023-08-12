import React, { useState } from 'react';
import {
    Container,
    Stack,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Heading,
    InputGroup,
    InputRightElement,
    IconButton
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

function Login() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [passwordView, setPasswordView] = useState(false);
    const passwordViewToggle = () => {
        if(passwordView) {
            setPasswordView(false);
        } else {
            setPasswordView(true);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = async (input) => {
        Swal.fire({
            title: 'Please Wait',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const login = await axios.post(process.env.REACT_APP_API_URL+'/user/login', {
                username: input.username,
                password: input.password
            });
            cookies.set('user', JSON.stringify(login.data));
            Swal.close();
            navigate("/job");
        } catch (err) {
            Swal.fire({
                icon: 'error',
                text: err.response.data.errors[0],
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            });
        }
    };

    return (
        <Container maxW="lg" py={{ base: '12', md: '20' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    boxShadow={'md'}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                    bg={'blue.500'}
                    color={'white'}
                >
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack spacing="6">
                            <Heading w={'100%'} textAlign={'center'} size={'lg'} mb="2">
                                Log in to your account
                            </Heading>
                            <Stack spacing="5" mb="2">
                                <FormControl>
                                    <FormLabel htmlFor="username">Username</FormLabel>
                                    <Input id="username" type="text" {...register('username', { required: true })} focusBorderColor={'white'} />
                                    {errors.username && <Text mt={"1"} color={"pink"} fontSize={"sm"}>Username is required.</Text>}
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup>
                                        <InputRightElement>
                                            <IconButton
                                                variant="text"
                                                icon={passwordView ? <HiEyeOff /> : <HiEye />}
                                                onClick={passwordViewToggle}
                                            />
                                        </InputRightElement>
                                        <Input
                                            id="password"
                                            type={passwordView ? 'text' : 'password'}
                                            focusBorderColor={'white'}
                                            {...register('password', { required: true })}
                                        />
                                    </InputGroup>
                                    {errors.password && <Text mt={"1"} color={"pink"} fontSize={"sm"}>Password is required.</Text>}
                                </FormControl>
                            </Stack>
                            <Stack spacing="6">
                                <Button type='submit' className=''>Sign in</Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>
    );
}

export default Login;
