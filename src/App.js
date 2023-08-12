import React from 'react';
import {
    ChakraProvider
} from '@chakra-ui/react';
import Public from './components/Public';
import Protected from './components/Protected';
import Login from './components/Login';
import Job from './components/Job';
import JobDetail from './components/JobDetail';
import { Routes, Route } from "react-router-dom";
import './App.css';

function App() {
    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<Public><Login /></Public>} />
                <Route path="/job" element={<Protected><Job /></Protected>} />
                <Route path="/job/:id" element={<Protected><JobDetail /></Protected>} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
