import React, { useState } from 'react';
import { Badge, Table, Alert } from 'react-bootstrap';

interface DnsRecord {
    type: string;
    name: string;
    data: string;
}

interface DnsRecordProps {
    dnsRecordData: DnsRecord[];
}

const DnsRecord: React.FC<DnsRecordProps> = ({ dnsRecordData }) => {
    const [copyStatus, setCopyStatus] = useState<number | null>(null);

    const typeColorMap: Record<string, string> = {
        'CNAME': '#f9844a',
        'A': '#f9c34f',      
        'AAAA': '#90be6d',   
        'MX': '#43aa8b',     
        'TXT': '#4d908e',    
        'NS': '#576190'     
    };

    const cnameRecord = dnsRecordData.find(r => r.type === 'CNAME');

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(index);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    if (!dnsRecordData || dnsRecordData.length === 0) {
        return (
            <div className="mt-4" style={{ maxWidth: '1100px' }}>
                <Alert variant="secondary" className="text-center">
                    No records found.
                </Alert>
            </div>
        );
    }

    return (
        <div className="dns-records-container mt-4" style={{ maxWidth: '1100px', marginLeft: '0', marginRight: 'auto' }}>
            
            {cnameRecord && (
                <div 
                    className="alert mb-4 shadow-sm border-0 d-flex align-items-center" 
                    style={{ 
                        backgroundColor: '#e3f2fd', 
                        color: '#0d47a1',           
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontSize: '0.95rem'
                    }}
                >
                    <span className="me-2" style={{ fontSize: '1.2rem' }}>🌐</span>
                    <span>
                        <strong>DNS Alias:</strong> This hostname points to <code>{cnameRecord.data}</code>
                    </span>
                </div>
            )}

            <h5 className="mb-3 text-muted px-1">DNS Records</h5>
            <div className="card shadow-sm border-0">
                <Table striped hover responsive className="mb-0">
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '12%', padding: '15px' }}>Type</th>
                            <th style={{ width: '28%', padding: '15px' }}>Name</th>
                            <th style={{ width: '60%', padding: '15px' }}>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dnsRecordData.map((record, index) => (
                            <tr key={index}>
                                <td className="align-middle" style={{ padding: '12px 15px' }}>
                                    <Badge 
                                        bg="none"
                                        style={{ 
                                            backgroundColor: typeColorMap[record.type] || '#343a40', 
                                            width: '60px', 
                                            padding: '6px',
                                            color: 'white',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {record.type}
                                    </Badge>
                                </td>
                                <td className="align-middle font-monospace small text-muted" style={{ padding: '12px 15px' }}>
                                    {record.name}
                                </td>
                                <td 
                                    className="text-break font-monospace align-middle" 
                                    style={{ 
                                        fontSize: '0.9rem', 
                                        padding: '12px 45px 12px 15px', 
                                        position: 'relative' 
                                    }}
                                >
                                    <span>{record.data}</span>
                                    <button 
                                        className={`btn btn-sm py-0 px-1 border-0 ${copyStatus === index ? 'text-success' : 'text-muted'}`}
                                        onClick={() => handleCopy(record.data, index)}
                                        title="Copy to clipboard"
                                        style={{ 
                                            background: 'transparent', 
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            outline: 'none', 
                                            boxShadow: 'none' 
                                        }}
                                    >
                                        {copyStatus === index ? (
                                            <span style={{ fontSize: '0.9rem' }}>✓</span>
                                        ) : (
                                            <span style={{ fontSize: '0.9rem' }}>📋</span>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default DnsRecord;