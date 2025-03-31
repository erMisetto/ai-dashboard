import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './index.css';

const AIBIDashboard = () => {
  const [activeTab, setActiveTab] = useState('tactical');
  const [automationLevel, setAutomationLevel] = useState(3);
  const [selectedFilters, setSelectedFilters] = useState({
    timeRange: '24h',
    productCategory: 'all',
    competitors: 'all',
    region: 'all'
  });
  const [eventsProcessed, setEventsProcessed] = useState(381487);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [salesData, setSalesData] = useState([
    { name: '09:00', value: 405000, competitors: 388000 },
    { name: '10:00', value: 422000, competitors: 410000 },
    { name: '11:00', value: 580000, competitors: 520000 },
    { name: '12:00', value: 680000, competitors: 600000 },
    { name: '13:00', value: 720000, competitors: 680000 },
    { name: '14:00', value: 780000, competitors: 820000 },
    { name: '15:00', value: 845000, competitors: 810000 },
    { name: 'Now', value: 920000, competitors: 875000 },
  ]);
  
  const forecastData = [
    { name: 'Now', value: 920000, forecast: 920000 },
    { name: '16:00', value: null, forecast: 1010000 },
    { name: '17:00', value: null, forecast: 1120000 },
    { name: '18:00', value: null, forecast: 1280000 },
    { name: '19:00', value: null, forecast: 1360000 },
    { name: '20:00', value: null, forecast: 1220000 },
    { name: '21:00', value: null, forecast: 1080000 },
    { name: '22:00', value: null, forecast: 840000 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 42 },
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
      urgency: 'high',
      category: 'Electronics'
    },
    { 
      id: 2, 
      product: 'Ultra HD Smart TV 55"', 
      currentPrice: 699.99, 
      recommendedPrice: 749.99, 
      reason: 'Trending on social media, demand spiking +218% in last hour', 
      confidence: 87,
      urgency: 'medium',
      category: 'Electronics'
    },
    { 
      id: 3, 
      product: 'Premium Bluetooth Speaker', 
      currentPrice: 89.99, 
      recommendedPrice: 79.99, 
      reason: 'High cart abandonment rate (47%) in last 30 minutes', 
      confidence: 78,
      urgency: 'medium',
      category: 'Electronics'
    },
    { 
      id: 4, 
      product: 'Smart Home Hub Pro', 
      currentPrice: 129.99, 
      recommendedPrice: 119.99, 
      reason: 'Similar products trending on Amazon, potential market shift', 
      confidence: 71,
      urgency: 'low',
      category: 'Electronics'
    },
    { 
      id: 5, 
      product: 'Designer Handbag - Luxury Collection', 
      currentPrice: 299.99, 
      recommendedPrice: 329.99, 
      reason: 'Celebrity endorsement detected on Instagram, 15% engagement increase', 
      confidence: 85,
      urgency: 'medium',
      category: 'Fashion'
    },
    { 
      id: 6, 
      product: 'Smart Fitness Watch', 
      currentPrice: 179.99, 
      recommendedPrice: 169.99, 
      reason: 'Competitor launching new model next week, preemptive discount advised', 
      confidence: 82,
      urgency: 'medium',
      category: 'Electronics'
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

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };
  
  // Format date as "Today at HH:MM:SS"
  const formatDateTime = (date) => {
    return `Today at ${formatTime(date)}`;
  };

  // Define handleRefresh with useCallback BEFORE using it in useEffect
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    
    // Small random increment to events processed counter
    const newEventsCount = eventsProcessed + Math.floor(Math.random() * 800) + 200;
    
    // Update the sales data with realistic changes
    const newSalesData = [...salesData];
    
    // Shift time values one step forward (simulating time progression)
    for (let i = 0; i < newSalesData.length - 1; i++) {
      newSalesData[i] = { ...newSalesData[i+1], name: newSalesData[i].name };
    }
    
    // Update the last data point with new realistic values that follow the trend
    const trendFactor = Math.random() * 0.06 + 0.97; // Between 0.97 and 1.03 (slight trend variation)
    const lastValue = newSalesData[newSalesData.length - 2].value;
    const lastCompValue = newSalesData[newSalesData.length - 2].competitors;
    
    newSalesData[newSalesData.length - 1] = {
      name: 'Now',
      value: Math.round(lastValue * trendFactor),
      competitors: Math.round(lastCompValue * (trendFactor * 0.98 + 0.01)) // Slightly different trend
    };
    
    // Update state after a slight delay to simulate data fetching
    setTimeout(() => {
      setSalesData(newSalesData);
      setEventsProcessed(newEventsCount);
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 600);
  }, [eventsProcessed, salesData]);

  // Now use the memoized function in useEffect
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      handleRefresh();
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(refreshInterval);
  }, [handleRefresh]);

  // Toggle for automation level
  const handleAutomationChange = (e) => {
    setAutomationLevel(parseInt(e.target.value));
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  // Apply filters to recommendations
  const filteredRecommendations = pricingRecommendations.filter(rec => {
    if (selectedFilters.productCategory !== 'all' && rec.category !== selectedFilters.productCategory) {
      return false;
    }
    return true;
  });

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
              <span>User</span>
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
            <p className="last-updated">Last updated: {formatDateTime(lastUpdated)} (updating in real-time)</p>
          </div>
          <div className="header-controls">
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span>Live Data</span>
            </div>
            <button 
              className={`refresh-button ${isRefreshing ? 'refreshing' : ''}`}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
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
                        <YAxis 
                          tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`}
                          domain={[0, 1600000]}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${formatNumber(value)}`, 'Value']}
                        />
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
                    <span>Peak demand forecasted at 19:00 (1,360,000 units), consider optimizing pricing now</span>
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

            {/* Filters */}
            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-label">Time Range:</label>
                <select 
                  className="filter-select"
                  value={selectedFilters.timeRange}
                  onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                >
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Product Category:</label>
                <select 
                  className="filter-select"
                  value={selectedFilters.productCategory}
                  onChange={(e) => handleFilterChange('productCategory', e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Competitors:</label>
                <select 
                  className="filter-select"
                  value={selectedFilters.competitors}
                  onChange={(e) => handleFilterChange('competitors', e.target.value)}
                >
                  <option value="all">All Competitors</option>
                  <option value="techgiant">TechGiant Store</option>
                  <option value="electromarket">ElectroMarket</option>
                  <option value="supershop">SuperShop</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Region:</label>
                <select 
                  className="filter-select"
                  value={selectedFilters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                >
                  <option value="all">All Regions</option>
                  <option value="north">North America</option>
                  <option value="europe">Europe</option>
                  <option value="asia">Asia-Pacific</option>
                </select>
              </div>
            </div>

            {/* Real-Time Sales Tracking */}
            <div className="panel margined">
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">Real-Time Sales vs Competitor Pricing</h3>
                  <p className="panel-subtitle">Live data streaming via Apache Kafka</p>
                </div>
                <div className="live-data-stats">
                  <div className="live-indicator">
                    <span className="live-dot"></span>
                    <span>Updating live</span>
                  </div>
                  <div className="events-counter">
                    <span className="events-label">Events processed:</span>
                    <span className="events-value">{formatNumber(eventsProcessed)}</span>
                  </div>
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
                      <YAxis 
                        tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`}
                        domain={[300000, 1000000]}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${formatNumber(value)}`, 'Value']}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" name="Our Sales ($)" strokeWidth={2} />
                      <Line type="monotone" dataKey="competitors" stroke="#82ca9d" name="Competitor Avg ($)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="panel-footer">
                <div className="update-schedule">
                  Next data refresh in <span className="countdown">30s</span>
                </div>
              </div>
            </div>

            {/* AI Assistant / NLP Query Box */}
            <div className="panel margined">
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
                  <p>Try asking:</p>
                  <div className="query-suggestion-list">
                    <button className="query-suggestion">How are competitor prices affecting our conversion rate?</button>
                    <button className="query-suggestion">Predict sales for the next 4 hours</button>
                    <button className="query-suggestion">Which products should we consider for a flash sale?</button>
                    <button className="query-suggestion">What's driving the current trend in the Electronics category?</button>
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
                        <th>Category</th>
                        <th>Current Price</th>
                        <th>Recommended</th>
                        <th>Reason</th>
                        <th>Confidence</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecommendations.map((rec) => (
                        <tr key={rec.id} className={rec.urgency === 'high' ? 'row-urgent' : rec.urgency === 'medium' ? 'row-warning' : ''}>
                          <td className="cell-product">
                            {rec.product}
                          </td>
                          <td>
                            {rec.category}
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
                          <p className="process-subtitle">Processing {formatNumber(eventsProcessed)} events/second</p>
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