import React, { useState, useEffect } from 'react';
import { USE_MOCK_DATA } from '../constants/config';
import { statisticsAPI } from '../services/api';
import './Analytics.css';

const Analytics = () => {
  const [loading, setLoading] = useState(false);

  const mockMonthlyData = [
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
  ];

  const mockStreetData = [
    { name: 'Пятницкая улица', accidents: 85, fatal: 44 },
    { name: 'Коварный перекресток', accidents: 84, fatal: 14 },
    { name: 'Переулок разочарования', accidents: 59, fatal: 20 },
    { name: 'Проспект Победы', accidents: 43, fatal: 19 },
    { name: 'Улица Кирова', accidents: 21, fatal: 9 }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      if (!USE_MOCK_DATA) {
        // Загружаем данные с сервера
        const [statsResponse, streetsResponse] = await Promise.all([
          statisticsAPI.getAccidents({ year: 2024 }),
          statisticsAPI.getDangerousStreets({ limit: 5 })
        ]);
        // TODO: Обработать реальные данные
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

  // Моковые данные для разработки
  const monthlyData = USE_MOCK_DATA ? mockMonthlyData : [];
  const streetData = USE_MOCK_DATA ? mockStreetData : [];
  const totalAccidents = USE_MOCK_DATA ? 798 : 0;
  const totalWithInjuries = USE_MOCK_DATA ? 686 : 0;
  const totalFatal = USE_MOCK_DATA ? 112 : 0;
  const streetTotal = streetData.reduce((sum, street) => sum + street.accidents, 0);
  const streetFatalTotal = streetData.reduce((sum, street) => sum + street.fatal, 0);
  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Аналитика</h1>
      </div>
      

      
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Статистика ДТП по месяцам</h3>
            <div className="period-buttons">
              <button>Месяц</button>
              <button>Полгода</button>
              <button className="active">Год</button>
              <button>5 лет</button>
            </div>
          </div>
          
          <div className="chart-stats">
            <div className="total">{totalAccidents}</div>
            <div className="legend">
              <div className="legend-item">
                <div className="dot red"></div>
                <span>{totalWithInjuries} с пострадавшими</span>
              </div>
              <div className="legend-item">
                <div className="dot dark-red"></div>
                <span>{totalFatal} летальных</span>
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
            <div className="period-buttons">
              <button>Месяц</button>
              <button>Полгода</button>
              <button className="active">Год</button>
              <button>5 лет</button>
            </div>
          </div>
          
          <div className="chart-stats">
            <div className="total">{streetTotal}</div>
            <div className="legend">
              <div className="legend-item">
                <div className="dot red"></div>
                <span>{streetTotal} с пострадавшими</span>
              </div>
              <div className="legend-item">
                <div className="dot dark-red"></div>
                <span>{streetFatalTotal} летальных</span>
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