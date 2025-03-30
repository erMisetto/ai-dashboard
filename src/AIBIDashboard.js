import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './index.css';

const AIBIDashboard = () => {
  const [activeTab, setActiveTab] = useState('tactical');
  const [automationLevel, setAutomationLevel] = useState(3);
  
  // Sample data for the dashboards
  const salesData = [
    { name: '9:00', value: 4000, competitors: 3800 },
    { name: '10:00', value: 4200, competitors: 4100 },
    { name: '11:00', value: 5800, competitors: 5200 },
    { name: '12:00', value: 6800, competitors: 6000 },
    { name: '13:00', value: 7200, competitors: 6800 },
    { name: '14:00', value: 7800, competitors: 8200 },
    { name: '15:00', value: 8400, competitors: 8100 },
    { name: 'Now', value: 9200, competitors: 8700 },
  ];

  const forecastData = [
    { name: 'Now', value: 9200, forecast: 9200 },
    { name: '16:00', value: null, forecast: 10100 },
    { name: '17:00', value: null, forecast: 11200 },
    { name: '18:00', value: null, forecast: 12800 },
    { name: '19:00', value: null, forecast: 13600 },
    { name: '20:00', value: null, forecast: 12200 },
    { name: '21:00', value: null, forecast: 10800 },
    { name: '22:00', value: null, forecast: 8400 },
  ];

  const categoryData = [
    { name: 'Electr', value: 42 },
    { name: 'Fashion', value: 28 },
    { name: 'Home', value: 15 },
    { name: 'Beauty', value: 10 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const pricingRecommendations = [
    { 
      id: 1, 
      product: 'Wireless Headphones XB-900', 
      currentPrice: 149.99, 
      recommendedPrice: 134.99, 
      reason: 'Competitor price drop detected, 3 competitors now at $139.99', 
      confidence: 92,
      urgency: 'high'
    },
    { 
      id: 2, 
      product: 'Ultra HD Smart TV 55"', 
      currentPrice: 699.99, 
      recommendedPrice: 749.99, 
      reason: 'Trending on social media, demand spiking +218% in last hour', 
      confidence: 87,
      urgency: 'medium'
    },
    { 
      id: 3, 
      product: 'Premium Bluetooth Speaker', 
      currentPrice: 89.99, 
      recommendedPrice: 79.99, 
      reason: 'High cart abandonment rate (47%) in last 30 minutes', 
      confidence: 78,
      urgency: 'medium'
    },
    { 
      id: 4, 
      product: 'Smart Home Hub Pro', 
      currentPrice: 129.99, 
      recommendedPrice: 119.99, 
      reason: 'Similar products trending on Amazon, potential market shift', 
      confidence: 71,
      urgency: 'low'
    }
  ];

  const metrics = [
    { 
      label: 'Active Visitors', 
      value: '24,872', 
      change: '+12%', 
      positive: true, 
      color: 'metric-indigo'
    },
    { 
      label: 'Revenue Today', 
      value: '$238,492', 
      change: '+8%', 
      positive: true, 
      color: 'metric-green'
    },
    { 
      label: 'Avg. Cart Value', 
      value: '$94.28', 
      change: '+3%', 
      positive: true, 
      color: 'metric-blue'
    },
    { 
      label: 'Conversion Rate', 
      value: '3.8%', 
      change: '-0.2%', 
      positive: false, 
      color: 'metric-red'
    }
  ];

  // Toggle for automation level
  const handleAutomationChange = (e) => {
    setAutomationLevel(parseInt(e.target.value));
  };

  return (
    <div className="dashboard">
      {/* Top Navigation */}
      <div className="nav-container">
        <div className="navbar">
          <div className="nav-brand">DynamicPrice AI</div>
          <div className="nav-tabs">
            <button
              onClick={() => setActiveTab('strategic')}
              className={`nav-tab ${activeTab === 'strategic' ? 'active' : ''}`}
            >
              Strategic View
            </button>
            <button
              onClick={() => setActiveTab('tactical')}
              className={`nav-tab ${activeTab === 'tactical' ? 'active' : ''}`}
            >
              Tactical Dashboard
            </button>
            <button
              onClick={() => setActiveTab('data-flow')}
              className={`nav-tab ${activeTab === 'data-flow' ? 'active' : ''}`}
            >
              Data Architecture
            </button>
          </div>
          <div className="nav-icons">
            <button className="icon-button">
              <span className="notification-icon">🔔</span>
            </button>
            <div className="user-avatar">
              <img
                src="https://via.placeholder.com/32"
                alt="User"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Dashboard Header with Real-time Status */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              {activeTab === 'strategic' ? 'Strategic Pricing Analysis' : 
               activeTab === 'tactical' ? 'Real-Time Dynamic Pricing Dashboard' : 
               'Data Flow Architecture'}
            </h1>
            <p className="last-updated">Last updated: Today at 15:42:33 (updating in real-time)</p>
          </div>
          <div className="header-controls">
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span>Live Data</span>
            </div>
            <button className="refresh-button">
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Strategic View */}
        {activeTab === 'strategic' && (
          <div>
            <div className="grid-2-col">
              {/* Market Trends Panel */}
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">Market Trends Analysis</h3>
                    <p className="panel-subtitle">AI-detected trends based on market signals</p>
                  </div>
                  <span className="badge blue">ML-Powered</span>
                </div>
                <div className="panel-body">
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[...salesData, ...forecastData.filter(d => d.name !== 'Now')]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="Actual Sales" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="competitors" stroke="#82ca9d" name="Competitor Avg" strokeWidth={2} />
                        <Line type="monotone" dataKey="forecast" stroke="#ff7300" name="ML Forecast" strokeWidth={2} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="panel-footer">
                  <div className="ai-insight">
                    <span>AI Insight: </span>
                    <span>Peak demand forecasted at 19:00 (13,600 units), consider optimizing pricing now</span>
                  </div>
                </div>
              </div>

              {/* Category Performance Panel */}
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">Category Performance</h3>
                    <p className="panel-subtitle">Profitability analysis by product category</p>
                  </div>
                  <span className="badge blue">NLP Analysis</span>
                </div>
                <div className="panel-body">
                  <div className="grid-2-col">
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h4 className="section-title">AI-Generated Insights</h4>
                      <ul className="insights-list">
                        <li className="insight-item indigo">
                          <div className="insight-title">Electronics</div>
                          <div className="insight-detail">Price elasticity -0.87 (relatively inelastic)</div>
                          <div className="insight-action">Opportunity to increase margins by 4-7%</div>
                        </li>
                        <li className="insight-item green">
                          <div className="insight-title">Fashion</div>
                          <div className="insight-detail">Price elasticity -1.62 (highly elastic)</div>
                          <div className="insight-action">Consider flash sale for inventory reduction</div>
                        </li>
                        <li className="insight-item yellow">
                          <div className="insight-title">Home</div>
                          <div className="insight-detail">Price elasticity -1.05 (elastic)</div>
                          <div className="insight-action">Stable pricing recommended</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Analysis Panel */}
            <div className="panel margined">
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">Competitive Pricing Analysis</h3>
                  <p className="panel-subtitle">ML-based competitor price tracking and response strategy</p>
                </div>
                <span className="badge purple">AI Strategy</span>
              </div>
              <div className="panel-body">
                <div className="grid-2-col">
                  <div>
                    <h4 className="section-title">Top Competitors Price Changes</h4>
                    <div className="competitors-list">
                      <div className="competitor-item">
                        <div className="competitor-info">
                          <div className="competitor-icon blue">📦</div>
                          <div>
                            <div className="competitor-name">TechGiant Store</div>
                            <div className="competitor-detail">42 product prices changed in last 24h</div>
                          </div>
                        </div>
                        <span className="price-change negative">↘️ -3.8%</span>
                      </div>
                      
                      <div className="competitor-item">
                        <div className="competitor-info">
                          <div className="competitor-icon green">📦</div>
                          <div>
                            <div className="competitor-name">ElectroMarket</div>
                            <div className="competitor-detail">17 product prices changed in last 24h</div>
                          </div>
                        </div>
                        <span className="price-change positive">↗️ +2.1%</span>
                      </div>
                      
                      <div className="competitor-item">
                        <div className="competitor-info">
                          <div className="competitor-icon yellow">📦</div>
                          <div>
                            <div className="competitor-name">SuperShop</div>
                            <div className="competitor-detail">31 product prices changed in last 24h</div>
                          </div>
                        </div>
                        <span className="price-change negative">↘️ -1.4%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="strategy-section">
                    <h4 className="section-title">AI-Generated Strategy Recommendations</h4>
                    <div className="strategy-list">
                      <div className="strategy-item indigo">
                        <div className="strategy-category">Electronics Category</div>
                        <p className="strategy-detail">
                          Competitor TechGiant appears to be running a seasonal sale. Recommended matching their pricing for high-volume SKUs while maintaining margins on accessories.
                        </p>
                        <div className="strategy-action">
                          <button className="strategy-button indigo">
                            Apply Strategy
                          </button>
                        </div>
                      </div>
                      
                      <div className="strategy-item green">
                        <div className="strategy-category">Home Goods Category</div>
                        <p className="strategy-detail">
                          Social media sentiment analysis shows increasing interest in sustainable products. Opportunity to increase prices by 5-8% for eco-friendly items.
                        </p>
                        <div className="strategy-action">
                          <button className="strategy-button green">
                            Apply Strategy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tactical Dashboard */}
        {activeTab === 'tactical' && (
          <div>
            {/* KPI Metrics */}
            <div className="metrics-container">
              {metrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div>
                    <div className="metric-content">
                      <div className={`metric-icon ${metric.color}`}>
                        {metric.color === 'metric-indigo' ? '👥' : 
                         metric.color === 'metric-green' ? '💵' : 
                         metric.color === 'metric-blue' ? '🛒' : '📊'}
                      </div>
                      <div className="metric-data">
                        <div className="metric-label">{metric.label}</div>
                        <div className="metric-value-container">
                          <div className="metric-value">{metric.value}</div>
                          <div className={`metric-change ${metric.positive ? 'positive' : 'negative'}`}>
                            {metric.positive ? '↗️' : '↘️'} {metric.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid-sales-nlp">
              {/* Real-Time Sales Tracking */}
              <div className="panel sales-panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">Real-Time Sales vs Competitor Pricing</h3>
                    <p className="panel-subtitle">Live data streaming via Apache Kafka</p>
                  </div>
                  <div className="live-indicator">
                    <span className="live-dot"></span>
                    <span>Updating live</span>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={salesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="Our Sales ($)" strokeWidth={2} />
                        <Line type="monotone" dataKey="competitors" stroke="#82ca9d" name="Competitor Avg ($)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* AI Assistant / NLP Query Box */}
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">Ask AI Assistant</h3>
                    <p className="panel-subtitle">Natural language queries powered by NLP</p>
                  </div>
                  <span className="badge indigo">NLP</span>
                </div>
                <div className="panel-body">
                  <div className="search-container">
                    <div className="search-box">
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Ask a question about your data..."
                        defaultValue="Which product category is most profitable right now?"
                      />
                      <div className="search-icon">
                        💬
                      </div>
                    </div>
                  </div>
                  <div className="response-container">
                    <div className="response-content">
                      <p className="response-header">Response:</p>
                      <p>Electronics is currently your most profitable category with a 42% profit margin, followed by Fashion at 28%. Based on real-time sales data, the "Wireless Headphones XB-900" product has the highest individual profit contribution.</p>
                      <div className="response-chart">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={categoryData}
                            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" name="Profit Margin %" fill="#8884d8">
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="query-examples">
                    Try asking: "How are competitor prices affecting our conversion rate?" or "Predict sales for the next 4 hours"
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Recommendations Panel */}
            <div className="panel margined">
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">AI-Generated Pricing Recommendations</h3>
                  <p className="panel-subtitle">Real-time ML-driven dynamic pricing suggestions</p>
                </div>
                <div className="automation-controls">
                  <label htmlFor="automation" className="automation-label">Automation Level:</label>
                  <input
                    id="automation"
                    type="range"
                    min="1"
                    max="5"
                    value={automationLevel}
                    onChange={handleAutomationChange}
                    className="automation-slider"
                  />
                  <span className="automation-level">
                    {automationLevel === 1 ? 'Manual' : 
                     automationLevel === 2 ? 'Guided' : 
                     automationLevel === 3 ? 'Semi-Auto' : 
                     automationLevel === 4 ? 'Mostly Auto' : 
                     'Fully Auto'}
                  </span>
                </div>
              </div>
              <div className="panel-body">
                <div className="table-container">
                  <table className="recommendations-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Current Price</th>
                        <th>Recommended</th>
                        <th>Reason</th>
                        <th>Confidence</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingRecommendations.map((rec) => (
                        <tr key={rec.id} className={rec.urgency === 'high' ? 'row-urgent' : rec.urgency === 'medium' ? 'row-warning' : ''}>
                          <td className="cell-product">
                            {rec.product}
                          </td>
                          <td>
                            ${rec.currentPrice}
                          </td>
                          <td>
                            <span className={rec.recommendedPrice < rec.currentPrice ? "price-down" : "price-up"}>
                              ${rec.recommendedPrice}
                            </span>
                          </td>
                          <td>
                            {rec.reason}
                          </td>
                          <td>
                            <div className="confidence-bar-container">
                              <div className="confidence-bar">
                                <div className="confidence-level" style={{ width: `${rec.confidence}%` }}></div>
                              </div>
                              <span>{rec.confidence}%</span>
                            </div>
                          </td>
                          <td className="cell-action">
                            <button className="apply-button">
                              Apply
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="panel-footer">
                <div className="automation-status">
                  <span className="status-label">Automation Status: </span>
                  <span className="status-value">
                    {automationLevel >= 4 ? 
                      'System is automatically applying recommendations with confidence > 85%' : 
                      'Awaiting manual approval for all price changes'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Architecture View */}
        {activeTab === 'data-flow' && (
          <div>
            <div className="panel margined">
              <div className="panel-header">
                <h3 className="panel-title">AI-Driven BI Data Architecture</h3>
                <p className="panel-subtitle">End-to-end data flow from ingestion to visualization</p>
              </div>
              <div className="panel-body">
                <div className="data-flow">
                  {/* Data Flow Diagram */}
                  <div className="data-flow-container">
                    {/* Data Sources Layer */}
                    <div className="data-flow-section">
                      <div className="data-flow-header">
                        <h4>Data Sources</h4>
                      </div>
                      <div className="data-sources">
                        <div className="data-source">
                          <div className="source-icon blue">💬</div>
                          <p className="source-name">CRM System</p>
                        </div>
                        <div className="data-source">
                          <div className="source-icon green">📦</div>
                          <p className="source-name">ERP System</p>
                        </div>
                        <div className="data-source">
                          <div className="source-icon purple">🛒</div>
                          <p className="source-name">E-commerce</p>
                        </div>
                        <div className="data-source">
                          <div className="source-icon indigo">📍</div>
                          <p className="source-name">Competitor API</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection Line */}
                    <div className="data-flow-connector"></div>
                    
                    {/* Data Ingestion & Streaming */}
                    <div className="data-flow-section">
                      <div className="data-flow-header orange">
                        <h4>Data Ingestion & Streaming (Apache Kafka)</h4>
                      </div>
                      <div className="data-processing">
                        <div className="process-icon orange">⚡</div>
                        <div className="process-details orange">
                          <p className="process-title">Real-time event streaming</p>
                          <p className="process-subtitle">Processing 10,000+ events/second</p>
                          <div className="process-status">
                            <div className="status-indicator-green"></div>
                            Healthy
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection Line */}
                    <div className="data-flow-connector"></div>
                    
                    {/* Data Warehouse */}
                    <div className="data-flow-section">
                      <div className="data-flow-header blue">
                        <h4>Data Warehouse (Snowflake)</h4>
                      </div>
                      <div className="data-warehouse">
                        <div className="warehouse-component">
                          <div className="warehouse-icon blue">🗄️</div>
                          <p className="warehouse-name">Raw Data Layer</p>
                        </div>
                        <div className="warehouse-component">
                          <div className="warehouse-icon blue">🖥️</div>
                          <p className="warehouse-name">Data Mart Layer</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection Line */}
                    <div className="data-flow-connector"></div>
                    
                    {/* Data Transformation */}
                    <div className="data-flow-section">
                      <div className="data-flow-header green">
                        <h4>Data Transformation (dbt)</h4>
                      </div>
                      <div className="data-processing">
                        <div className="process-icon green">🔀</div>
                        <div className="process-details green">
                          <p className="process-title">Automated transformations</p>
                          <p className="process-subtitle">Last run: 2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection Line */}
                    <div className="data-flow-connector"></div>
                    
                    {/* AI/ML Layer */}
                    <div className="data-flow-section">
                      <div className="data-flow-header purple">
                        <h4>AI/ML Processing Layer</h4>
                      </div>
                      <div className="ai-components">
                        <div className="ai-component">
                          <div className="ai-icon purple">📈</div>
                          <p className="ai-name">Predictive Models</p>
                        </div>
                        <div className="ai-component">
                          <div className="ai-icon purple">💬</div>
                          <p className="ai-name">NLP Processing</p>
                        </div>
                        <div className="ai-component">
                          <div className="ai-icon purple">⚙️</div>
                          <p className="ai-name">Decision Engine</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection Line */}
                    <div className="data-flow-connector"></div>
                    
                    {/* Visualization Layer */}
                    <div className="data-flow-section">
                      <div className="data-flow-header indigo">
                        <h4>User Interface & Visualization</h4>
                      </div>
                      <div className="visualization">
                        <div className="vis-icon indigo">📊</div>
                        <p className="vis-name">Interactive AI-Driven Dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer data-footer">
                <div className="data-stats">
                  <div className="data-stat">
                    <span className="stat-label">Data Refresh Frequency: </span>
                    <span className="stat-value">Real-time streaming with sub-second latency</span>
                  </div>
                  <div className="data-stat">
                    <span className="stat-label">AI Model Updates: </span>
                    <span className="stat-value">Continuous learning (last updated 5 min ago)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBIDashboard;