import React, { useState, useEffect } from 'react';
import { USE_MOCK_DATA } from '../constants/config';
import { statisticsAPI } from '../services/api';
import './Analytics.css';

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [accidentsPeriod, setAccidentsPeriod] = useState('year');
  const [streetsPeriod, setStreetsPeriod] = useState('year');
  const [animatedTotal, setAnimatedTotal] = useState(798);
  const [animatedWithInjuries, setAnimatedWithInjuries] = useState(686);
  const [animatedFatal, setAnimatedFatal] = useState(112);
  const [animatedStreetTotal, setAnimatedStreetTotal] = useState(0);
  const [animatedStreetFatal, setAnimatedStreetFatal] = useState(0);

  const mockData = {
    month: {
      monthlyData: [
        { month: 'Янв', accidents: 8, fatal: 2 },
        { month: 'Фев', accidents: 12, fatal: 3 },
        { month: 'Мар', accidents: 15, fatal: 4 },
        { month: 'Апр', accidents: 18, fatal: 5 },
        { month: 'Май', accidents: 22, fatal: 6 },
        { month: 'Июн', accidents: 28, fatal: 7 },
        { month: 'Июл', accidents: 35, fatal: 8 },
        { month: 'Авг', accidents: 42, fatal: 9 },
        { month: 'Сен', accidents: 38, fatal: 8 },
        { month: 'Окт', accidents: 32, fatal: 7 },
        { month: 'Ноя', accidents: 25, fatal: 5 },
        { month: 'Дек', accidents: 18, fatal: 3 }
      ],
      total: 293,
      withInjuries: 250,
      fatal: 67
    },
    halfYear: {
      monthlyData: [
        { month: 'Янв', accidents: 45, fatal: 12 },
        { month: 'Фев', accidents: 52, fatal: 15 },
        { month: 'Мар', accidents: 48, fatal: 13 },
        { month: 'Апр', accidents: 55, fatal: 16 },
        { month: 'Май', accidents: 62, fatal: 18 },
        { month: 'Июн', accidents: 68, fatal: 20 },
        { month: 'Июл', accidents: 83, fatal: 17 },
        { month: 'Авг', accidents: 87, fatal: 22 },
        { month: 'Сен', accidents: 95, fatal: 25 },
        { month: 'Окт', accidents: 77, fatal: 17 },
        { month: 'Ноя', accidents: 53, fatal: 13 },
        { month: 'Дек', accidents: 46, fatal: 11 }
      ],
      total: 771,
      withInjuries: 650,
      fatal: 199
    },
    year: {
      monthlyData: [
        { month: 'Янв', accidents: 100, fatal: 40 },
        { month: 'Фев', accidents: 70, fatal: 53 },
        { month: 'Мар', accidents: 66, fatal: 43 },
        { month: 'Апр', accidents: 69, fatal: 31 },
        { month: 'Май', accidents: 76, fatal: 14 },
        { month: 'Июн', accidents: 78, fatal: 10 },
        { month: 'Июл', accidents: 83, fatal: 17 },
        { month: 'Авг', accidents: 87, fatal: 22 },
        { month: 'Сен', accidents: 95, fatal: 25 },
        { month: 'Окт', accidents: 77, fatal: 17 },
        { month: 'Ноя', accidents: 53, fatal: 13 },
        { month: 'Дек', accidents: 46, fatal: 11 }
      ],
      total: 798,
      withInjuries: 686,
      fatal: 112
    },
    fiveYears: {
      monthlyData: [
        { month: '2020', accidents: 920, fatal: 45 },
        { month: '2021', accidents: 850, fatal: 38 },
        { month: '2022', accidents: 890, fatal: 42 },
        { month: '2023', accidents: 820, fatal: 35 },
        { month: '2024', accidents: 798, fatal: 32 },
        { month: '2025', accidents: 0, fatal: 0 },
        { month: '2026', accidents: 0, fatal: 0 },
        { month: '2027', accidents: 0, fatal: 0 },
        { month: '2028', accidents: 0, fatal: 0 },
        { month: '2029', accidents: 0, fatal: 0 },
        { month: '2030', accidents: 0, fatal: 0 },
        { month: '2031', accidents: 0, fatal: 0 }
      ],
      total: 4278,
      withInjuries: 3650,
      fatal: 192
    }
  };

  const mockStreetData = {
    month: [
      { name: 'ул. Ленина', accidents: 12, fatal: 3 },
      { name: 'пр. Гагарина', accidents: 8, fatal: 1 },
      { name: 'ул. Кашена', accidents: 6, fatal: 2 },
      { name: 'пр. Победы', accidents: 4, fatal: 1 },
      { name: 'ул. Кирова', accidents: 2, fatal: 0 }
    ],
    halfYear: [
      { name: 'ул. Ленина', accidents: 45, fatal: 18 },
      { name: 'пр. Гагарина', accidents: 38, fatal: 6 },
      { name: 'ул. Кашена', accidents: 28, fatal: 9 },
      { name: 'пр. Победы', accidents: 22, fatal: 8 },
      { name: 'ул. Кирова', accidents: 15, fatal: 3 }
    ],
    year: [
      { name: 'ул. Ленина', accidents: 85, fatal: 44 },
      { name: 'пр. Гагарина', accidents: 84, fatal: 14 },
      { name: 'ул. Кашена', accidents: 59, fatal: 20 },
      { name: 'пр. Победы', accidents: 43, fatal: 19 },
      { name: 'ул. Кирова', accidents: 21, fatal: 9 }
    ],
    fiveYears: [
      { name: 'ул. Ленина', accidents: 180, fatal: 25 },
      { name: 'пр. Гагарина', accidents: 165, fatal: 18 },
      { name: 'ул. Кашена', accidents: 142, fatal: 22 },
      { name: 'пр. Победы', accidents: 128, fatal: 15 },
      { name: 'ул. Кирова', accidents: 95, fatal: 12 }
    ]
  };

  useEffect(() => {
    loadData();
    
    if (USE_MOCK_DATA) {
      const currentData = mockData[accidentsPeriod];
      const currentStreets = mockStreetData[streetsPeriod];
      const streetTotal = currentStreets.reduce((sum, street) => sum + street.accidents, 0);
      const streetFatal = currentStreets.reduce((sum, street) => sum + street.fatal, 0);
      
      setAnimatedTotal(currentData.total);
      setAnimatedWithInjuries(currentData.withInjuries);
      setAnimatedFatal(currentData.fatal);
      setAnimatedStreetTotal(streetTotal);
      setAnimatedStreetFatal(streetFatal);
    }
  }, []);

  const animateNumber = (start, end, setter, duration = 800) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(start + (end - start) * progress);
      setter(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const handleAccidentsPeriodChange = (period) => {
    const newData = mockData[period];
    animateNumber(animatedTotal, newData.total, setAnimatedTotal);
    animateNumber(animatedWithInjuries, newData.withInjuries, setAnimatedWithInjuries);
    animateNumber(animatedFatal, newData.fatal, setAnimatedFatal);
    setAccidentsPeriod(period);
    if (!USE_MOCK_DATA) {
      loadData(period);
    }
  };

  const handleStreetsPeriodChange = (period) => {
    const newStreetData = mockStreetData[period];
    const newStreetTotal = newStreetData.reduce((sum, street) => sum + street.accidents, 0);
    const newStreetFatal = newStreetData.reduce((sum, street) => sum + street.fatal, 0);
    animateNumber(animatedStreetTotal, newStreetTotal, setAnimatedStreetTotal);
    animateNumber(animatedStreetFatal, newStreetFatal, setAnimatedStreetFatal);
    setStreetsPeriod(period);
    if (!USE_MOCK_DATA) {
      loadData(period);
    }
  };

  const loadData = async (period = 'year') => {
    setLoading(true);
    try {
      if (!USE_MOCK_DATA) {
        const [statsResponse, streetsResponse] = await Promise.all([
          statisticsAPI.getAccidents({ period }),
          statisticsAPI.getDangerousStreets({ period, limit: 5 })
        ]);
        console.log('Статистика:', statsResponse.data);
        console.log('Опасные улицы:', streetsResponse.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="analytics"><div className="loading">Загрузка...</div></div>;
  }


  const currentAccidentsData = USE_MOCK_DATA ? mockData[accidentsPeriod] : { monthlyData: [], total: 0, withInjuries: 0, fatal: 0 };
  const currentStreetsData = USE_MOCK_DATA ? mockStreetData[streetsPeriod] : [];
  
  const monthlyData = currentAccidentsData.monthlyData;
  const streetData = currentStreetsData;
  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Аналитика</h1>
      </div>
      

      
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Статистика ДТП по месяцам</h3>
            <div className="period-buttons" style={{
              '--slider-position': 
                accidentsPeriod === 'month' ? '0px' :
                accidentsPeriod === 'halfYear' ? 'calc(130%)' :
                accidentsPeriod === 'year' ? 'calc(235%)' :
                'calc(320%)'
            }}>
              <button 
                className={accidentsPeriod === 'month' ? 'active' : ''}
                onClick={() => handleAccidentsPeriodChange('month')}
              >
                Месяц
              </button>
              <button 
                className={accidentsPeriod === 'halfYear' ? 'active' : ''}
                onClick={() => handleAccidentsPeriodChange('halfYear')}
              >
                Полгода
              </button>
              <button 
                className={accidentsPeriod === 'year' ? 'active' : ''}
                onClick={() => handleAccidentsPeriodChange('year')}
              >
                Год
              </button>
              <button 
                className={accidentsPeriod === 'fiveYears' ? 'active' : ''}
                onClick={() => handleAccidentsPeriodChange('fiveYears')}
              >
                5лет
              </button>
            </div>
          </div>
          
          <div className="chart-stats">
            <div className="total">{animatedTotal}</div>
            <div className="legend">
              <div className="legend-item">
                <div className="dot red"></div>
                <span>{animatedWithInjuries} с пострадавшими</span>
              </div>
              <div className="legend-item">
                <div className="dot dark-red"></div>
                <span>{animatedFatal} летальных</span>
              </div>
            </div>
          </div>

          <div className="bar-chart">
            <div className="y-labels">
              <span>1000</span>
              <span>800</span>
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>
            <div className="bars">
              {monthlyData.map((data, index) => {
                const maxAccidents = Math.max(...monthlyData.map(d => d.accidents));
                const accidentsHeight = (data.accidents / maxAccidents) * 150;
                const fatalHeight = (data.fatal / maxAccidents) * 150;
                return (
                  <div key={index} className="bar-group">
                    <div className="bar-stack">
                      <div className="bar accidents" style={{'--target-height': `${accidentsHeight}px`}}></div>
                      <div className="bar fatal" style={{'--target-height': `${fatalHeight}px`}}></div>
                    </div>
                    <span>{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Опасные улицы</h3>
            <div className="period-buttons" style={{
              '--slider-position': 
                streetsPeriod === 'month' ? '0px' :
                streetsPeriod === 'halfYear' ? 'calc(130%)' :
                streetsPeriod === 'year' ? 'calc(235%)' :
                'calc(320%)'
            }}>
              <button 
                className={streetsPeriod === 'month' ? 'active' : ''}
                onClick={() => handleStreetsPeriodChange('month')}
              >
                Месяц
              </button>
              <button 
                className={streetsPeriod === 'halfYear' ? 'active' : ''}
                onClick={() => handleStreetsPeriodChange('halfYear')}
              >
                Полгода
              </button>
              <button 
                className={streetsPeriod === 'year' ? 'active' : ''}
                onClick={() => handleStreetsPeriodChange('year')}
              >
                Год
              </button>
              <button 
                className={streetsPeriod === 'fiveYears' ? 'active' : ''}
                onClick={() => handleStreetsPeriodChange('fiveYears')}
              >
                5лет
              </button>
            </div>
          </div>
          
          <div className="chart-stats">
            <div className="total">{animatedStreetTotal}</div>
            <div className="legend">
              <div className="legend-item">
                <div className="dot red"></div>
                <span>{animatedStreetTotal} с пострадавшими</span>
              </div>
              <div className="legend-item">
                <div className="dot dark-red"></div>
                <span>{animatedStreetFatal} летальных</span>
              </div>
            </div>
          </div>

          <div className="horizontal-chart">
            <div className="street-names">
              {streetData.map((street, index) => (
                <div key={index}>{street.name}</div>
              ))}
            </div>
            <div className="horizontal-bars">
              {streetData.map((street, index) => {
                const maxAccidents = Math.max(...streetData.map(s => s.accidents));
                const accidentsWidth = (street.accidents / maxAccidents) * 100;
                const fatalWidth = (street.fatal / maxAccidents) * 100;
                return (
                  <div key={index} className="h-bar-group">
                    <div className="h-bar accidents" style={{'--target-width': `${accidentsWidth}%`}}></div>
                    <div className="h-bar fatal" style={{'--target-width': `${fatalWidth}%`}}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;