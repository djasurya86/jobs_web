import React from 'react';
import {
    Flex,
    HStack,
    Heading,
    Text,
    Spacer,
    Button
} from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

function Header() { 
    const cookies = new Cookies();
    const navigate = useNavigate();

    const logout = () => {
        cookies.remove('user');
        navigate('/');
    };

    return (
        <Flex as="header" position="fixed" w="100%" backgroundColor={"blue.500"} textColor={"white"} p={"4"}>
            <HStack w={"100%"} placeItems={"start"}>
                <Heading>
                    GitHub
                    <Text as={"span"} fontWeight={"normal"} ms={2}>
                        Jobs
                    </Text>
                </Heading>
                <Spacer />
                <Button onClick={logout}>Logout</Button>
            </HStack>
        </Flex>
    );
}

export default Header;
