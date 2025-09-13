import React from 'react';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import Sidebar from '../components/Sidebar/Sidebar';
import './COGSReport.css';
import TopFilters from "../components/TopFilters/TopFilters";
import ChartCard from "../components/ChartCard/ChartCard";

// Sample Data
const tableData = [
    {
        description: 'Gross Sales (A)',
        kitchen: 6080405,
        pastry: 2071103,
        bar: 3366424,
        total: 1151931 + 10000000,
    },
    {
        description: 'Discount (B)',
        kitchen: 4508,
        pastry: 8611,
        bar: 1682,
        total: 14801,
    },
    {
        description: 'Net Sales (D = A-C)',
        kitchen: 5366717,
        pastry: 1855689,
        bar: 296412,
        total: 10181818,
    },
];

const breakdown = [
    { name: 'Kitchen', value: 23.2 },
    { name: 'Pastry', value: 13.9 },
    { name: 'Bar', value: 15.6 },
    { name: 'Total', value: 19.3 },
];

const wastageData = [
    { name: 'Kitchen', value: 0.43 },
    { name: 'Pastry', value: 1.04 },
    { name: 'Bar', value: 0.24 },
    { name: 'Total', value: 0.49 },
];

const inventoryVariance = [
    { name: 'Kitchen', value: 2.14 },
    { name: 'Pastry', value: -4.98 },
    { name: 'Bar', value: -0.9 },
    { name: 'Total', value: -0.04 },
];

const COLORS = ['#FFB26B', '#FF7A7A', '#FFD56B', '#7BCFA3'];

function formatCurrency(n: number) {
    return n.toLocaleString('en-IN');
}

export default function COGSReportPage() {
    const handleDownloadCSV = () => {
        const headers = ['Description', 'Kitchen', 'Pastry', 'Bar', 'Total'];
        const rows = tableData.map((r) => [r.description, r.kitchen, r.pastry, r.bar, r.total]);
        const csv = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cogs_report.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen flex cogs-page">
            <Sidebar />

            <main className="flex-1 main-content">
                <TopFilters />

                {/* Top-Selling Items frame */}
                <section className="report-frame">
                    <div className="report-card">
                        <div className="card-row">
                            <div className="card-strip">
                                <span>Top-Selling Items</span>
                                <span className="info-dot">i</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 8 }}>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Cost Centre → Description ↓</th>
                                        <th>Kitchen</th>
                                        <th>Pastry</th>
                                        <th>Bar</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, idx) => (
                                        <tr key={idx} className={idx === tableData.length - 1 ? 'total-row' : ''}>
                                            <td>{row.description}</td>
                                            <td>{formatCurrency(row.kitchen)}</td>
                                            <td>{formatCurrency(row.pastry)}</td>
                                            <td>{formatCurrency(row.bar)}</td>
                                            <td>{formatCurrency(row.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* COGS Range / Breakdown frame */}
                <section className="report-frame">
                    <div className="report-card">
                        <div className="card-row">
                            <div className="card-strip">
                                <span>COGS Range</span>
                                <span className="info-dot">i</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 8 }}>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Kitchen</th>
                                        <th>Pastry</th>
                                        <th>Bar</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Open Items (Sales Available No COGS Captured)</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                    </tr>
                                    <tr>
                                        <td>Below 10% COGS</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                    </tr>
                                    <tr>
                                        <td>10% to 20% COGS</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                        <td>0.00%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Breakdown small table */}
                <section className="report-frame">
                    <div className="report-card">
                        <div className="card-row">
                            <div className="card-strip">
                                <span>COGS Breakdown</span>
                                <span className="info-dot">i</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 8 }}>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Cost Centre → Description ↓</th>
                                        <th>Kitchen</th>
                                        <th>Pastry</th>
                                        <th>Bar</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>COGS As Per Recipe (Theoretical COGS)</td>
                                        <td>20.17%</td>
                                        <td>16.90%</td>
                                        <td>15.31%</td>
                                        <td>18.16%</td>
                                    </tr>
                                    <tr>
                                        <td>Wastages</td>
                                        <td>0.43%</td>
                                        <td>1.04%</td>
                                        <td>0.24%</td>
                                        <td>0.49%</td>
                                    </tr>
                                    <tr>
                                        <td>Inventory Variances</td>
                                        <td>2.14%</td>
                                        <td>-4.98%</td>
                                        <td>-0.90%</td>
                                        <td>-0.04%</td>
                                    </tr>
                                    <tr className="total-row">
                                        <td>Actual Total COGS</td>
                                        <td>23.2%</td>
                                        <td>13.9%</td>
                                        <td>15.6%</td>
                                        <td>19.3%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Charts grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="chart-card">
                        <h4>COGS As Per Recipe</h4>
                        <div style={{ height: 160 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={breakdown}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip />
                                    <Bar dataKey="value">
                                        {breakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-card">
                        <h4>Wastages</h4>
                        <div style={{ height: 160 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={wastageData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip />
                                    <Bar dataKey="value">
                                        {wastageData.map((entry, idx) => (
                                            <Cell key={`w-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-card">
                        <h4>Inventory Variances</h4>
                        <div style={{ height: 160 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={inventoryVariance}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip />
                                    <Bar dataKey="value">
                                        {inventoryVariance.map((entry, idx) => (
                                            <Cell key={`iv-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* Bottom section: locations + pie */}
                <section className="report-frame">
                    <div className="report-card">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                            <div className="col-span-2">
                                <div className="card-strip" style={{ marginBottom: 12 }}>
                                    <span>Location</span>
                                    <span className="info-dot">i</span>
                                </div>
                                <table className="report-table">
                                    <thead>
                                        <tr>
                                            <th>Location</th>
                                            <th>Gross Sales</th>
                                            <th>Discount</th>
                                            <th>Net Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Bar</td>
                                            <td>{formatCurrency(336423.5)}</td>
                                            <td>{formatCurrency(1681.61)}</td>
                                            <td>{formatCurrency(296411.972)}</td>
                                        </tr>
                                        <tr>
                                            <td>Kitchen</td>
                                            <td>{formatCurrency(608040.5)}</td>
                                            <td>{formatCurrency(4508.25)}</td>
                                            <td>{formatCurrency(536716.7843)}</td>
                                        </tr>
                                        <tr className="total-row">
                                            <td>Grand Total</td>
                                            <td>{formatCurrency(1151930.5)}</td>
                                            <td>{formatCurrency(14800.96)}</td>
                                            <td>{formatCurrency(1018818.185)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-span-1 flex items-center justify-center">
                                <div className="chart-card" style={{ width: 220, height: 220 }}>
                                    <h4>Sales Share</h4>
                                    <div style={{ width: '100%', height: '100%' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[{ name: 'Kitchen', value: 60 }, { name: 'Pastry', value: 25 }, { name: 'Bar', value: 15 }]}
                                                    dataKey="value"
                                                    outerRadius={80}
                                                    innerRadius={40}
                                                >
                                                    <Cell fill="#FFB26B" />
                                                    <Cell fill="#FF7A7A" />
                                                    <Cell fill="#FFD56B" />
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
