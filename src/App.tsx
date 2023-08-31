import React from 'react';
import './App.css';
import MainPage from './pages/main/MainPage';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5d367a',
          borderRadius: 2,
          colorBgContainer: 'transparent',
          colorTextBase: '#F3F4F6',
          colorBgLayout: 'green'
        },
        components: {
          Menu: {
            itemBorderRadius: 8,
            darkItemBg: 'transparent',
            darkItemSelectedBg: '#DB2777'
          },
          Table: {
            borderRadius: 16,
            colorBorder: 'red',
            colorBorderSecondary:'#5d367a'
          },
          Button: {
            colorBorder: '#4B5563'
          }
        },
      }}
    >
    <MainPage />
    </ConfigProvider>
  );
}

export default App;
