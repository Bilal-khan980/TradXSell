import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Complains() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('/complaints');
                setComplaints(response.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <div style={{ display: 'flex', backgroundColor: 'white', minHeight: '100vh', color: '#000000' }}>
            <div style={{
                flex: 1,
                transition: 'margin-left 0.3s ease', // Smooth transition
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ padding: '20px', width: '100%' }}>
                    <h1 style={{ color: '#EF5B2B', marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>Complaints</h1>
                    <div style={{ overflowX: 'auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                            <thead>
                                <tr style={{ backgroundColor: '#EF5B2B' }}>
                                    <th style={tableHeaderStyle}>Email</th>
                                    <th style={tableHeaderStyle}>Complaint</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.map((complaint, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={tableCellStyle}>{complaint.email}</td>
                                        <td style={tableCellStyle}>{complaint.complaint}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const tableHeaderStyle = {
    padding: '16px',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#ffffff',
    borderBottom: '2px solid #ffffff',
};

const tableCellStyle = {
    padding: '14px',
    color: '#333333',
};

export default Complains;
