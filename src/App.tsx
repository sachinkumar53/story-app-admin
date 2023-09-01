
import './App.css';
import MainPage from './pages/main/MainPage';
import { ConfigProvider } from 'antd';
import { appTheme } from './theme/app_theme';

function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <MainPage />
    </ConfigProvider>
  );
}

export default App;
