
import './App.css';
import MainPage from './pages/main/MainPage';
import { ConfigProvider } from 'antd';
import LoginPage from './pages/login/LoginPage';
import './common/common.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase/FirebaseApp';

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(user != null);
      // console.log(user);
    });
  }, []);

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#5d367a',
        borderRadius: 2,
        colorBgContainer: 'transparent',
        colorTextBase: '#F3F4F6',
        colorBgLayout: 'green',
        colorBgElevated:'#352a42'
      },
      components: {
        Menu: {
          itemBorderRadius: 8,
          darkItemBg: 'transparent',
          darkItemSelectedBg: '#DB2777'
        },
        Table: {
          borderRadius: 16,
          // colorBorderSecondary:'#5d367a'
          colorBorderSecondary: 'transparent',
        },
        Button: {
          colorBorder: '#4B5563',


          colorPrimary: '#DB2777',
        },
        Card: {
          colorBorderSecondary: '#4B5563',
          colorBgContainer: '#3c1e52',
          borderRadius: 16,
          borderRadiusOuter: 16,

        },
        Dropdown: {
          colorBgLayout: 'transparent',
          
        }
      },
    }}>
      {
        isLoggedIn ? <MainPage /> : <LoginPage />
      }
    </ConfigProvider>
  );
}

export default App;
