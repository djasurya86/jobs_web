import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    Grid, 
    GridItem,
    Input,
    Checkbox,
    Button,
    Box,
    Heading,
    VStack,
    Divider,
    HStack,
    Text,
    Spacer
} from '@chakra-ui/react';
import Header from './Header';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import moment from "moment";
import { useForm } from 'react-hook-form';

function Job() {
    const cookies = new Cookies();
    const [job, setJob] = useState([]);
    const [more, setMore] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [queryParams, setQueryParams] = useState('');
    
    const {
        register,
        handleSubmit
    } = useForm();

    useEffect(() => {
        async function getJob() {
            let queryParamsCurrent = queryParams;
            queryParamsCurrent += queryParamsCurrent === '' ? '?' : '&';
            queryParamsCurrent += 'page='+page;
            let jobCurrent = [...job];
            if(page === 1) {
                jobCurrent = [];
            }
            const jobList = await axios.get(process.env.REACT_APP_API_URL+'/job/list'+queryParamsCurrent, {
                headers: {
                    token: cookies.get('user').jwt_token
                }
            });
            for(const [index,value] of jobList.data.entries()) {
                if(value !== null) {
                    jobCurrent.push(value);
                } else {
                    setMore(false);
                    setJob(jobCurrent);
                    setMoreLoading(false);
                    break;
                }

                if(index === (jobList.data.length-1)) {
                    setJob(jobCurrent);
                    setMore(true);
                    setMoreLoading(false);
                }
            }
        }
        getJob();
    }, [queryParams, page]);

    const submit = async (input) => {
        let queryParamsCurrent = '';
        if(input.description !== '') {
            queryParamsCurrent += queryParamsCurrent === '' ? '?' : '&';
            queryParamsCurrent += 'description='+input.description;
        }
        if(input.location !== '') {
            queryParamsCurrent += queryParamsCurrent === '' ? '?' : '&';
            queryParamsCurrent += 'location='+input.location;
        }
        if(input.full_time !== '' && input.full_time === true) {
            queryParamsCurrent += queryParamsCurrent === '' ? '?' : '&';
            queryParamsCurrent += 'full_time='+input.full_time;
        }
        setQueryParams(queryParamsCurrent);
        setPage(1);
    };

    const loadMore = async () => {
        setMoreLoading(true);
        setPage(page+1);
    };

    return (
        <>
            <Header />
            <Box p={"4"} pt={"85px"} pb={"200px"} w={"100%"}>
                <form onSubmit={handleSubmit(submit)}>
                    <Grid templateColumns='repeat(6, 1fr)' gap={6} position="fixed" w="100%">
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel>Job Description</FormLabel>
                                <Input type="text" placeholder="Filter by title, benefits, companies, expertise" {...register('description')} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel>Location</FormLabel>
                                <Input type="text" placeholder="Filter by city, state, zip code or country" {...register('location')} />
                            </FormControl>
                        </GridItem>
                        <GridItem pt={10} mx={"auto"}>
                            <Checkbox {...register('full_time')}>Full Time Only</Checkbox>
                        </GridItem>
                        <GridItem pt={8} mx={"auto"}>
                            <Button type="submit" colorScheme={"blue"} size={"md"}>Search</Button>
                        </GridItem>
                    </Grid>
                </form>
                <Box w={"100%"} border={"solid 5px"} borderColor={"gray.200"} p={4} mt={"90px"} h={"calc(100vh - 195px)"} overflowY={"auto"}>
                    <VStack w={"100%"} placeItems={"start"}>
                        <Heading>
                            Job List
                        </Heading>
                        <Divider />
                        {
                            job.map((value, index) => (
                                <VStack key={"jobList"+index} w={"100%"} placeItems={"start"}>
                                    <HStack w={"100%"} placeItems={"start"}>
                                        <VStack placeItems={"start"} gap={0}>
                                            <Link to={"/job/"+value.id}>
                                                <Text color={"blue.500"} fontWeight={"bold"}>
                                                    {value.title}
                                                </Text>
                                            </Link>
                                            <Text color={"gray.500"} fontSize={"12px"}>
                                                {value.company} - <Text as={"span"} color={"green"} fontWeight={"bold"}>{value.type}</Text>
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <VStack placeItems={"end"} gap={0}>
                                            <Text color={"gray"}>
                                                {value.location}
                                            </Text>
                                            <Text color={"gray.500"} fontSize={"12px"}>
                                                {moment(value.created_at).fromNow()}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <Divider />
                                </VStack>
                            ))
                        }
                        {
                            more && <Button onClick={loadMore} isLoading={moreLoading} mt={2} w={"100%"} colorScheme={"blue"}>More Jobs</Button>
                        }
                    </VStack>
                </Box>
            </Box>
        </>
    );
}

export default Job;
