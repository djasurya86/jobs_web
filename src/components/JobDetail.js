import React, { useState, useEffect } from 'react';
import {
    Button,
    Box,
    Text,
    Spinner,
    Center,
    VStack,
    Heading,
    Divider,
    Grid,
    GridItem,
    Image
} from '@chakra-ui/react';
import Header from './Header';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { HiArrowNarrowLeft } from 'react-icons/hi';

function JobDetail() {
    const cookies = new Cookies();
    const [load, setLoad] = useState(false);
    const [job, setJob] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        async function getJob() {
            const jobDetail = await axios.get(process.env.REACT_APP_API_URL+'/job/detail/'+id, {
                headers: {
                    token: cookies.get('user').jwt_token
                }
            });
            console.log(jobDetail.data);
            setJob(jobDetail.data);
            setLoad(true);
        }

        if(load === false) {
            getJob();
        }
    }, [load]);

    return (
        <>
            <Header />
            <Box p={"4"} pt={"85px"} pb={"200px"} w={"100%"}>
                <Link to={"/job"}>
                    <Button color={"gray"} leftIcon={<HiArrowNarrowLeft />} variant="ghost">
                        <Text as={"span"} color={"blue.500"}>Back</Text>
                    </Button>
                </Link>
                <Box mt={4} w={"100%"} border={"solid 5px"} borderColor={"gray.200"} p={4} h={"calc(100vh - 160px)"} overflowY={"auto"}>
                    {
                        load === false ? 
                        <Center>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </Center> :
                        <VStack w={"100%"} placeItems={"start"} gap={0}>
                            <Text color={"gray"}>
                                {job.type} / {job.location}
                            </Text>
                            <Heading mb={4}>
                                {job.title}
                            </Heading>
                            <Divider mb={4} />
                            <Grid templateColumns='repeat(6, 1fr)' gap={6} w="100%">
                                <GridItem colSpan={4}>
                                    <Box className="content" w={"100%"} dangerouslySetInnerHTML={{__html:job.description}} />
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <VStack mb={4} borderRadius={"md"} border={"solid 5px"} borderColor={"gray.200"} placeItems={"start"}>
                                        <Box px={2} fontWeight={"bold"}>
                                            {job.company}
                                        </Box>
                                        <Divider />
                                        <Box px={2}>
                                            <Image w={'100%'} src={job.company_logo} />
                                        </Box>
                                        <Box px={2} pb={2}>
                                            <a target="_blank" href={job.company_url}>
                                                <Text color={"blue.500"} textDecoration={"underline"}>
                                                    {job.company_url}
                                                </Text>
                                            </a>
                                        </Box>
                                    </VStack>
                                    <VStack borderRadius={"md"} border={"solid 5px"} borderColor={"yellow.100"} backgroundColor={"yellow.50"} placeItems={"start"}>
                                        <Box px={2} fontWeight={"bold"}>
                                            How to Apply
                                        </Box>
                                        <Divider />
                                        <Box className="apply" px={2} pb={2} dangerouslySetInnerHTML={{__html:job.how_to_apply}} />
                                    </VStack>
                                </GridItem>
                            </Grid>
                        </VStack>
                    }
                </Box>
            </Box>
        </>
    );
}

export default JobDetail;
