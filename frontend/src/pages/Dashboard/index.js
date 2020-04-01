import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
//import { FiTrash2 } from 'react-icons/fi'; PROTOTIPO DE BOTÃO DELETAR SPOT
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);

    useEffect(() => {

        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            
            setSpots(response.data);
        }
    
        loadSpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id !== id));
    }

    /*
    PROTOTIPO DE BOTÃO DELETAR SPOT
    async function handleDeleteSpot(company) {
        try {
            await api.delete(`spots/${company}`, {
                headers: {
                    company: company,
                }
            });
            setSpots(spots.filter(spot => spot.company !== company));
        } catch (err) {
            alert('Erro ao deletar Spot. Tente novamente.');
        }
    }
    */

    return (
        <>
        <ul className="notifications">
            {requests.map(request =>(
                <li key={request._id}>
                    <p>
                        <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                </li>
            ))}
        </ul>
        
        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                    <strong>{spot.company}</strong>

                    {/*
                    PROTOTIPO DE BOTÃO DELETAR SPOT
                    <button onClick={() => handleDeleteSpot(spots.company)} type="button">
                        <FiTrash2 size={20} color="#dc2626" />
                    </button>
                    */}

                    <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                </li>
            ))}
        </ul>
  
        <Link to="/new">
            <button className="btn">Cadastrar novo spot</button>
        </Link>
        </>
    )

}